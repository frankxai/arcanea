"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check, Star, Crown, Zap, Users, ArrowRight, Info } from "lucide-react"
import { cn } from "../ui/utils"
import { Section, Container, Grid } from "../ui/layout"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Switch } from "@radix-ui/react-switch"

interface PricingPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  currency: string
  popular?: boolean
  featured?: boolean
  features: Array<{
    name: string
    included: boolean
    description?: string
  }>
  limits?: {
    projects?: number | "unlimited"
    storage?: string
    luminorInteractions?: number | "unlimited"
    academies?: number | "all"
    collaborators?: number | "unlimited"
  }
  cta: string
  icon?: React.ReactNode
}

interface PricingSectionProps extends React.HTMLAttributes<HTMLElement> {
  plans?: PricingPlan[]
  title?: string
  subtitle?: string
  showYearlyToggle?: boolean
  showComparison?: boolean
  onPlanSelect?: (plan: PricingPlan) => void
  onContactSales?: () => void
}

const defaultPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for beginners exploring creative AI",
    price: {
      monthly: 0,
      yearly: 0
    },
    currency: "USD",
    icon: <Star className="w-6 h-6" />,
    features: [
      { name: "Access to 2 Academies", included: true },
      { name: "Basic AI Mentor Interactions", included: true, description: "50 interactions per month" },
      { name: "Community Access", included: true },
      { name: "Basic Project Tools", included: true },
      { name: "5GB Cloud Storage", included: true },
      { name: "Standard Support", included: true },
      { name: "Offline Mode", included: false },
      { name: "Advanced Analytics", included: false },
      { name: "Priority Support", included: false },
      { name: "Custom Integrations", included: false }
    ],
    limits: {
      projects: 3,
      storage: "5GB",
      luminorInteractions: 50,
      academies: 2,
      collaborators: 1
    },
    cta: "Start Free"
  },
  {
    id: "creator",
    name: "Creator",
    description: "For serious creators ready to unlock their potential",
    price: {
      monthly: 29,
      yearly: 290
    },
    currency: "USD",
    popular: true,
    icon: <Zap className="w-6 h-6" />,
    features: [
      { name: "Access to All Academies", included: true },
      { name: "Unlimited AI Mentor Interactions", included: true },
      { name: "Advanced Project Tools", included: true },
      { name: "100GB Cloud Storage", included: true },
      { name: "Collaboration Features", included: true },
      { name: "Priority Support", included: true },
      { name: "Offline Mode", included: true },
      { name: "Portfolio Hosting", included: true },
      { name: "Advanced Analytics", included: false },
      { name: "Custom Integrations", included: false }
    ],
    limits: {
      projects: "unlimited",
      storage: "100GB",
      luminorInteractions: "unlimited",
      academies: "all",
      collaborators: 5
    },
    cta: "Start Creating"
  },
  {
    id: "professional",
    name: "Professional",
    description: "For professionals and teams building amazing things",
    price: {
      monthly: 79,
      yearly: 790
    },
    currency: "USD",
    featured: true,
    icon: <Crown className="w-6 h-6" />,
    features: [
      { name: "Everything in Creator", included: true },
      { name: "Team Collaboration", included: true, description: "Up to 10 team members" },
      { name: "500GB Cloud Storage", included: true },
      { name: "Advanced Analytics", included: true },
      { name: "Custom Integrations", included: true },
      { name: "White-label Options", included: true },
      { name: "Dedicated Support", included: true },
      { name: "Custom AI Training", included: true },
      { name: "API Access", included: true },
      { name: "SSO Integration", included: true }
    ],
    limits: {
      projects: "unlimited",
      storage: "500GB",
      luminorInteractions: "unlimited",
      academies: "all",
      collaborators: 10
    },
    cta: "Go Professional"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For organizations requiring advanced features and support",
    price: {
      monthly: 199,
      yearly: 1990
    },
    currency: "USD",
    icon: <Users className="w-6 h-6" />,
    features: [
      { name: "Everything in Professional", included: true },
      { name: "Unlimited Team Members", included: true },
      { name: "Unlimited Storage", included: true },
      { name: "Advanced Security", included: true },
      { name: "Custom AI Models", included: true },
      { name: "Dedicated Account Manager", included: true },
      { name: "On-premise Deployment", included: true },
      { name: "Custom Integrations", included: true },
      { name: "24/7 Priority Support", included: true },
      { name: "SLA Guarantee", included: true }
    ],
    limits: {
      projects: "unlimited",
      storage: "unlimited",
      luminorInteractions: "unlimited",
      academies: "all",
      collaborators: "unlimited"
    },
    cta: "Contact Sales"
  }
]

const PricingSection = React.forwardRef<HTMLElement, PricingSectionProps>(
  ({ 
    className, 
    plans = defaultPlans,
    title = "Choose Your Creative Journey",
    subtitle = "Flexible pricing plans designed to grow with your creative ambitions. Start free and scale as you create.",
    showYearlyToggle = true,
    showComparison = true,
    onPlanSelect,
    onContactSales,
    ...props 
  }, ref) => {
    const [isYearly, setIsYearly] = React.useState(false)
    const [comparisonMode, setComparisonMode] = React.useState(false)

    const getPrice = (plan: PricingPlan) => {
      return isYearly ? plan.price.yearly : plan.price.monthly
    }

    const getSavings = (plan: PricingPlan) => {
      const monthlyTotal = plan.price.monthly * 12
      const yearlySavings = monthlyTotal - plan.price.yearly
      return yearlySavings > 0 ? Math.round((yearlySavings / monthlyTotal) * 100) : 0
    }

    const formatPrice = (price: number, currency: string = "USD") => {
      if (price === 0) return "Free"
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
      }).format(price)
    }

    if (showComparison && comparisonMode) {
      // Feature comparison table
      const allFeatures = Array.from(
        new Set(plans.flatMap(plan => plan.features.map(f => f.name)))
      )

      return (
        <Section ref={ref} className={cn("", className)} {...props}>
          <Container centered>
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold nebula-text mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {title}
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {subtitle}
              </motion.p>
              <Button
                variant="outline"
                onClick={() => setComparisonMode(false)}
              >
                Back to Plans
              </Button>
            </div>

            <motion.div
              className="overflow-x-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 border-b">Features</th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="text-center p-4 border-b min-w-[200px]">
                        <div className="space-y-2">
                          <div className={cn(
                            "w-12 h-12 rounded-lg mx-auto flex items-center justify-center",
                            plan.featured ? "bg-arcanean-luminous/20" : "bg-arcanean-cosmic/30"
                          )}>
                            {plan.icon}
                          </div>
                          <h3 className="font-semibold">{plan.name}</h3>
                          <div className="text-2xl font-bold">
                            {formatPrice(getPrice(plan), plan.currency)}
                            {getPrice(plan) > 0 && (
                              <span className="text-sm font-normal text-muted-foreground">
                                /{isYearly ? "year" : "month"}
                              </span>
                            )}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((featureName, index) => (
                    <tr key={featureName} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                      <td className="p-4 font-medium">{featureName}</td>
                      {plans.map((plan) => {
                        const feature = plan.features.find(f => f.name === featureName)
                        return (
                          <td key={`${plan.id}-${featureName}`} className="p-4 text-center">
                            {feature?.included ? (
                              <Check className="w-5 h-5 text-green-400 mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </Container>
        </Section>
      )
    }

    return (
      <Section ref={ref} className={cn("", className)} {...props}>
        <Container centered>
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold nebula-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Pricing Toggle */}
          {showYearlyToggle && (
            <motion.div
              className="flex items-center justify-center space-x-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className={cn(
                "text-sm font-medium transition-colors",
                !isYearly ? "text-foreground" : "text-muted-foreground"
              )}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-arcanean-luminous"
              />
              <span className={cn(
                "text-sm font-medium transition-colors",
                isYearly ? "text-foreground" : "text-muted-foreground"
              )}>
                Yearly
              </span>
              {isYearly && (
                <Badge variant="success" size="sm">
                  Save up to 20%
                </Badge>
              )}
            </motion.div>
          )}

          {/* Pricing Cards */}
          <Grid cols={4} gap="lg" responsive>
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge variant="cosmic" size="sm">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={cn(
                  "h-full transition-all duration-300 hover:shadow-lg",
                  plan.featured && "border-arcanean-luminous/50 bg-gradient-to-br from-arcanean-cosmic/20 to-arcanean-deep/20 hover:shadow-arcanean-luminous/20",
                  plan.popular && "ring-2 ring-arcanean-luminous/30"
                )}>
                  <CardHeader className="text-center pb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center",
                      plan.featured ? "bg-arcanean-luminous/20" : "bg-arcanean-cosmic/30"
                    )}>
                      <div className={plan.featured ? "text-arcanean-luminous" : "text-arcanean-celestial"}>
                        {plan.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Pricing */}
                    <div className="text-center">
                      <div className="text-4xl font-bold">
                        {formatPrice(getPrice(plan), plan.currency)}
                      </div>
                      {getPrice(plan) > 0 && (
                        <div className="text-sm text-muted-foreground">
                          per {isYearly ? "year" : "month"}
                        </div>
                      )}
                      {isYearly && getSavings(plan) > 0 && (
                        <div className="text-sm text-green-400 mt-1">
                          Save {getSavings(plan)}%
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {feature.included ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <div className="w-4 h-4 rounded-full bg-muted" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span className={cn(
                              "text-sm",
                              feature.included ? "text-foreground" : "text-muted-foreground line-through"
                            )}>
                              {feature.name}
                            </span>
                            {feature.description && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {feature.description}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Limits */}
                    {plan.limits && (
                      <div className="border-t pt-4 space-y-2">
                        <h4 className="text-sm font-medium">Plan Limits:</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {plan.limits.projects && (
                            <div>
                              <span className="text-muted-foreground">Projects:</span>
                              <div className="font-medium">{plan.limits.projects}</div>
                            </div>
                          )}
                          {plan.limits.storage && (
                            <div>
                              <span className="text-muted-foreground">Storage:</span>
                              <div className="font-medium">{plan.limits.storage}</div>
                            </div>
                          )}
                          {plan.limits.luminorInteractions && (
                            <div>
                              <span className="text-muted-foreground">AI Chats:</span>
                              <div className="font-medium">{plan.limits.luminorInteractions}</div>
                            </div>
                          )}
                          {plan.limits.collaborators && (
                            <div>
                              <span className="text-muted-foreground">Team:</span>
                              <div className="font-medium">{plan.limits.collaborators}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <Button
                      variant={plan.featured ? "luminor" : plan.popular ? "cosmic" : "outline"}
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        if (plan.id === "enterprise") {
                          onContactSales?.()
                        } else {
                          onPlanSelect?.(plan)
                        }
                      }}
                    >
                      {plan.cta}
                      {plan.id !== "enterprise" && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Grid>

          {/* Additional Info */}
          <motion.div
            className="text-center mt-12 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground">
              All plans include a 14-day free trial. No credit card required.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setComparisonMode(true)}
              >
                <Info className="w-4 h-4 mr-2" />
                Compare all features
              </Button>
              <Button variant="ghost" size="sm">
                View FAQ
              </Button>
              <Button variant="ghost" size="sm" onClick={onContactSales}>
                Contact Sales
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-green-400" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-green-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-green-400" />
                <span>Secure payments</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    )
  }
)

PricingSection.displayName = "PricingSection"

export { PricingSection, type PricingPlan }