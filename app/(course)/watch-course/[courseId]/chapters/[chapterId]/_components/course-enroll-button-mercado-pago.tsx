"use client";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type CoursePreview = {
    price: number | null;
    title: string;
    description: string | null;
    imageUrl: string | null;
};

interface CheckoutButtonProps {
    price: number;
    courseId: string;
    course: CoursePreview | null;
}

export const MercadoPagoCheckoutButton = ({
    price,
    courseId,
    course,
}: CheckoutButtonProps) => {
    const language = useLanguageStore().videoPlayer;
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [payment, setPayment] = useState<any | null>(null);
    const [status, setStatus] = useState<
        "pending" | "approved" | "rejected" | null
    >(null);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    async function handleCheckout() {
        try {
            setLoading(true);

            // chama seu endpoint Next.js (que usa NextResponse)
            const res = await fetch(
                `/api/courses/${courseId}/mercado_pago_checkout`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount: price, // valor do pedido em reais
                        description: `Pagamento do curso ${course?.title}`,
                    }),
                }
            );

            const data = await res.json();
            setPayment(data);
            setStatus("pending");
        } catch (error) {
            console.error("Erro ao iniciar checkout:", error);
        } finally {
            setLoading(false);
        }
    }

    async function checkPaymentStatus() {
        try {
            const res = await fetch(`/api/purchase/${courseId}`);
            const data = await res.json();

            if (data.purchased) {
                setStatus("approved");
                stopPolling();
            }
        } catch (err) {
            console.error("Erro ao checar status:", err);
        }
    }

    function startPolling() {
        stopPolling();
        intervalRef.current = setInterval(checkPaymentStatus, 5000);
    }

    function stopPolling() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    useEffect(() => {
        if (payment && status === "pending") {
            startPolling();
        }
        return () => stopPolling();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payment, status]);

    useEffect(() => {
        if (status === "approved") {
            router.refresh(); // atualiza a página para liberar o curso
        }
    }, [status, router]);

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(payment.qr_code);
            alert("Código pix copiado!");
        } catch (err) {
            console.error("Failed to copy text: ", err);
            alert("Falha ao copiar o código. Tente novamente.");
        }
    }

    return (
        <Dialog>
            <div className="p-5">
                <DialogTrigger asChild>
                    <Button
                        onClick={handleCheckout}
                        disabled={loading}
                        size="sm"
                        className="w-full text-lg p-8 mb-5 md:mb-0"
                    >
                        {loading
                            ? "Gerando Código Pix..."
                            : `${language.enrollFor} ${formatPrice(price)}`}
                    </Button>
                </DialogTrigger>
            </div>
            <DialogContent className="h-[90vh] sm:h-auto overflow-y-auto">
                <h2 className="text-2xl text-center">
                    Desbloqueie o acesso completo ao curso
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center pl-2 gap-1 md:gap-1">
                    {payment && (
                        <>
                            <section className="mb-2 p-3">
                                <Image
                                    src={course?.imageUrl!}
                                    width={300}
                                    height={300}
                                    alt={course?.title!}
                                    className="mb-2 w-full"
                                />
                                <h2 className="text-xl mb-2">
                                    {course?.title!}
                                </h2>
                                <p className="text-2xl text-right">
                                    {formatPrice(course?.price!)}
                                </p>
                            </section>

                            <section className="flex items-center flex-col p-5">
                                {status === "pending" && (
                                    <>
                                        <h4 className="font-semibold text-center text-sm">
                                            Para pagar com Pix, <br /> escaneie
                                            o QR Code:
                                        </h4>
                                        <Image
                                            src={`data:image/jpeg;base64,${payment.qr_code_base64}`}
                                            alt="QR Code Pix"
                                            className="w-32 h-32 md:w-22 md:h-22"
                                            height={0}
                                            width={0}
                                        />
                                        <h4 className="font-semibold text-sm">
                                            Ou copie o código:
                                        </h4>
                                        <textarea
                                            readOnly
                                            value={payment.qr_code}
                                            className="w-full h-16 p-2 border rounded-md text-xs mb-2"
                                        />
                                        <Button
                                            onClick={copyToClipboard}
                                            className="p-2 bg-blue-600"
                                        >
                                            Copiar
                                        </Button>

                                        <Button
                                            onClick={checkPaymentStatus}
                                            className="mt-3 p-2 bg-gray-500"
                                        >
                                            Checar pagamento agora
                                        </Button>

                                        <p className="mt-2 text-yellow-600 text-sm">
                                            Aguardando confirmação do
                                            pagamento...
                                        </p>
                                    </>
                                )}
                                {status === "approved" && (
                                    <p className="text-green-600 font-semibold">
                                        ✅ Pagamento aprovado! Seu acesso foi
                                        liberado.
                                    </p>
                                )}

                                {status === "rejected" && (
                                    <p className="text-red-600 font-semibold">
                                        ❌ Pagamento rejeitado. Tente novamente.
                                    </p>
                                )}
                            </section>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
