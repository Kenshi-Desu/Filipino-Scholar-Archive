import { useState } from 'react';
import { loginWithProvider } from '../../services/authService';

import { Link } from "@tanstack/react-router";

import { Eye, EyeOff, LogIn, Mail, Key, Fingerprint } from 'lucide-react';
import { FaGoogle as Google } from 'react-icons/fa';

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import { AuthItem } from './components/AuthItem';
import { AuthButton } from './components/AuthButton';
import { AuthSplitLayout } from './components/AuthSplitLayout';

export function LoginView() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AuthSplitLayout
      heading="Share your study for the future innovation of our nation"
      footerText="Dont have an account in Filipino Scholar Archive?"
      footerLinkText="Click here!"
      footerLinkTo="/auth/Register"
    >
      {/* No outer <Card> here on purpose — the split panel itself is the
          "card". CardHeader/CardContent/CardFooter still give us the
          standard shadcn spacing, just without the bordered/shadowed box. */}
      <div className="w-full max-w-md">
        {/* Header Section */}
        <AuthItem>
          <CardHeader className="space-y-1 px-0">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your credentials below to access your account
            </CardDescription>
          </CardHeader>
        </AuthItem>

        {/* Content & Form Fields */}
        <CardContent className="space-y-4 px-0">
          <form className="space-y-4">

            {/* Email Field */}
            <AuthItem className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="pl-9"
                  required
                />
              </div>
            </AuthItem>

            {/* Password Field */}
            <AuthItem className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/auth/ForgotPassword"
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <Key className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="pl-9 pr-9"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </AuthItem>

            {/* Remember Me Checkbox */}
            <AuthItem className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me
              </Label>
            </AuthItem>

            {/* Submit Button */}
            <AuthItem>
              <AuthButton
                type="submit"
                isLoading={isLoading}
                loadingText="Logging in..."
                icon={<LogIn className="h-4 w-4" />}
              >
                Login
              </AuthButton>
            </AuthItem>
          </form>

          {/* Social / Hardware OAuth Options */}
          <AuthItem className="relative my-4 flex items-center justify-center">
            <Separator />
            <span className="absolute bg-background px-2 text-xs text-muted-foreground">
              OR CONTINUE WITH
            </span>
          </AuthItem>

          <AuthItem className="grid grid-cols-2 gap-2">
            <Button onClick={() => loginWithProvider('google')} variant="outline" type="button" className="w-full">
              <Google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Link to="/auth/PasskeySettings" className="w-full">
              <Button variant="outline" type="button" className="w-full">
                <Fingerprint className="mr-2 h-4 w-4" />
                Passkey
              </Button>
            </Link>
          </AuthItem>
        </CardContent>
      </div>
    </AuthSplitLayout>
  );
}