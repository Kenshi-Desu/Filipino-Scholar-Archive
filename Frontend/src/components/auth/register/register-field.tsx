import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import type { FieldConfig } from "@/lib/auth/register/register-steps";

export function RegisterField({
  field,
  value,
  error,
  visible,
  onChange,
  onToggleVisibility,
}: {
  field: FieldConfig;
  value: string;
  error?: string;
  visible: boolean;
  onChange: (value: string) => void;
  onToggleVisibility: () => void;
}) {
  const Icon = field.icon;
  const isPassword = field.type === "password";

  return (
    <Field
      className={cn(field.span === "half" ? "sm:col-span-1" : "sm:col-span-2")}
      data-invalid={!!error}
    >
      <FieldLabel htmlFor={field.name}>
        {field.label}
        {!field.required && (
          <span className="ml-1 text-muted-foreground font-normal">
            (optional)
          </span>
        )}
      </FieldLabel>

      {field.type === "select" ? (
        <Select
          value={value || undefined}
          onValueChange={(next) => onChange(next as string)}
        >
          <SelectTrigger id={field.name} className="w-full">
            <SelectValue placeholder={field.placeholder ?? "Select..."} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="relative flex items-center">
          {Icon && (
            <Icon className="absolute left-3 h-4 w-4 text-muted-foreground" />
          )}
          <Input
            id={field.name}
            type={isPassword ? (visible ? "text" : "password") : field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            required={field.required}
            aria-invalid={!!error}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(Icon && "pl-9", isPassword && "pr-9")}
          />
          {isPassword && (
            <button
              type="button"
              onClick={onToggleVisibility}
              className="absolute right-3 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {visible ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      )}

      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}