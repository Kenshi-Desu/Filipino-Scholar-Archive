import { createFileRoute } from "@tanstack/react-router"
import { ForgotPasswordView } from "@/pages/authentication/_index"

export const Route = createFileRoute('/auth/ForgotPassword')({
    component: ForgotPasswordView,
})