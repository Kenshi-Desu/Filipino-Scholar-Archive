import { useState } from 'react';
import { Link } from "@tanstack/react-router";
import { useOAuth } from '../hooks/useOAuth';

import { Eye, EyeOff, LogIn, Loader2, Mail, Key, Fingerprint } from 'lucide-react';
import { FaGoogle as Google } from 'react-icons/fa';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar"

export function RegisterView() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return(
        <FieldSet className='w-full w-max-md'>
            <FieldLegend>Register</FieldLegend>
            <FieldDescription>Register a new account for Filipino Scholar Archive</FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel>First Name</FieldLabel>
                    <Input></Input>
                    <FieldLabel>Last Name</FieldLabel>
                    <Input></Input>
                </Field>
                <Field>
                    <FieldLabel>Middle Name</FieldLabel>
                    <Input></Input>
                    <FieldLabel>Sex</FieldLabel>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select your biological sex"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <FieldLabel>Prefix</FieldLabel>
                    <Select>

                    </Select>
                    <FieldLabel>Suffix</FieldLabel>
                    <Select>

                    </Select>
                    <FieldLabel>Birthday</FieldLabel>
                    <Input type="date"></Input>
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}