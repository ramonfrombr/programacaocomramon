import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { db } from "@/lib/db";

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Webhook recebido:", body);

        const paymentId = body.data?.id || body.id;
        if (!paymentId) {
            return NextResponse.json(
                { error: "No payment id " },
                { status: 400 }
            );
        }
        const payment = new Payment(client);
        const mpPayment = await payment.get({ id: paymentId.toString() });

        console.log("Pagamento detalhado: ", mpPayment);

        if (mpPayment.status === "approved") {
            const userId = mpPayment.metadata?.user_id;
            const courseId = mpPayment.metadata?.course_id;

            if (userId && courseId) {
                const already = await db.purchase.findUnique({
                    where: { userId_courseId: { userId, courseId } },
                });

                if (!already) {
                    await db.purchase.create({
                        data: { userId, courseId },
                    });
                }
            }
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        console.error("Erro no webhook:", error);
        return NextResponse.json({ error: "Erro no webhook" }, { status: 500 });
    }
}
