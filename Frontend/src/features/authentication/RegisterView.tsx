import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Fingerprint } from "lucide-react"

export function RegisterView() {
    return(
    <Card>
        Register<Fingerprint></Fingerprint>
        <Label>Email</Label>
        <Input></Input>
        <Button>Register</Button>
        <Separator></Separator>
    </Card>
    )
}