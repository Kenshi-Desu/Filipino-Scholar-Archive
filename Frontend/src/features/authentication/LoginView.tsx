import { useState } from 'react';
import { loginWithProvider } from '../../services/authService';

import { Link } from "@tanstack/react-router";

import { Eye, EyeOff, LogIn, Loader2, Mail, Key, Fingerprint } from 'lucide-react';
import { FaGoogle as Google } from 'react-icons/fa';

import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";

export function LoginView() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen w-screen overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-background">
      <section className="hidden md:flex flex-col justify-between bg-primary p-10 text-white relative">
        
        {/* Header Logo Context */}
        <div className="relative z-10 flex items-center gap-2 text-lg font-medium">
          <span>Filipino Scholar Archive</span>
        </div>

        {/* Center Marketing/Info Block */}
        <div className="relative">
          <h1 className="text-5xl font-extrabold">
            SHARE YOUR STUDY FOR THE FUTURE INNOVATION OF OUR NATION
          </h1>
          <p className="text-sm leading-relaxed">
            Access the Gordon College research repository platform for <br/>
            College of Computer Studies
          </p>
        </div>

        {/* Bottom Semantic Article Testimonial Block */}
        <footer>
          <p>
            Dont have account in Filipino Scholar Archive?
          </p>
          <Link to="/auth/Register" className="text-sm">
            Click Here
          </Link>
        </footer>
      </section>

      <section className="flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12">
        <FieldGroup className="w-full max-w-md">
          {/* Header Section */}
          <FieldLegend variant='legend'>Login</FieldLegend>
          <FieldDescription>
            Enter your credentials below to access your account
          </FieldDescription>

          {/* Form Content Section */}
          <FieldSet>
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
          </FieldSet>

          {/* Footer Actions Section */}
          <FieldSet className="flex flex-col space-y-4">
            {/* Divider */}
            <FieldSeparator>OR CONTINUE WITH</FieldSeparator>

            {/* Social Sign-In Grid */}
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button 
                onClick={() => loginWithProvider('google')} 
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
        </FieldGroup>
      </section>
    </main>
  );
}
