import { useState } from 'react';
import { Link } from "@tanstack/react-router";
import { useOAuth } from '../hooks/useOAuth';

import { Eye, EyeOff, LogIn, Loader2, Mail, Key, Fingerprint } from 'lucide-react';
import { FaGoogle as Google } from 'react-icons/fa';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";

export function LoginView() {
    const [showPassword, setShowPassword] = useState(false);
    const { createLoginHandler, isLoading } = useOAuth();

    return(
        <FieldSet className="w-full max-w-md">
            {/* Header Section */}
            <FieldLegend variant='legend'>Login</FieldLegend>
            <FieldDescription>
                Enter your credentials below to access your account
            </FieldDescription>

            {/* Form Content Section */}
            <FieldGroup>
                <form className="space-y-4">
                {/* Email */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <div className="relative flex items-center">
                    <Mail className="absolute left-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="name@example.com" className="pl-9" required />
                    </div>
                </Field>

                {/* Password */}
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative flex items-center">
                    <Key className="absolute left-3 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Your Password" className="pl-9 pr-9" required />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-muted-foreground hover:text-foreground"
                    >
                        {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    </div>
                </Field>

                {/* Forgot Password and Remember Me Checkbox*/}
                <Field orientation="horizontal" className="flex items-center gap-2 space-y-0 pt-1">
                    {/* The h-4 w-4 shrink-0 locks the square dimensions */}
                    <Checkbox id="remember" className="h-4 w-4 shrink-0" />
                    <FieldLabel htmlFor="remember" className="text-sm font-normal cursor-pointer select-none leading-none">
                    Remember me
                    </FieldLabel>
                    
                    <Link to="/auth/ForgotPassword" className="text-sm text-muted-foreground hover:underline">
                    Forgot password?
                    </Link>
                </Field>

                {/* Main Submit Action */}
                <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </>
                    ) : (
                    <>
                        <LogIn className="mr-2 h-4 w-4" /> 
                        Login
                    </>
                    )}
                </Button>
                </form>
            </FieldGroup>

            {/* Footer Actions Section */}
            <FieldSet className="flex flex-col space-y-4">
                {/* Divider */}
                <FieldSeparator>OR CONTINUE WITH</FieldSeparator>

                {/* Social Sign-In Grid */}
                <div className="grid grid-cols-2 gap-2 w-full">
                <Button 
                    onClick={createLoginHandler('google')}
                    disabled={isLoading}
                    variant="outline" 
                    type="button" 
                    className="w-full"
                >
                    <Google className="mr-2 h-4 w-4" />
                    Google
                </Button>
                <Link to="/auth/PasskeySettings" className="w-full">
                    <Button variant="outline" type="button" className="w-full">
                    <Fingerprint className="mr-2 h-4 w-4" />
                    Passkey
                    </Button>
                </Link>
                </div>
            </FieldSet>
        </FieldSet>
    );

}