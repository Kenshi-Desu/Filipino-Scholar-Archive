import { createFileRoute } from "@tanstack/react-router"
import { LoginView } from "@/features/authentication/_index"

export const Route = createFileRoute('/auth/Login')({
    component: LoginView,
})