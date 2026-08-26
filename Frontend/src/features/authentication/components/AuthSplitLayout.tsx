import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Link } from "@tanstack/react-router"

const panelVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

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
}

interface AuthSplitLayoutProps {
  /** Form content for the right panel — typically a stack of <AuthItem>s */
  children: ReactNode
  /** Big headline on the left panel, e.g. "Share your study for..." */
  heading: ReactNode
  /** Small label above the headline. Defaults to the archive name. */
  eyebrow?: string
  /** Question text before the link, e.g. "Dont have an account?" */
  footerText: string
  /** Link label, e.g. "Click here!" or "Sign up" */
  footerLinkText: string
  /** Route the footer link points to */
  footerLinkTo: string
}

/**
 * Two-panel auth layout shared by every auth view (Login, Register, Reset,
 * ...): orange brand panel on the left, form on the right. Only the copy
 * changes per view — pass it in via props instead of forking the layout.
 *
 * Panel color comes from the app's --primary token (index.css), so it stays
 * in sync automatically if that value ever changes.
 *
 * Animation: this is now where the stagger animation lives (it used to live
 * in AuthCard). The right-panel wrapper below sets initial="hidden"
 * animate="visible" with staggerChildren — every <AuthItem> inside
 * `children` picks that up automatically through Framer Motion's variant
 * propagation, same as before, no changes needed in AuthItem itself.
 */
export function AuthSplitLayout({
  children,
  heading,
  eyebrow = "FILIPINO SCHOLAR ARCHIVE",
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthSplitLayoutProps) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={panelVariants}
        className="hidden flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex"
      >
        <div className="space-y-6">
          <span className="text-xs font-semibold tracking-[0.2em]">
            {eyebrow}
          </span>
          <h2 className="max-w-md text-4xl font-extrabold uppercase leading-tight tracking-tight">
            {heading}
          </h2>
        </div>

        <p className="text-sm font-medium">
          {footerText} <br />
          <Link to={footerLinkTo} className="underline underline-offset-4">
            {footerLinkText}
          </Link>
        </p>
      </motion.div>

      <div className="flex items-center justify-center bg-background px-6 py-12">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}