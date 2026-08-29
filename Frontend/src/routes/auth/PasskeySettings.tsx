import { createFileRoute } from "@tanstack/react-router"
import { PasskeySettingsView } from "@/pages/authentication/_index"

export const Route = createFileRoute('/auth/PasskeySettings')({
    component: PasskeySettingsView,
})