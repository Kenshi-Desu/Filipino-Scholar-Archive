import { createFileRoute } from "@tanstack/react-router"
import { RegisterView } from "@/pages/authentication/_index"

export const Route = createFileRoute('/auth/Register')({
    component: RegisterView,
})