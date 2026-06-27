import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { muxDataForeignKeys } from "@/lib/mux-sentinel-ids";
import { isTeacher } from "@/lib/teacher";

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function DELETE(
    req: Request,
    { params }: { params: { seminarId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const seminar = await db.seminar.findUnique({
            where: {
                id: params.seminarId,
                userId,
            },
        });

        if (!seminar) {
            return new NextResponse("Not Found", { status: 404 });
        }

        if (seminar.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    seminarId: params.seminarId,
                },
            });

            if (existingMuxData) {
                await mux.video.assets.delete(existingMuxData.assetId);
                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id,
                    },
                });
            }
        }

        const deletedSeminar = await db.seminar.delete({
            where: {
                id: params.seminarId,
            },
        });

        return NextResponse.json(deletedSeminar);
    } catch (error) {
        console.log("[SEMINAR_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { seminarId: string } }
) {
    try {
        const { userId } = auth();
        const { isPublished, ...values } = await req.json();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownSeminar = await db.seminar.findUnique({
            where: {
                id: params.seminarId,
                userId,
            },
        });

        if (!ownSeminar) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const seminar = await db.seminar.update({
            where: {
                id: params.seminarId,
            },
            data: {
                ...values,
            },
        });

        if (values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    seminarId: params.seminarId,
                },
            });

            if (existingMuxData) {
                try {
                    await mux.video.assets.delete(existingMuxData.assetId);
                } catch (err: unknown) {
                    const muxError = err as { status?: number };
                    if (muxError?.status === 404) {
                        console.warn(
                            "Mux asset already deleted:",
                            existingMuxData.assetId
                        );
                    } else {
                        throw err;
                    }
                }

                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id,
                    },
                });
            }

            const seminarTitleSlug = seminar.title
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replaceAll(" ", "-")
                .toLowerCase();

            const asset = await mux.video.assets.create({
                input: values.videoUrl,
                playback_policy: ["public"],
                test: false,
                // @ts-ignore
                meta: {
                    title: `seminar__${seminarTitleSlug}`,
                },
            });

            await db.muxData.create({
                data: {
                    ...muxDataForeignKeys({ seminarId: params.seminarId }),
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id,
                },
            });
        }

        return NextResponse.json(seminar);
    } catch (error) {
        console.log("[SEMINAR_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
