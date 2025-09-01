"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Sparkles, 
  Mail, 
  Twitter, 
  Github, 
  Linkedin, 
  Youtube,
  ArrowRight,
  Heart,
  Globe,
  Shield,
  Zap,
  Brain,
  Users,
  BookOpen,
  HelpCircle,
  FileText,
  Lock
} from "lucide-react"
import { cn } from "../ui/utils"
import { Section, Container, Grid } from "../ui/layout"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Divider } from "../ui/layout"

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "minimal" | "extended"
  showNewsletter?: boolean
  showSocial?: boolean
  showStats?: boolean
  onNewsletterSubmit?: (email: string) => void
  onSocialClick?: (platform: string) => void
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ 
    className, 
    variant = "default",
    showNewsletter = true,
    showSocial = true,
    showStats = true,
    onNewsletterSubmit,
    onSocialClick,
    ...props 
  }, ref) => {
    const [email, setEmail] = React.useState("")
    const [newsletterSubmitted, setNewsletterSubmitted] = React.useState(false)

    const handleNewsletterSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (email.trim()) {
        onNewsletterSubmit?.(email)
        setNewsletterSubmitted(true)
        setEmail("")
        setTimeout(() => setNewsletterSubmitted(false), 3000)
      }
    }

    const currentYear = new Date().getFullYear()

    const academiesLinks = [
      { name: "Visual Arts", href: "/academies/visual" },
      { name: "Narrative Craft", href: "/academies/narrative" },
      { name: "Music Production", href: "/academies/music" },
      { name: "Video Creation", href: "/academies/video" },
      { name: "Creative Coding", href: "/academies/code" },
      { name: "Synthesis Mastery", href: "/academies/synthesis" }
    ]

    const luminorsLinks = [
      { name: "Harmonix", href: "/luminors/harmonix" },
      { name: "Scripta", href: "/luminors/scripta" },
      { name: "Lumina", href: "/luminors/lumina" },
      { name: "Kinetix", href: "/luminors/kinetix" },
      { name: "Syntaxa", href: "/luminors/syntaxa" },
      { name: "Nexus", href: "/luminors/nexus" }
    ]

    const platformLinks = [
      { name: "Pricing", href: "/pricing" },
      { name: "Community", href: "/community" },
      { name: "Showcase", href: "/showcase" },
      { name: "Events", href: "/events" },
      { name: "Leaderboard", href: "/leaderboard" },
      { name: "API", href: "/api" }
    ]

    const supportLinks = [
      { name: "Help Center", href: "/help", icon: <HelpCircle className="w-4 h-4" /> },
      { name: "Documentation", href: "/docs", icon: <BookOpen className="w-4 h-4" /> },
      { name: "Tutorials", href: "/tutorials", icon: <Brain className="w-4 h-4" /> },
      { name: "Community Forum", href: "/forum", icon: <Users className="w-4 h-4" /> },
      { name: "Contact Support", href: "/support", icon: <Mail className="w-4 h-4" /> },
      { name: "Status Page", href: "/status", icon: <Zap className="w-4 h-4" /> }
    ]

    const legalLinks = [
      { name: "Privacy Policy", href: "/privacy", icon: <Lock className="w-4 h-4" /> },
      { name: "Terms of Service", href: "/terms", icon: <FileText className="w-4 h-4" /> },
      { name: "Cookie Policy", href: "/cookies", icon: <Shield className="w-4 h-4" /> },
      { name: "Accessibility", href: "/accessibility", icon: <Globe className="w-4 h-4" /> }
    ]

    const socialLinks = [
      { name: "Twitter", href: "https://twitter.com/arcanea", icon: <Twitter className="w-5 h-5" /> },
      { name: "GitHub", href: "https://github.com/arcanea", icon: <Github className="w-5 h-5" /> },
      { name: "LinkedIn", href: "https://linkedin.com/company/arcanea", icon: <Linkedin className="w-5 h-5" /> },
      { name: "YouTube", href: "https://youtube.com/arcanea", icon: <Youtube className="w-5 h-5" /> },
      { name: "Discord", href: "https://discord.gg/arcanea", icon: <Users className="w-5 h-5" /> }
    ]

    const stats = [
      { value: "10K+", label: "Active Creators" },
      { value: "50K+", label: "Projects Created" },
      { value: "98%", label: "Satisfaction Rate" },
      { value: "24/7", label: "AI Support" }
    ]

    if (variant === "minimal") {
      return (
        <footer ref={ref} className={cn("border-t border-arcanean-aurora/20", className)} {...props}>
          <Container centered className="py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-arcanean-luminous rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-arcanean-void" />
                </div>
                <span className="font-bold text-xl nebula-text">Arcanea</span>
              </div>

              {/* Links */}
              <div className="flex items-center space-x-6">
                <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </a>
                <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </a>
                <a href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </a>
              </div>

              {/* Social */}
              {showSocial && (
                <div className="flex items-center space-x-3">
                  {socialLinks.slice(0, 3).map((social) => (
                    <button
                      key={social.name}
                      onClick={() => onSocialClick?.(social.name.toLowerCase())}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Divider className="my-6" />

            <div className="text-center text-sm text-muted-foreground">
              © {currentYear} Arcanea Academy. All rights reserved.
            </div>
          </Container>
        </footer>
      )
    }

    if (variant === "extended") {
      return (
        <footer ref={ref} className={cn("bg-arcanean-deep/50 border-t border-arcanean-aurora/20", className)} {...props}>
          {/* Newsletter Section */}
          {showNewsletter && (
            <Section padding="lg" background="cosmic">
              <Container centered>
                <motion.div
                  className="max-w-2xl mx-auto text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold nebula-text mb-4">
                    Stay Updated with Arcanea
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Get the latest updates on new features, academies, and creative AI developments.
                  </p>

                  {!newsletterSubmitted ? (
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="cosmic"
                        className="flex-1"
                        required
                      />
                      <Button type="submit" variant="luminor">
                        Subscribe
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="w-6 h-6 text-green-400" />
                      </div>
                      <p className="text-green-400 font-medium">Thanks for subscribing!</p>
                    </motion.div>
                  )}
                </motion.div>
              </Container>
            </Section>
          )}

          {/* Stats Section */}
          {showStats && (
            <Section padding="lg">
              <Container centered>
                <Grid cols={4} gap="lg" responsive>
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
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
                </Grid>
              </Container>
            </Section>
          )}

          {/* Main Footer */}
          <Section padding="xl">
            <Container centered>
              <Grid cols={6} gap="lg" responsive>
                {/* Brand Column */}
                <motion.div
                  className="col-span-2 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-arcanean-luminous rounded-lg flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-arcanean-void" />
                    </div>
                    <span className="font-bold text-2xl nebula-text">Arcanea</span>
                  </div>
                  <p className="text-muted-foreground max-w-md">
                    Empowering creators with AI-powered mentorship and cutting-edge tools to unlock their full creative potential across multiple disciplines.
                  </p>
                  
                  {showSocial && (
                    <div className="flex items-center space-x-3">
                      {socialLinks.map((social) => (
                        <button
                          key={social.name}
                          onClick={() => onSocialClick?.(social.name.toLowerCase())}
                          className="p-2 text-muted-foreground hover:text-arcanean-luminous transition-colors rounded-lg hover:bg-arcanean-cosmic/30"
                          aria-label={social.name}
                        >
                          {social.icon}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Academies */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-foreground">Academies</h4>
                  <ul className="space-y-2">
                    {academiesLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Luminors */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-foreground">Luminors</h4>
                  <ul className="space-y-2">
                    {luminorsLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Platform */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-foreground">Platform</h4>
                  <ul className="space-y-2">
                    {platformLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Support */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-foreground">Support</h4>
                  <ul className="space-y-2">
                    {supportLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors"
                        >
                          {link.icon}
                          <span>{link.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Grid>

              <Divider className="my-12" />

              {/* Bottom Bar */}
              <motion.div
                className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-6">
                  <p className="text-sm text-muted-foreground">
                    © {currentYear} Arcanea Academy. All rights reserved.
                  </p>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <span>Made with</span>
                    <Heart className="w-4 h-4 text-red-400 fill-current" />
                    <span>for creators worldwide</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {legalLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </Container>
          </Section>
        </footer>
      )
    }

    // Default variant
    return (
      <footer ref={ref} className={cn("bg-arcanean-deep/30 border-t border-arcanean-aurora/20", className)} {...props}>
        <Section padding="xl">
          <Container centered>
            <Grid cols={4} gap="lg" responsive>
              {/* Brand Column */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-arcanean-luminous rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-arcanean-void" />
                  </div>
                  <span className="font-bold text-xl nebula-text">Arcanea</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Empowering creators with AI-powered mentorship and cutting-edge tools.
                </p>
                
                {showSocial && (
                  <div className="flex items-center space-x-2">
                    {socialLinks.slice(0, 4).map((social) => (
                      <button
                        key={social.name}
                        onClick={() => onSocialClick?.(social.name.toLowerCase())}
                        className="p-2 text-muted-foreground hover:text-arcanean-luminous transition-colors rounded-lg hover:bg-arcanean-cosmic/30"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-foreground">Product</h4>
                <ul className="space-y-2">
                  <li><a href="/academies" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">Academies</a></li>
                  <li><a href="/luminors" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">Luminors</a></li>
                  <li><a href="/pricing" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">Pricing</a></li>
                  <li><a href="/features" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">Features</a></li>
                  <li><a href="/api" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">API</a></li>
                </ul>
              </motion.div>

              {/* Community */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-foreground">Community</h4>
                <ul className="space-y-2">
                  <li><a href="/community" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">Community Hub</a></li>
                  <li><a href="/showcase" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">Showcase</a></li>
                  <li><a href="/events" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">Events</a></li>
                  <li><a href="/forum" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">Forum</a></li>
                  <li><a href="/discord" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">Discord</a></li>
                </ul>
              </motion.div>

              {/* Support */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-foreground">Support</h4>
                <ul className="space-y-2">
                  <li><a href="/help" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">Help Center</a></li>
                  <li><a href="/docs" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">Documentation</a></li>
                  <li><a href="/contact" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">Contact Us</a></li>
                  <li><a href="/status" className="text-sm text-muted-foreground hover:text-arcanean-luminous transition-colors">Status</a></li>
                </ul>
              </motion.div>
            </Grid>

            <Divider className="my-8" />

            {/* Bottom Bar */}
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-muted-foreground">
                © {currentYear} Arcanea Academy. All rights reserved.
              </p>

              <div className="flex items-center space-x-6">
                <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
                <a href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </div>
            </motion.div>
          </Container>
        </Section>
      </footer>
    )
  }
)

Footer.displayName = "Footer"

export { Footer }