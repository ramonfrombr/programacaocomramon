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
    { params }: { params: { interviewId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const interview = await db.interview.findUnique({
            where: {
                id: params.interviewId,
                userId,
            },
        });

        if (!interview) {
            return new NextResponse("Not Found", { status: 404 });
        }

        if (interview.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    interviewId: params.interviewId,
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

        const deletedInterview = await db.interview.delete({
            where: {
                id: params.interviewId,
            },
        });

        return NextResponse.json(deletedInterview);
    } catch (error) {
        console.log("[INTERVIEW_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { interviewId: string } }
) {
    try {
        const { userId } = auth();
        const { isPublished, ...values } = await req.json();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownInterview = await db.interview.findUnique({
            where: {
                id: params.interviewId,
                userId,
            },
        });

        if (!ownInterview) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const interview = await db.interview.update({
            where: {
                id: params.interviewId,
            },
            data: {
                ...values,
            },
        });

        if (values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    interviewId: params.interviewId,
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

            const interviewTitleSlug = interview.title
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
                    title: `interview__${interviewTitleSlug}`,
                },
            });

            await db.muxData.create({
                data: {
                    interviewId: params.interviewId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id,
                },
            });
        }

        return NextResponse.json(interview);
    } catch (error) {
        console.log("[INTERVIEW_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
