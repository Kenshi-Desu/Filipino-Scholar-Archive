import { Link } from "@tanstack/react-router";
import { Loader2, UserPlus, ArrowLeft, ArrowRight } from "lucide-react";
import { FaGoogle as Google } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";

import { useRegisterForm } from "@/hooks/auth/register/use-register-form";
import { DEFAULT_REGISTER_STEPS, type StepConfig } from "@/lib/auth/register/register-steps";
import { RegisterStepIndicator } from "@/components/auth/register/register-step-indicator";
import { RegisterField } from "@/components/auth/register/register-field";

export interface RegisterViewProps {
  /** Override or extend the default wizard steps. */
  steps?: StepConfig[];
  /** Called once every step has validated and the final step is submitted. */
  onSubmit?: (values: Record<string, string>) => Promise<void> | void;
}

export function RegisterView({
  steps = DEFAULT_REGISTER_STEPS,
  onSubmit,
}: RegisterViewProps) {
  const {
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
  } = useRegisterForm(steps, onSubmit);

  return (
    <main className="min-h-screen w-screen overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-background">
      <section className="hidden md:flex flex-col justify-between bg-primary p-10 text-white relative">
        <div className="relative z-10 flex items-center gap-2 text-lg font-medium">
          <span>Filipino Scholar Archive</span>
        </div>

        <div className="relative">
          <h1 className="text-5xl font-extrabold">
            SHARE YOUR STUDY FOR THE FUTURE INNOVATION OF OUR NATION
          </h1>
          <p className="text-sm leading-relaxed">
            Create your account to submit and manage research for the <br />
            College of Computer Studies
          </p>
        </div>

        <footer>
          <p>Already have an account with Filipino Scholar Archive?</p>
          <Link to="/auth/Login" className="text-sm">
            Click Here
          </Link>
        </footer>
      </section>

      <section className="flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12">
        <FieldGroup className="w-full max-w-md">
          <RegisterStepIndicator steps={steps} currentIndex={stepIndex} />

          <FieldLegend variant="legend">{currentStep.title}</FieldLegend>
          <FieldDescription>{currentStep.description}</FieldDescription>
          <p className="text-xs text-muted-foreground mt-1">{progressLabel}</p>

          <FieldSet>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentStep.fields.map((field) => (
                  <RegisterField
                    key={field.name}
                    field={field}
                    value={values[field.name] ?? ""}
                    error={errors[field.name]}
                    visible={visibleFields.has(field.name)}
                    onChange={(value) => handleChange(field.name, value)}
                    onToggleVisibility={() => toggleVisibility(field.name)}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                {!isFirstStep && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleBack}
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                )}

                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : isLastStep ? (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </FieldSet>

          {isFirstStep && (
            <FieldSet className="flex flex-col space-y-4">
              <FieldSeparator>OR CONTINUE WITH</FieldSeparator>

              <div className="grid grid-cols-1 gap-2 w-full">
                <Button variant="outline" type="button" className="w-full">
                  <Google className="mr-2 h-4 w-4" />
                  Sign up with Google
                </Button>
              </div>
            </FieldSet>
          )}
        </FieldGroup>
      </section>
    </main>
  );
}