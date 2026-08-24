import { createFileRoute } from "@tanstack/react-router"
import { ResetPasswordView } from "@/features/authentication/_index"

export const Route = createFileRoute('/auth/ResetPassword')({
    component: ResetPasswordView,
})