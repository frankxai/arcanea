"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, MessageSquare, Brain, Zap } from "lucide-react"
import { cn, type LuminorType } from "../ui/utils"
import { Section, Container, Grid } from "../ui/layout"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { LuminorPanel } from "../arcanea/luminor-panel"

interface Luminor {
  id: string
  name: string
  type: LuminorType
  description: string
  avatar?: string
  personality: string
  capabilities: string[]
  status: "online" | "offline" | "busy" | "away"
  currentUsers?: number
  totalInteractions?: number
  averageRating?: number
  lastActive?: Date
  specialty: string
  featured?: boolean
}

interface LuminorsSectionProps extends React.HTMLAttributes<HTMLElement> {
  luminors?: Luminor[]
  title?: string
  subtitle?: string
  showStats?: boolean
  variant?: "overview" | "interactive" | "compact" | "featured"
  onLuminorClick?: (luminor: Luminor) => void
  onInteract?: (luminor: Luminor) => void
  maxDisplayed?: number
}

const defaultLuminors: Luminor[] = [
  {
    id: "harmonix",
    name: "Harmonix",
    type: "harmonix",
    description: "Your creative companion for music and audio production. Harmonix helps you compose, arrange, and produce music across all genres.",
    personality: "Passionate, rhythmic, and inspiring. Harmonix speaks in musical metaphors and encourages creative experimentation.",
    capabilities: [
      "Music Composition",
      "Audio Production",
      "Sound Design",
      "Mixing & Mastering",
      "Music Theory",
      "Genre Analysis"
    ],
    status: "online",
    currentUsers: 245,
    totalInteractions: 15420,
    averageRating: 4.8,
    specialty: "Music & Audio Production",
    featured: true
  },
  {
    id: "scripta",
    name: "Scripta",
    type: "scripta",
    description: "Master storyteller and writing mentor. Scripta guides you through narrative creation, from short stories to complex screenplays.",
    personality: "Eloquent, thoughtful, and wise. Scripta uses rich language and helps you find your unique voice.",
    capabilities: [
      "Story Development",
      "Character Creation",
      "Dialogue Writing",
      "Plot Structure",
      "Editing & Revision",
      "Genre Writing"
    ],
    status: "online",
    currentUsers: 189,
    totalInteractions: 22340,
    averageRating: 4.9,
    specialty: "Writing & Storytelling",
    featured: true
  },
  {
    id: "lumina",
    name: "Lumina",
    type: "lumina",
    description: "Visual arts mentor specializing in digital creation. Lumina illuminates the path to stunning visual experiences.",
    personality: "Vibrant, imaginative, and detail-oriented. Lumina sees the world in colors and helps you express your vision.",
    capabilities: [
      "Digital Painting",
      "3D Modeling",
      "Visual Effects",
      "Color Theory",
      "Composition",
      "Concept Art"
    ],
    status: "online",
    currentUsers: 312,
    totalInteractions: 18750,
    averageRating: 4.7,
    specialty: "Visual Arts & Design",
    featured: true
  },
  {
    id: "kinetix",
    name: "Kinetix",
    type: "kinetix",
    description: "Dynamic video and animation expert. Kinetix brings motion to your ideas through cutting-edge video production techniques.",
    personality: "Energetic, dynamic, and forward-thinking. Kinetix thinks in frames and helps you create compelling motion graphics.",
    capabilities: [
      "Video Editing",
      "Animation",
      "Motion Graphics",
      "Cinematography",
      "Color Grading",
      "Visual Storytelling"
    ],
    status: "busy",
    currentUsers: 156,
    totalInteractions: 9870,
    averageRating: 4.6,
    specialty: "Video & Animation"
  },
  {
    id: "syntaxa",
    name: "Syntaxa",
    type: "syntaxa",
    description: "Creative coding specialist bridging technology and art. Syntaxa helps you create interactive experiences and generative art.",
    personality: "Logical, innovative, and experimental. Syntaxa thinks in algorithms and helps you code your creativity.",
    capabilities: [
      "Creative Coding",
      "Interactive Design",
      "Generative Art",
      "Web Development",
      "Data Visualization",
      "AI Integration"
    ],
    status: "online",
    currentUsers: 203,
    totalInteractions: 12560,
    averageRating: 4.8,
    specialty: "Creative Technology"
  },
  {
    id: "nexus",
    name: "Nexus",
    type: "nexus",
    description: "Synthesis master helping you connect different creative disciplines. Nexus sees the bigger picture and helps you innovate.",
    personality: "Holistic, visionary, and integrative. Nexus connects dots across disciplines and encourages boundary-pushing creativity.",
    capabilities: [
      "Cross-disciplinary Projects",
      "Innovation Methods",
      "Creative Strategy",
      "Portfolio Development",
      "Industry Insights",
      "Future Trends"
    ],
    status: "away",
    currentUsers: 87,
    totalInteractions: 5430,
    averageRating: 5.0,
    specialty: "Creative Synthesis",
    featured: true
  }
]

const LuminorsSection = React.forwardRef<HTMLElement, LuminorsSectionProps>(
  ({ 
    className, 
    luminors = defaultLuminors,
    title = "Meet Your AI Creative Mentors",
    subtitle = "Connect with specialized AI companions designed to guide, inspire, and collaborate with you on your creative journey.",
    showStats = true,
    variant = "overview",
    onLuminorClick,
    onInteract,
    maxDisplayed,
    ...props 
  }, ref) => {
    const displayedLuminors = maxDisplayed ? luminors.slice(0, maxDisplayed) : luminors
    const featuredLuminors = luminors.filter(luminor => luminor.featured)
    const totalUsers = luminors.reduce((sum, luminor) => sum + (luminor.currentUsers || 0), 0)
    const totalInteractions = luminors.reduce((sum, luminor) => sum + (luminor.totalInteractions || 0), 0)
    const averageRating = luminors.reduce((sum, luminor) => sum + (luminor.averageRating || 0), 0) / luminors.length

    if (variant === "featured") {
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

            {/* Featured Luminor */}
            {featuredLuminors[0] && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <LuminorPanel
                  luminor={featuredLuminors[0]}
                  variant="interactive"
                  onViewProfile={() => onLuminorClick?.(featuredLuminors[0])}
                  onInteract={() => onInteract?.(featuredLuminors[0])}
                />
              </motion.div>
            )}

            {/* Other Featured Luminors */}
            <Grid cols={3} gap="lg" responsive>
              {featuredLuminors.slice(1, 4).map((luminor, index) => (
                <motion.div
                  key={luminor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <LuminorPanel
                    luminor={luminor}
                    variant="card"
                    onViewProfile={() => onLuminorClick?.(luminor)}
                    onInteract={() => onInteract?.(luminor)}
                  />
                </motion.div>
              ))}
            </Grid>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button variant="luminor" size="lg">
                Explore All Luminors
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </Container>
        </Section>
      )
    }

    if (variant === "compact") {
      return (
        <Section ref={ref} className={cn("", className)} {...props}>
          <Container centered>
            <div className="text-center mb-8">
              <motion.h2
                className="text-2xl md:text-3xl font-bold nebula-text mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {title}
              </motion.h2>
              <motion.p
                className="text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {subtitle}
              </motion.p>
            </div>

            <Grid cols={3} gap="md" responsive>
              {displayedLuminors.map((luminor, index) => (
                <motion.div
                  key={luminor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <LuminorPanel
                    luminor={luminor}
                    variant="compact"
                    onInteract={() => onInteract?.(luminor)}
                  />
                </motion.div>
              ))}
            </Grid>
          </Container>
        </Section>
      )
    }

    if (variant === "interactive") {
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

            <Grid cols={2} gap="lg" responsive>
              {displayedLuminors.map((luminor, index) => (
                <motion.div
                  key={luminor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <LuminorPanel
                    luminor={luminor}
                    variant="interactive"
                    onViewProfile={() => onLuminorClick?.(luminor)}
                    onInteract={() => onInteract?.(luminor)}
                    interactive
                  />
                </motion.div>
              ))}
            </Grid>
          </Container>
        </Section>
      )
    }

    // Default overview variant
    return (
      <Section ref={ref} className={cn("", className)} {...props}>
        <Container centered>
          {/* Header */}
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

          {/* Global Stats */}
          {showStats && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-arcanean-luminous mb-2">
                    {luminors.length}
                  </div>
                  <div className="text-sm text-muted-foreground">AI Mentors</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-arcanean-luminous mb-2">
                    {totalUsers.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-arcanean-luminous mb-2">
                    {(totalInteractions / 1000).toFixed(1)}K
                  </div>
                  <div className="text-sm text-muted-foreground">Interactions</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-arcanean-luminous mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Luminors Grid */}
          <Grid cols={3} gap="lg" responsive>
            {displayedLuminors.map((luminor, index) => (
              <motion.div
                key={luminor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <LuminorPanel
                  luminor={luminor}
                  variant="card"
                  onViewProfile={() => onLuminorClick?.(luminor)}
                  onInteract={() => onInteract?.(luminor)}
                />
              </motion.div>
            ))}
          </Grid>

          {/* How It Works */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold nebula-text mb-4">How Luminors Work</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each Luminor is uniquely designed to excel in specific creative domains while maintaining the ability to collaborate across disciplines.
              </p>
            </div>

            <Grid cols={4} gap="lg" responsive>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Chat & Collaborate</h4>
                  <p className="text-sm text-muted-foreground">
                    Have natural conversations and collaborate on creative projects in real-time.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Personalized Guidance</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive tailored advice and mentorship based on your skill level and goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Creative Inspiration</h4>
                  <p className="text-sm text-muted-foreground">
                    Get inspired with creative prompts, techniques, and innovative approaches.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Instant Feedback</h4>
                  <p className="text-sm text-muted-foreground">
                    Get immediate constructive feedback on your work and ideas.
                  </p>
                </CardContent>
              </Card>
            </Grid>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <Button variant="luminor" size="lg">
              Start Collaborating with AI
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </Container>
      </Section>
    )
  }
)

LuminorsSection.displayName = "LuminorsSection"

export { LuminorsSection, type Luminor }