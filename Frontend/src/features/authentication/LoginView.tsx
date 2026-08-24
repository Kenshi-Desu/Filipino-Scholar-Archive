import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Fingerprint, LogIn } from "lucide-react"

export function LoginView() {
    return(
    <Card>
        Login<Fingerprint></Fingerprint>
        <Label>Email</Label>
        <Input></Input>
        <Button>Login<LogIn></LogIn></Button>
        <Separator></Separator>
    </Card>
    )
}