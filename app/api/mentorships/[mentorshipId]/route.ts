import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function DELETE(
    req: Request,
    { params }: { params: { mentorshipId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const mentorship = await db.mentorship.findUnique({
            where: {
                id: params.mentorshipId,
                userId,
            },
        });

        if (!mentorship) {
            return new NextResponse("Not Found", { status: 404 });
        }

        if (mentorship.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    mentorshipId: params.mentorshipId,
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

        const deletedMentorship = await db.mentorship.delete({
            where: {
                id: params.mentorshipId,
            },
        });

        return NextResponse.json(deletedMentorship);
    } catch (error) {
        console.log("[MENTORSHIP_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { mentorshipId: string } }
) {
    try {
        const { userId } = auth();
        const { isPublished, ...values } = await req.json();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownMentorship = await db.mentorship.findUnique({
            where: {
                id: params.mentorshipId,
                userId,
            },
        });

        if (!ownMentorship) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const mentorship = await db.mentorship.update({
            where: {
                id: params.mentorshipId,
            },
            data: {
                ...values,
            },
        });

        if (values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    mentorshipId: params.mentorshipId,
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

            const mentorshipTitleSlug = mentorship.title
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
                    title: `mentorship__${mentorshipTitleSlug}`,
                },
            });

            await db.muxData.create({
                data: {
                    mentorshipId: params.mentorshipId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id,
                },
            });
        }

        return NextResponse.json(mentorship);
    } catch (error) {
        console.log("[MENTORSHIP_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
