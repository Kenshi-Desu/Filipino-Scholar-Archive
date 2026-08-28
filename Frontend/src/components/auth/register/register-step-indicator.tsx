import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { StepConfig } from "@/lib/auth/register/register-steps";

export function RegisterStepIndicator({
  steps,
  currentIndex,
}: {
  steps: StepConfig[];
  currentIndex: number;
}) {
  return (
    <div className="mb-6 flex items-center gap-2">
      {steps.map((step, index) => {
        const isComplete = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <div key={step.id} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-none border text-xs font-medium transition-colors",
                isComplete &&
                  "border-primary bg-primary text-primary-foreground",
                isActive && !isComplete && "border-primary text-primary",
                !isActive && !isComplete && "border-input text-muted-foreground"
              )}
            >
              {isComplete ? <Check className="size-3.5" /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-px flex-1 bg-border transition-colors",
                  isComplete && "bg-primary"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}