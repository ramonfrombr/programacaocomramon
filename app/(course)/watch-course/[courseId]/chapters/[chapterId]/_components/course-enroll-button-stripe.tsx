"use client";

import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface StripeCheckoutButtonProps {
    price: number;
    courseId: string;
}

export const StripeCheckoutButton = ({
    price,
    courseId,
}: StripeCheckoutButtonProps) => {
    const language = useLanguageStore().videoPlayer;
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(
                `/api/courses/${courseId}/checkout`
            );

            window.location.assign(response.data.url);
        } catch (error) {
            toast.error(language.somethingWentWrong);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            size="sm"
            className="w-full text-lg p-8 mb-5 md:mb-0"
        >
            {language.enrollFor} {formatPrice(price)}
        </Button>
    );
};
