import { createFileRoute } from "@tanstack/react-router"
import { ForgotPasswordView } from "@/features/authentication/_index"

export const Route = createFileRoute('/auth/ForgotPassword')({
    component: ForgotPasswordView,
})