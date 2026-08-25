import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08,
    },
  },
};

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className = '' }: AuthCardProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 md:p-8">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className={`w-full max-w-md ${className}`}>
          {children}
        </Card>
      </motion.div>
    </div>
  );
}