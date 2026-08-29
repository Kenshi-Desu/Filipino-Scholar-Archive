import { createFileRoute } from "@tanstack/react-router"
import { LoginView } from "@/pages/authentication/_index"

export const Route = createFileRoute('/auth/Login')({
    component: LoginView,
})