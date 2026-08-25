import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

export function AuthButton({
  isLoading = false,
  loadingText,
  icon,
  children,
  className = '',
  disabled,
  variant,
  size,
  ...props
}: AuthButtonProps) {
  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Button
        variant={variant}
        size={size}
        className={`w-full ${className}`}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="mr-2 inline-flex items-center justify-center"
            >
              <Loader2 className="h-4 w-4" />
            </motion.div>
            {loadingText || children}
          </>
        ) : (
          <>
            {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
            {children}
          </>
        )}
      </Button>
    </motion.div>
  );
}