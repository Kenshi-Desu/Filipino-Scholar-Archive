import { createFileRoute } from "@tanstack/react-router"
import { AuthCallbackView } from "@/features/authentication/_index"

export const Route = createFileRoute('/auth/AuthCallback')({
    component: AuthCallbackView,
})