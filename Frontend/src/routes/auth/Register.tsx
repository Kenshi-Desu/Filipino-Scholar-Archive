import { createFileRoute } from "@tanstack/react-router"
import { RegisterView } from "@/features/authentication/_index"

export const Route = createFileRoute('/auth/Register')({
    component: RegisterView,
})