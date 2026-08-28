import { User, CalendarDays, Mail, Key, type LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/*                                                                      */
/*  This file only describes the wizard's shape — it holds no state    */
/*  and renders nothing. RegisterField / RegisterStepIndicator turn    */
/*  this data into UI, and useRegisterForm turns it into behavior.     */
/* ------------------------------------------------------------------ */

export type FieldType = "text" | "email" | "password" | "date" | "select";

export interface SelectOption {
  label: string;
  value: string;
}

export interface FieldConfig {
  /** Key used in the form state object */
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  icon?: LucideIcon;
  /** Only used when type === "select" */
  options?: SelectOption[];
  /** How much horizontal space the field takes in the step's 2-col grid */
  span?: "full" | "half";
  /**
   * Optional extra validation beyond "required". Return an error string to
   * block the step, or null when the value is valid. Receives the whole
   * form so cross-field checks (confirm password, etc.) are possible.
   */
  validate?: (
    value: string,
    formValues: Record<string, string>
  ) => string | null;
}

export interface StepConfig {
  id: string;
  title: string;
  description: string;
  fields: FieldConfig[];
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*                                                                      */
/*  To add a brand new step (e.g. "Program Details"), append a new     */
/*  StepConfig object below — RegisterView and useRegisterForm need    */
/*  no changes to pick it up.                                          */
/* ------------------------------------------------------------------ */

const PREFIX_OPTIONS: SelectOption[] = [
  { label: "None", value: "none" },
  { label: "Mr.", value: "Mr." },
  { label: "Ms.", value: "Ms." },
  { label: "Mrs.", value: "Mrs." },
  { label: "Dr.", value: "Dr." },
  { label: "Engr.", value: "Engr." },
  { label: "Atty.", value: "Atty." },
  { label: "Prof.", value: "Prof." },
];

const SUFFIX_OPTIONS: SelectOption[] = [
  { label: "None", value: "none" },
  { label: "Jr.", value: "Jr." },
  { label: "Sr.", value: "Sr." },
  { label: "II", value: "II" },
  { label: "III", value: "III" },
  { label: "IV", value: "IV" },
  { label: "V", value: "V" },
];

export const DEFAULT_REGISTER_STEPS: StepConfig[] = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Tell us who you are — this is used on your submissions.",
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Juan",
        required: true,
        autoComplete: "given-name",
        icon: User,
        span: "half",
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Dela Cruz",
        required: true,
        autoComplete: "family-name",
        icon: User,
        span: "half",
      },
      {
        name: "middleName",
        label: "Middle Name",
        type: "text",
        placeholder: "Santos",
        autoComplete: "additional-name",
        icon: User,
        span: "half",
      },
      {
        name: "birthday",
        label: "Birthday",
        type: "date",
        required: true,
        autoComplete: "bday",
        icon: CalendarDays,
        span: "half",
      },
      {
        name: "prefix",
        label: "Prefix",
        type: "select",
        options: PREFIX_OPTIONS,
        span: "half",
      },
      {
        name: "suffix",
        label: "Suffix",
        type: "select",
        options: SUFFIX_OPTIONS,
        span: "half",
      },
    ],
  },
  {
    id: "account",
    title: "Account Credentials",
    description: "This is how you'll sign back in to the archive.",
    fields: [
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "name@example.com",
        required: true,
        autoComplete: "email",
        icon: Mail,
        span: "full",
        validate: (value) =>
          value && !/^\S+@\S+\.\S+$/.test(value)
            ? "Enter a valid email address."
            : null,
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Create a password",
        required: true,
        autoComplete: "new-password",
        icon: Key,
        span: "full",
        validate: (value) =>
          value && value.length < 8
            ? "Password must be at least 8 characters."
            : null,
      },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Re-enter your password",
        required: true,
        autoComplete: "new-password",
        icon: Key,
        span: "full",
        validate: (value, values) =>
          value && value !== values.password
            ? "Passwords do not match."
            : null,
      },
    ],
  },
];