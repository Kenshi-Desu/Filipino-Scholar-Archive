import { useEffect, useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { supabase } from "@/config/supabaseClient"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Fingerprint, Loader2 } from "lucide-react"

export function AuthCallbackView() {
    const navigate = useNavigate()
    const [statusMessage, setStatusMessage] = useState("Verifying your credentials...")

    useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (error) {
            setStatusMessage("Authentication failed. Redirecting to login...")
            setTimeout(() => navigate({ to: "/auth/Login", replace: true }), 2000)
            return
        }

        if (session) {
            setStatusMessage("Success! Syncing your profile...")
            navigate({ to: "/auth/ForgotPassword", replace: true }) // ← fix destination here too
        }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" && session) {
            setStatusMessage("Success! Redirecting you now...")
            navigate({ to: "/auth/ForgotPassword", replace: true }) // ← and here
        }
        if (event === "INITIAL_SESSION" && !session) {
            timeoutId = setTimeout(() => {
                navigate({ to: "/auth/Login", replace: true })
            }, 3000)
        }
    })

    return () => {
        subscription.unsubscribe()
        if (timeoutId) clearTimeout(timeoutId)
    }
    }, [navigate])

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-900">
            <Card className="w-full max-w-md p-6 shadow-lg flex flex-col items-center text-center gap-4">
                {/* Visual Identity Header */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Fingerprint className="w-6 h-6 animate-pulse" />
                </div>
                
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight">Security Handshake</h2>
                    <p className="text-sm text-muted-foreground">Please wait while we establish your secure session.</p>
                </div>

                <Separator className="my-2" />

                {/* Animated Status Indicator */}
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span>{statusMessage}</span>
                </div>
            </Card>
        </div>
    )
}
