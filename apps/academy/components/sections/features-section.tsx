"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Sparkles, 
  Brain, 
  Users, 
  Target, 
  Zap, 
  Shield, 
  Globe, 
  BookOpen,
  Trophy,
  Palette,
  Code,
  Music,
  Video,
  PenTool,
  Layers,
  ArrowRight,
  CheckCircle
} from "lucide-react"
import { cn } from "../ui/utils"
import { Section, Container, Grid } from "../ui/layout"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface Feature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category?: "ai" | "learning" | "community" | "tools" | "platform"
  highlighted?: boolean
  comingSoon?: boolean
}

interface FeaturesSectionProps extends React.HTMLAttributes<HTMLElement> {
  features?: Feature[]
  title?: string
  subtitle?: string
  variant?: "grid" | "highlighted" | "categories" | "detailed"
  showCategories?: boolean
  maxColumns?: 2 | 3 | 4
  onFeatureClick?: (feature: Feature) => void
}

const defaultFeatures: Feature[] = [
  {
    id: "ai-mentors",
    title: "AI Creative Mentors",
    description: "Collaborate with specialized AI companions trained in different creative disciplines to guide your artistic journey.",
    icon: <Brain className="w-6 h-6" />,
    category: "ai",
    highlighted: true
  },
  {
    id: "personalized-learning",
    title: "Personalized Learning Paths",
    description: "Adaptive curricula that evolve with your progress, ensuring optimal challenge and growth at every step.",
    icon: <Target className="w-6 h-6" />,
    category: "learning",
    highlighted: true
  },
  {
    id: "multi-disciplinary",
    title: "Multi-Disciplinary Approach",
    description: "Break down silos between creative fields and discover new possibilities through cross-disciplinary exploration.",
    icon: <Layers className="w-6 h-6" />,
    category: "learning",
    highlighted: true
  },
  {
    id: "real-time-collaboration",
    title: "Real-Time Collaboration",
    description: "Work together with peers and mentors in shared creative spaces with instant feedback and version control.",
    icon: <Users className="w-6 h-6" />,
    category: "platform"
  },
  {
    id: "industry-tools",
    title: "Industry-Standard Tools",
    description: "Access professional-grade creative software and tools integrated seamlessly into your learning environment.",
    icon: <Zap className="w-6 h-6" />,
    category: "tools"
  },
  {
    id: "global-community",
    title: "Global Creative Community",
    description: "Connect with creators worldwide, share your work, and participate in collaborative projects and challenges.",
    icon: <Globe className="w-6 h-6" />,
    category: "community"
  },
  {
    id: "portfolio-building",
    title: "Dynamic Portfolio System",
    description: "Build and showcase your creative portfolio with integrated project hosting and professional presentation tools.",
    icon: <Trophy className="w-6 h-6" />,
    category: "platform"
  },
  {
    id: "skill-tracking",
    title: "Advanced Skill Tracking",
    description: "Monitor your progress across all creative disciplines with detailed analytics and achievement systems.",
    icon: <BookOpen className="w-6 h-6" />,
    category: "learning"
  },
  {
    id: "secure-learning",
    title: "Secure Learning Environment",
    description: "Privacy-first platform with end-to-end encryption and complete control over your creative work and data.",
    icon: <Shield className="w-6 h-6" />,
    category: "platform"
  },
  {
    id: "visual-arts",
    title: "Visual Arts Studio",
    description: "Comprehensive digital art suite with painting, 3D modeling, and animation tools powered by AI assistance.",
    icon: <Palette className="w-6 h-6" />,
    category: "tools"
  },
  {
    id: "music-production",
    title: "Music Production Suite",
    description: "Full-featured DAW with AI-powered composition tools, virtual instruments, and collaborative mixing.",
    icon: <Music className="w-6 h-6" />,
    category: "tools"
  },
  {
    id: "video-editing",
    title: "Video Production Studio",
    description: "Professional video editing with AI-enhanced effects, color grading, and motion graphics capabilities.",
    icon: <Video className="w-6 h-6" />,
    category: "tools"
  },
  {
    id: "creative-coding",
    title: "Creative Coding Environment",
    description: "Integrated development environment for creating interactive art, generative design, and creative applications.",
    icon: <Code className="w-6 h-6" />,
    category: "tools"
  },
  {
    id: "narrative-tools",
    title: "Narrative Design Tools",
    description: "Story development platform with character builders, plot generators, and collaborative writing features.",
    icon: <PenTool className="w-6 h-6" />,
    category: "tools"
  },
  {
    id: "ai-feedback",
    title: "Intelligent Feedback System",
    description: "Get instant, contextual feedback on your work from AI mentors trained in creative best practices.",
    icon: <Sparkles className="w-6 h-6" />,
    category: "ai",
    comingSoon: true
  }
]

const categoryConfig = {
  ai: {
    name: "AI & Intelligence",
    color: "text-purple-400",
    bg: "bg-purple-500/20",
    border: "border-purple-500/30"
  },
  learning: {
    name: "Learning & Growth",
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    border: "border-blue-500/30"
  },
  community: {
    name: "Community & Social",
    color: "text-green-400",
    bg: "bg-green-500/20",
    border: "border-green-500/30"
  },
  tools: {
    name: "Creative Tools",
    color: "text-yellow-400",
    bg: "bg-yellow-500/20",
    border: "border-yellow-500/30"
  },
  platform: {
    name: "Platform & Infrastructure",
    color: "text-cyan-400",
    bg: "bg-cyan-500/20",
    border: "border-cyan-500/30"
  }
}

const FeaturesSection = React.forwardRef<HTMLElement, FeaturesSectionProps>(
  ({ 
    className, 
    features = defaultFeatures,
    title = "Powerful Features for Creative Excellence",
    subtitle = "Everything you need to unleash your creative potential, from AI-powered mentorship to industry-standard tools.",
    variant = "grid",
    showCategories = true,
    maxColumns = 3,
    onFeatureClick,
    ...props 
  }, ref) => {
    const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
    
    const categories = Array.from(new Set(features.map(f => f.category).filter(Boolean)))
    const filteredFeatures = selectedCategory === "all" 
      ? features 
      : features.filter(f => f.category === selectedCategory)

    const highlightedFeatures = features.filter(f => f.highlighted)
    const otherFeatures = features.filter(f => !f.highlighted)

    if (variant === "highlighted") {
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

            {/* Highlighted Features */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Grid cols={highlightedFeatures.length === 2 ? 2 : 3} gap="lg" responsive>
                {highlightedFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card 
                      className={cn(
                        "h-full transition-all duration-300 hover:shadow-lg hover:shadow-arcanean-luminous/20 border-arcanean-luminous/30 bg-gradient-to-br from-arcanean-cosmic/20 to-arcanean-deep/20",
                        onFeatureClick && "cursor-pointer"
                      )}
                      onClick={() => onFeatureClick?.(feature)}
                    >
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-arcanean-luminous/20 flex items-center justify-center mb-4">
                          <div className="text-arcanean-luminous">
                            {feature.icon}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        {feature.comingSoon && (
                          <Badge variant="cosmic" size="sm" className="w-fit">
                            Coming Soon
                          </Badge>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Grid>
            </motion.div>

            {/* Other Features Grid */}
            <Grid cols={maxColumns} gap="md" responsive>
              {otherFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className={cn(
                      "h-full transition-all duration-300 hover:shadow-md hover:shadow-arcanean-luminous/10",
                      onFeatureClick && "cursor-pointer"
                    )}
                    onClick={() => onFeatureClick?.(feature)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                          feature.category && categoryConfig[feature.category]?.bg
                        )}>
                          <div className={feature.category && categoryConfig[feature.category]?.color}>
                            {feature.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{feature.title}</h3>
                            {feature.comingSoon && (
                              <Badge variant="outline" size="sm">
                                Soon
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Grid>
          </Container>
        </Section>
      )
    }

    if (variant === "categories") {
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

            {/* Category Filters */}
            {showCategories && (
              <motion.div
                className="flex flex-wrap justify-center gap-2 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Button
                  variant={selectedCategory === "all" ? "cosmic" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  All Features
                </Button>
                {categories.map((category) => {
                  const config = categoryConfig[category as keyof typeof categoryConfig]
                  return (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "cosmic" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {config?.name || category}
                    </Button>
                  )
                })}
              </motion.div>
            )}

            {/* Features by Category */}
            <div className="space-y-12">
              {categories.map((category) => {
                const categoryFeatures = features.filter(f => f.category === category)
                const config = categoryConfig[category as keyof typeof categoryConfig]
                
                if (selectedCategory !== "all" && selectedCategory !== category) {
                  return null
                }

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    {selectedCategory === "all" && (
                      <div className="text-center">
                        <h3 className={cn("text-2xl font-bold", config?.color)}>
                          {config?.name}
                        </h3>
                      </div>
                    )}
                    
                    <Grid cols={maxColumns} gap="md" responsive>
                      {categoryFeatures.map((feature, index) => (
                        <motion.div
                          key={feature.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Card 
                            className={cn(
                              "h-full transition-all duration-300 hover:shadow-md",
                              onFeatureClick && "cursor-pointer"
                            )}
                            onClick={() => onFeatureClick?.(feature)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <div className={cn(
                                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                  config?.bg
                                )}>
                                  <div className={config?.color}>
                                    {feature.icon}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h4 className="font-semibold">{feature.title}</h4>
                                    {feature.comingSoon && (
                                      <Badge variant="outline" size="sm">
                                        Soon
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </Grid>
                  </motion.div>
                )
              })}
            </div>
          </Container>
        </Section>
      )
    }

    // Default grid variant
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

          <Grid cols={maxColumns} gap="lg" responsive>
            {filteredFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className={cn(
                    "h-full transition-all duration-300 hover:shadow-lg hover:shadow-arcanean-luminous/10",
                    feature.highlighted && "border-arcanean-luminous/30 bg-gradient-to-br from-arcanean-cosmic/10 to-arcanean-deep/10",
                    onFeatureClick && "cursor-pointer"
                  )}
                  onClick={() => onFeatureClick?.(feature)}
                >
                  <CardHeader>
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                      feature.category && categoryConfig[feature.category]?.bg || "bg-arcanean-cosmic/30"
                    )}>
                      <div className={cn(
                        feature.category && categoryConfig[feature.category]?.color || "text-arcanean-luminous"
                      )}>
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      {feature.comingSoon && (
                        <Badge variant="cosmic" size="sm">
                          Soon
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Grid>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" size="lg">
              Explore All Features
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </Container>
      </Section>
    )
  }
)

FeaturesSection.displayName = "FeaturesSection"

export { FeaturesSection, type Feature }