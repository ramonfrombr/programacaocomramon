"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguageStore } from "@/hooks/use-language-store";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type CoursePreview = {
    price: number | null;
    title: string;
    description: string | null;
    imageUrl: string | null;
};

type PixPayment = {
    qr_code: string;
    qr_code_base64: string;
};

interface CourseCheckoutModalProps {
    price: number;
    courseId: string;
    course: CoursePreview | null;
}

type CheckoutStep = "method" | "pix";

export const CourseCheckoutModal = ({
    price,
    courseId,
    course,
}: CourseCheckoutModalProps) => {
    const { videoPlayer, courseCheckout } = useLanguageStore();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<CheckoutStep>("method");
    const [loading, setLoading] = useState(false);
    const [payment, setPayment] = useState<PixPayment | null>(null);
    const [status, setStatus] = useState<
        "pending" | "approved" | "rejected" | null
    >(null);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    function stopPolling() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    function resetCheckoutState() {
        setStep("method");
        setPayment(null);
        setStatus(null);
        setLoading(false);
        stopPolling();
    }

    function handleOpenChange(isOpen: boolean) {
        setOpen(isOpen);
        if (!isOpen) {
            resetCheckoutState();
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

    async function handlePixCheckout() {
        try {
            setLoading(true);

            const res = await fetch(
                `/api/courses/${courseId}/mercado_pago_checkout`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount: price,
                        description: `Pagamento do curso ${course?.title}`,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error("Pix checkout failed");
            }

            const data = await res.json();
            setPayment(data);
            setStatus("pending");
            setStep("pix");
        } catch (error) {
            console.error("Erro ao iniciar checkout Pix:", error);
            toast.error(videoPlayer.somethingWentWrong);
        } finally {
            setLoading(false);
        }
    }

    async function handleCardCheckout() {
        try {
            setLoading(true);

            const response = await axios.post(
                `/api/courses/${courseId}/checkout`
            );

            window.location.assign(response.data.url);
        } catch (error) {
            console.error("Erro ao iniciar checkout Stripe:", error);
            toast.error(videoPlayer.somethingWentWrong);
        } finally {
            setLoading(false);
        }
    }

    async function copyToClipboard() {
        if (!payment?.qr_code) return;

        try {
            await navigator.clipboard.writeText(payment.qr_code);
            toast.success(courseCheckout.pixCopied);
        } catch (err) {
            console.error("Failed to copy text: ", err);
            toast.error(courseCheckout.copyFailed);
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
            router.refresh();
        }
    }, [status, router]);

    const coursePreview = course?.imageUrl ? (
        <section className="mb-2 p-3">
            <Image
                src={course.imageUrl}
                width={300}
                height={300}
                alt={course.title}
                className="mb-2 w-full"
            />
            <h3 className="text-xl mb-2">{course.title}</h3>
            <p className="text-2xl text-right">
                {formatPrice(course.price ?? price)}
            </p>
        </section>
    ) : null;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <div className="p-5">
                <DialogTrigger asChild>
                    <Button
                        data-testid="course-checkout-trigger"
                        disabled={loading}
                        size="sm"
                        className="w-full text-lg p-8 mb-5 md:mb-0"
                    >
                        {loading && step === "pix"
                            ? courseCheckout.generatingPix
                            : `${videoPlayer.enrollFor} ${formatPrice(price)}`}
                    </Button>
                </DialogTrigger>
            </div>
            <DialogContent className="h-[90vh] sm:h-auto overflow-y-auto">
                <h2 className="text-2xl text-center">
                    {courseCheckout.unlockFullAccess}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center pl-2 gap-1 md:gap-1">
                    {coursePreview}

                    {step === "method" && (
                        <section className="flex flex-col gap-3 p-5 w-full">
                            <Button
                                data-testid="checkout-pix"
                                onClick={handlePixCheckout}
                                disabled={loading}
                                className="w-full p-6 text-lg"
                            >
                                {loading
                                    ? courseCheckout.generatingPix
                                    : courseCheckout.payWithPix}
                            </Button>
                            <Button
                                data-testid="checkout-card"
                                onClick={handleCardCheckout}
                                disabled={loading}
                                variant="outline"
                                className="w-full p-6 text-lg"
                            >
                                {courseCheckout.payWithCard}
                            </Button>
                        </section>
                    )}

                    {step === "pix" && payment && (
                        <section className="flex items-center flex-col p-5">
                            {status === "pending" && (
                                <>
                                    <h4 className="font-semibold text-center text-sm">
                                        {courseCheckout.scanQrCode}
                                    </h4>
                                    <Image
                                        src={`data:image/jpeg;base64,${payment.qr_code_base64}`}
                                        alt="QR Code Pix"
                                        className="w-32 h-32 md:w-22 md:h-22"
                                        height={0}
                                        width={0}
                                    />
                                    <h4 className="font-semibold text-sm">
                                        {courseCheckout.orCopyCode}
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
                                        {courseCheckout.copy}
                                    </Button>

                                    <Button
                                        onClick={checkPaymentStatus}
                                        className="mt-3 p-2 bg-gray-500"
                                    >
                                        {courseCheckout.checkPaymentNow}
                                    </Button>

                                    <p className="mt-2 text-yellow-600 text-sm">
                                        {courseCheckout.awaitingConfirmation}
                                    </p>
                                </>
                            )}
                            {status === "approved" && (
                                <p className="text-green-600 font-semibold">
                                    {courseCheckout.paymentApproved}
                                </p>
                            )}
                            {status === "rejected" && (
                                <p className="text-red-600 font-semibold">
                                    {courseCheckout.paymentRejected}
                                </p>
                            )}
                        </section>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
