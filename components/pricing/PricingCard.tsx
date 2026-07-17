"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import type { Plan } from "@/types/pricing";

interface PricingCardProps {
  plan: Plan;
  index: number;
}

export function PricingCard({ plan, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "relative rounded-xl border border-border bg-card p-6",
        plan.popular && "border-primary/30 shadow-sm shadow-primary/5",
      )}
    >
      {plan.popular && (
        <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
          Most Popular
        </Badge>
      )}

      <div className="space-y-1">
        <h3 className="text-base font-semibold text-card-foreground">
          {plan.name}
        </h3>
        <p className="text-xs text-muted-foreground">{plan.description}</p>
      </div>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-card-foreground">
          ${plan.price}
        </span>
        <span className="text-xs text-muted-foreground">/{plan.interval}</span>
      </div>

      <ul className="mt-5 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature.text} className="flex items-start gap-2 text-sm">
            {feature.included ? (
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
            ) : (
              <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />
            )}
            <span
              className={cn(
                "text-card-foreground",
                !feature.included && "text-muted-foreground/50 line-through",
              )}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <Button
        className="mt-6 w-full"
        variant={plan.popular ? "default" : "outline"}
      >
        {plan.cta}
      </Button>
    </motion.div>
  );
}
