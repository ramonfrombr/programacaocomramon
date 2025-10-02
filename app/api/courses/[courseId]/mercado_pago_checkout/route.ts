import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(
    request: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const user = await currentUser();
        if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: { id: params.courseId, isPublished: true },
        });

        if (!course) return new NextResponse("Not found", { status: 401 });

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: course.id,
                },
            },
        });

        if (purchase) {
            return new NextResponse("Already purchased", { status: 400 });
        }

        const payment = new Payment(client);

        const response = await payment.create({
            body: {
                transaction_amount: Number(course.price),
                description: course.title,
                payment_method_id: "pix",
                payer: {
                    email: user.emailAddresses[0].emailAddress,
                },
                metadata: {
                    userId: user.id,
                    courseId: course.id,
                },
            },
        });

        // Pix payments return QR code info (base64 image or copy/paste code)
        return NextResponse.json(
            {
                id: response.id,
                qr_code:
                    response.point_of_interaction?.transaction_data?.qr_code,
                qr_code_base64:
                    response.point_of_interaction?.transaction_data
                        ?.qr_code_base64,
                status: response.status,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[MP_CHECKOUT]", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
