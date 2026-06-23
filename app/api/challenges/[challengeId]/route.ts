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
    { params }: { params: { challengeId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const challenge = await db.challenge.findUnique({
            where: {
                id: params.challengeId,
                userId,
            },
        });

        if (!challenge) {
            return new NextResponse("Not Found", { status: 404 });
        }

        if (challenge.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    challengeId: params.challengeId,
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

        const deletedChallenge = await db.challenge.delete({
            where: {
                id: params.challengeId,
            },
        });

        return NextResponse.json(deletedChallenge);
    } catch (error) {
        console.log("[CHALLENGE_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { challengeId: string } }
) {
    try {
        const { userId } = auth();
        const { isPublished, ...values } = await req.json();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownChallenge = await db.challenge.findUnique({
            where: {
                id: params.challengeId,
                userId,
            },
        });

        if (!ownChallenge) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const challenge = await db.challenge.update({
            where: {
                id: params.challengeId,
            },
            data: {
                ...values,
            },
        });

        if (values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    challengeId: params.challengeId,
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

            const challengeTitleSlug = challenge.title
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
                    title: `challenge__${challengeTitleSlug}`,
                },
            });

            await db.muxData.create({
                data: {
                    challengeId: params.challengeId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id,
                },
            });
        }

        return NextResponse.json(challenge);
    } catch (error) {
        console.log("[CHALLENGE_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
