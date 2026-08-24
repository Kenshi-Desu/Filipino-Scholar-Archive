import { createFileRoute } from "@tanstack/react-router"
import { OtpView } from "@/features/authentication/_index"

export const Route = createFileRoute('/auth/Otp')({
    component: OtpView,
})