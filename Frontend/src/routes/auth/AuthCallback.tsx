import { createFileRoute } from "@tanstack/react-router"
import { AuthCallbackView } from "@/pages/authentication/_index"

export const Route = createFileRoute('/auth/AuthCallback')({
    component: AuthCallbackView,
})