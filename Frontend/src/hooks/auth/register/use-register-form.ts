import { useMemo, useState } from "react";
import type { StepConfig } from "@/lib/auth/register/register-steps";

export interface UseRegisterFormResult {
  stepIndex: number;
  currentStep: StepConfig;
  isFirstStep: boolean;
  isLastStep: boolean;
  progressLabel: string;
  values: Record<string, string>;
  errors: Record<string, string>;
  visibleFields: Set<string>;
  isLoading: boolean;
  handleChange: (name: string, value: string) => void;
  toggleVisibility: (name: string) => void;
  handleNext: () => Promise<void>;
  handleBack: () => void;
}

/**
 * Drives a multi-step form purely off a `StepConfig[]` blueprint.
 * Knows nothing about JSX — just tracks which step is active, what the
 * user has typed, which fields are invalid, and whether we're submitting.
 */
export function useRegisterForm(
  steps: StepConfig[],
  onSubmit?: (values: Record<string, string>) => Promise<void> | void
): UseRegisterFormResult {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [visibleFields, setVisibleFields] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const currentStep = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  const progressLabel = useMemo(
    () => `Step ${stepIndex + 1} of ${steps.length}`,
    [stepIndex, steps.length]
  );

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear that field's error the moment the user edits it again.
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function toggleVisibility(name: string) {
    setVisibleFields((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  function validateStep(step: StepConfig): boolean {
    const nextErrors: Record<string, string> = {};

    for (const field of step.fields) {
      const value = values[field.name] ?? "";

      if (field.required && !value.trim()) {
        nextErrors[field.name] = `${field.label} is required.`;
        continue;
      }

      const customError = field.validate?.(value, values);
      if (customError) {
        nextErrors[field.name] = customError;
      }
    }

    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  }

  async function handleNext() {
    if (!validateStep(currentStep)) return;

    if (!isLastStep) {
      setStepIndex((index) => index + 1);
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit?.(values);
    } finally {
      setIsLoading(false);
    }
  }

  function handleBack() {
    if (!isFirstStep) setStepIndex((index) => index - 1);
  }

  return {
    stepIndex,
    currentStep,
    isFirstStep,
    isLastStep,
    progressLabel,
    values,
    errors,
    visibleFields,
    isLoading,
    handleChange,
    toggleVisibility,
    handleNext,
    handleBack,
  };
}