import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Fingerprint } from "lucide-react"

export function AuthCallbackView() {
    return(
    <Card>
        Authentication Callback<Fingerprint></Fingerprint>
        <Label>Email</Label>
        <Input></Input>
        <Button>Authentication Callback</Button>
        <Separator></Separator>
    </Card>
    )
}