"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Users, Zap, Star, Play, Download, Mail, MessageSquare } from "lucide-react"
import { cn } from "../ui/utils"
import { Section, Container, Grid } from "../ui/layout"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"

interface CTASectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  primaryAction?: {
    text: string
    onClick: () => void
    variant?: "luminor" | "cosmic" | "ethereal"
  }
  secondaryAction?: {
    text: string
    onClick: () => void
    variant?: "outline" | "ghost"
  }
  variant?: "default" | "newsletter" | "demo" | "social" | "stats" | "minimalist"
  showStats?: boolean
  stats?: Array<{
    value: string
    label: string
    icon?: React.ReactNode
  }>
  showSocialProof?: boolean
  socialProof?: {
    avatars?: string[]
    text: string
  }
  backgroundVariant?: "gradient" | "cosmic" | "ethereal" | "minimal"
  emailCapture?: {
    placeholder?: string
    buttonText?: string
    onSubmit?: (email: string) => void
  }
}

const defaultStats = [
  {
    value: "10K+",
    label: "Active Creators",
    icon: <Users className="w-5 h-5" />
  },
  {
    value: "50K+",
    label: "Projects Created",
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    value: "98%",
    label: "Satisfaction Rate",
    icon: <Star className="w-5 h-5" />
  },
  {
    value: "24/7",
    label: "AI Support",
    icon: <Zap className="w-5 h-5" />
  }
]

const CTASection = React.forwardRef<HTMLElement, CTASectionProps>(
  ({ 
    className, 
    title = "Ready to Transform Your Creative Journey?",
    subtitle = "Join thousands of creators who are already using AI-powered mentorship to unlock their full creative potential.",
    primaryAction = {
      text: "Start Creating Now",
      onClick: () => {},
      variant: "luminor"
    },
    secondaryAction,
    variant = "default",
    showStats = true,
    stats = defaultStats,
    showSocialProof = true,
    socialProof = {
      text: "Trusted by 10,000+ creators worldwide"
    },
    backgroundVariant = "gradient",
    emailCapture,
    ...props 
  }, ref) => {
    const [email, setEmail] = React.useState("")
    const [submitted, setSubmitted] = React.useState(false)

    const handleEmailSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (email.trim()) {
        emailCapture?.onSubmit?.(email)
        setSubmitted(true)
        setEmail("")
      }
    }

    const backgroundClasses = {
      gradient: "bg-arcanean-gradient",
      cosmic: "bg-cosmic-nebula",
      ethereal: "bg-gradient-to-br from-arcanean-deep/90 to-arcanean-cosmic/90",
      minimal: "bg-background"
    }

    if (variant === "newsletter") {
      return (
        <Section 
          ref={ref} 
          className={cn(
            "relative overflow-hidden",
            backgroundClasses[backgroundVariant],
            className
          )} 
          {...props}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="floating-orb w-64 h-64 bg-arcanean-luminous/10 top-0 left-0" />
            <div className="floating-orb w-96 h-96 bg-arcanean-ethereal/10 bottom-0 right-0" />
          </div>

          <Container centered className="relative z-10">
            <motion.div
              className="max-w-2xl mx-auto text-center space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold nebula-text mb-4">
                  {title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {subtitle}
                </p>
              </div>

              {!submitted ? (
                <motion.form
                  onSubmit={handleEmailSubmit}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Input
                    type="email"
                    placeholder={emailCapture?.placeholder || "Enter your email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="cosmic"
                    className="flex-1"
                    required
                  />
                  <Button
                    type="submit"
                    variant="luminor"
                    size="lg"
                  >
                    {emailCapture?.buttonText || "Get Started"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Welcome to Arcanea!</h3>
                  <p className="text-muted-foreground">
                    Check your email for next steps to start your creative journey.
                  </p>
                </motion.div>
              )}

              {showSocialProof && socialProof && (
                <motion.div
                  className="flex items-center justify-center space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {socialProof.avatars && (
                    <div className="flex -space-x-2">
                      {socialProof.avatars.slice(0, 4).map((avatar, index) => (
                        <div key={index} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                          <img src={avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">{socialProof.text}</p>
                </motion.div>
              )}
            </motion.div>
          </Container>
        </Section>
      )
    }

    if (variant === "demo") {
      return (
        <Section 
          ref={ref} 
          className={cn(
            "relative overflow-hidden",
            backgroundClasses[backgroundVariant],
            className
          )} 
          {...props}
        >
          <Container centered>
            <Grid cols={2} gap="xl" responsive>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold nebula-text mb-4">
                    {title}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    variant={primaryAction.variant}
                    size="lg"
                    onClick={primaryAction.onClick}
                    className="w-full sm:w-auto"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {primaryAction.text}
                  </Button>

                  {secondaryAction && (
                    <Button
                      variant={secondaryAction.variant}
                      size="lg"
                      onClick={secondaryAction.onClick}
                      className="w-full sm:w-auto ml-0 sm:ml-4"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      {secondaryAction.text}
                    </Button>
                  )}
                </div>

                {showSocialProof && socialProof && (
                  <div className="flex items-center space-x-3">
                    {socialProof.avatars && (
                      <div className="flex -space-x-2">
                        {socialProof.avatars.slice(0, 4).map((avatar, index) => (
                          <div key={index} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                            <img src={avatar} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">{socialProof.text}</p>
                  </div>
                )}
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-arcanean-cosmic to-arcanean-deep flex items-center justify-center">
                      <motion.div
                        className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={primaryAction.onClick}
                      >
                        <Play className="w-10 h-10 text-white ml-1" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Container>
        </Section>
      )
    }

    if (variant === "stats") {
      return (
        <Section 
          ref={ref} 
          className={cn(
            "relative overflow-hidden",
            backgroundClasses[backgroundVariant],
            className
          )} 
          {...props}
        >
          <Container centered>
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold nebula-text mb-4">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {subtitle}
              </p>
            </motion.div>

            {showStats && (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 h-full">
                      <CardContent className="space-y-2">
                        {stat.icon && (
                          <div className="w-10 h-10 bg-arcanean-luminous/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <div className="text-arcanean-luminous">
                              {stat.icon}
                            </div>
                          </div>
                        )}
                        <div className="text-3xl font-bold text-arcanean-luminous">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="space-x-4">
                <Button
                  variant={primaryAction.variant}
                  size="lg"
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.text}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                {secondaryAction && (
                  <Button
                    variant={secondaryAction.variant}
                    size="lg"
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.text}
                  </Button>
                )}
              </div>

              {showSocialProof && socialProof && (
                <p className="text-sm text-muted-foreground">
                  {socialProof.text}
                </p>
              )}
            </motion.div>
          </Container>
        </Section>
      )
    }

    if (variant === "social") {
      return (
        <Section 
          ref={ref} 
          className={cn(
            "relative overflow-hidden",
            backgroundClasses[backgroundVariant],
            className
          )} 
          {...props}
        >
          <Container centered>
            <Grid cols={3} gap="lg" responsive>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold nebula-text mb-4">
                    {title}
                  </h2>
                  <p className="text-muted-foreground">
                    {subtitle}
                  </p>
                </div>

                <Button
                  variant={primaryAction.variant}
                  size="lg"
                  onClick={primaryAction.onClick}
                  className="w-full"
                >
                  {primaryAction.text}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold">Connect With Us</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Discord Community
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Newsletter
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Creator Showcase
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold">Quick Start</h3>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download App
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Star className="w-4 h-4 mr-2" />
                    View Examples
                  </Button>
                </div>
              </motion.div>
            </Grid>
          </Container>
        </Section>
      )
    }

    if (variant === "minimalist") {
      return (
        <Section 
          ref={ref} 
          className={cn(
            "relative",
            backgroundClasses[backgroundVariant],
            className
          )} 
          {...props}
        >
          <Container centered>
            <motion.div
              className="max-w-3xl mx-auto text-center space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold nebula-text mb-4">
                  {title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant={primaryAction.variant}
                  size="lg"
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.text}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                {secondaryAction && (
                  <Button
                    variant={secondaryAction.variant}
                    size="lg"
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.text}
                  </Button>
                )}
              </div>

              {showSocialProof && socialProof && (
                <p className="text-sm text-muted-foreground">
                  {socialProof.text}
                </p>
              )}
            </motion.div>
          </Container>
        </Section>
      )
    }

    // Default variant
    return (
      <Section 
        ref={ref} 
        className={cn(
          "relative overflow-hidden",
          backgroundClasses[backgroundVariant],
          className
        )} 
        {...props}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-orb w-64 h-64 bg-arcanean-luminous/10 top-0 left-0" />
          <div className="floating-orb w-96 h-96 bg-arcanean-ethereal/10 bottom-0 right-0" />
        </div>

        <Container centered className="relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-bold nebula-text mb-6">
                {title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {subtitle}
              </p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button
                variant={primaryAction.variant}
                size="lg"
                onClick={primaryAction.onClick}
                className="text-lg px-8 py-4"
              >
                {primaryAction.text}
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>

              {secondaryAction && (
                <Button
                  variant={secondaryAction.variant}
                  size="lg"
                  onClick={secondaryAction.onClick}
                  className="text-lg px-8 py-4"
                >
                  {secondaryAction.text}
                </Button>
              )}
            </motion.div>

            {showStats && (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-arcanean-luminous mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {showSocialProof && socialProof && (
              <motion.div
                className="flex items-center justify-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                {socialProof.avatars && (
                  <div className="flex -space-x-3">
                    {socialProof.avatars.slice(0, 5).map((avatar, index) => (
                      <div key={index} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                        <img src={avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-muted-foreground">{socialProof.text}</p>
              </motion.div>
            )}
          </motion.div>
        </Container>
      </Section>
    )
  }
)

CTASection.displayName = "CTASection"

export { CTASection }