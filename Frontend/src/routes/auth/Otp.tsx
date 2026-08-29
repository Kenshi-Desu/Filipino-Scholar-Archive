import { createFileRoute } from "@tanstack/react-router"
import { OtpView } from "@/pages/authentication/_index"

export const Route = createFileRoute('/auth/Otp')({
    component: OtpView,
})