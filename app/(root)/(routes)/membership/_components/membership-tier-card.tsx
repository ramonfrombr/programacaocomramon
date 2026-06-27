"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { MultiLineText } from "@/app/landing_page/(routes)/sales-funnel/_components/multi-line-text";
import { useLanguageStore } from "@/hooks/use-language-store";
import { MembershipTierCardData } from "@/actions/get-membership-page-data";
import { cn } from "@/lib/utils";

type MembershipTierCardProps = {
  tier: MembershipTierCardData;
  highlighted?: boolean;
  mode: "subscribe" | "upgrade" | "current" | "lower";
};

function formatMembershipPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function MembershipTierCard({
  tier,
  highlighted = false,
  mode,
}: MembershipTierCardProps) {
  const { membership } = useLanguageStore();
  const [isLoading, setIsLoading] = useState(false);

  const isInteractive = mode === "subscribe" || mode === "upgrade";

  async function handleSelect() {
    if (!isInteractive || isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post("/api/membership/checkout", {
        tierSlug: tier.slug,
      });

      if (response.data?.upgraded) {
        toast.success(membership.upgradeSuccess);
        window.location.reload();
        return;
      }

      if (response.data?.url) {
        window.location.assign(response.data.url);
        return;
      }

      toast.error(membership.checkoutError);
    } catch {
      toast.error(membership.checkoutError);
    } finally {
      setIsLoading(false);
    }
  }

  const ctaLabel =
    mode === "upgrade"
      ? membership.upgradeCta
      : mode === "current"
        ? membership.currentPlan
        : mode === "lower"
          ? null
          : membership.subscribeCta;

  const priceLabel = `${formatMembershipPrice(tier.monthlyPriceBrl)}${membership.perMonth}`;

  const cardClassName = cn(
    "flex flex-col p-5 rounded-md border shadow-md h-full text-left transition-colors",
    highlighted && "border-blue-600 ring-2 ring-blue-600/20",
    mode === "lower" && "opacity-60",
    isInteractive && !isLoading && "cursor-pointer hover:border-blue-500",
    isInteractive && isLoading && "opacity-80"
  );

  const footerClassName = cn(
    "w-full rounded-full p-8 text-xl text-center font-medium",
    isInteractive
      ? "bg-blue-600 text-white"
      : "bg-muted text-muted-foreground"
  );

  if (isInteractive) {
    return (
      <button
        type="button"
        className={cardClassName}
        onClick={handleSelect}
        disabled={isLoading}
        aria-label={`${ctaLabel} - ${tier.name}`}
      >
        <h3 className="font-semibold text-lg md:text-xl mb-2">{tier.name}</h3>

        <div className="text-2xl md:text-3xl font-bold mb-4">{priceLabel}</div>

        {tier.tagline ? (
          <MultiLineText
            text={tier.tagline}
            className="text-lg text-gray-600 mb-3"
          />
        ) : null}

        <ul className="text-left list-disc pl-5 mb-5 text-lg space-y-1 flex-1">
          {tier.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        {tier.newFeaturesHeading && tier.newFeatures.length ? (
          <div className="mb-4">
            <h4 className="font-semibold text-lg mb-2">
              {tier.newFeaturesHeading}
            </h4>
            <ul className="text-left list-disc pl-5 text-lg space-y-1">
              {tier.newFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {tier.exclusiveAccessHeading && tier.exclusiveAccess.length ? (
          <div className="mb-5">
            <h4 className="font-semibold text-lg mb-2">
              {tier.exclusiveAccessHeading}
            </h4>
            <ul className="text-left list-disc pl-5 text-lg space-y-1">
              {tier.exclusiveAccess.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <span className={footerClassName}>
          {isLoading ? (
            <Loader2 className="mx-auto h-6 w-6 animate-spin" />
          ) : (
            ctaLabel
          )}
        </span>
      </button>
    );
  }

  return (
    <article className={cardClassName}>
      <h3 className="font-semibold text-lg md:text-xl mb-2">{tier.name}</h3>

      <div className="text-2xl md:text-3xl font-bold mb-4">{priceLabel}</div>

      {tier.tagline ? (
        <MultiLineText
          text={tier.tagline}
          className="text-lg text-gray-600 mb-3"
        />
      ) : null}

      <ul className="text-left list-disc pl-5 mb-5 text-lg space-y-1 flex-1">
        {tier.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      {tier.newFeaturesHeading && tier.newFeatures.length ? (
        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-2">
            {tier.newFeaturesHeading}
          </h4>
          <ul className="text-left list-disc pl-5 text-lg space-y-1">
            {tier.newFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {tier.exclusiveAccessHeading && tier.exclusiveAccess.length ? (
        <div className="mb-5">
          <h4 className="font-semibold text-lg mb-2">
            {tier.exclusiveAccessHeading}
          </h4>
          <ul className="text-left list-disc pl-5 text-lg space-y-1">
            {tier.exclusiveAccess.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {ctaLabel ? <span className={footerClassName}>{ctaLabel}</span> : null}
    </article>
  );
}
