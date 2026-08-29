import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Fingerprint } from "lucide-react"

export function PasskeySettingsView() {
    return(
    <Card>
        Passkey Settings<Fingerprint></Fingerprint>
        <Label>Email</Label>
        <Input></Input>
        <Button>Passkey Settings</Button>
        <Separator></Separator>
    </Card>
    )
}