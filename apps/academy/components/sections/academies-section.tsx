"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Filter, Search, Grid, List } from "lucide-react"
import { cn } from "../ui/utils"
import { Section, Container, Grid as GridLayout } from "../ui/layout"
import { Button } from "../ui/button"
import { Input, SearchInput } from "../ui/input"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { AcademyCard } from "../arcanea/academy-card"

interface Academy {
  id: string
  name: string
  category: "visual" | "narrative" | "music" | "video" | "code" | "synthesis"
  description: string
  image?: string
  icon?: React.ReactNode
  level: "beginner" | "intermediate" | "advanced" | "all"
  duration: string
  students: number
  rating: number
  price?: number
  features: string[]
  instructor?: {
    name: string
    avatar?: string
    title: string
  }
  featured?: boolean
}

interface AcademiesSectionProps extends React.HTMLAttributes<HTMLElement> {
  academies?: Academy[]
  title?: string
  subtitle?: string
  showFilters?: boolean
  showSearch?: boolean
  showViewToggle?: boolean
  maxDisplayed?: number
  variant?: "grid" | "featured" | "compact"
  onAcademyClick?: (academy: Academy) => void
  onEnrollClick?: (academy: Academy) => void
}

const defaultAcademies: Academy[] = [
  {
    id: "visual-academy",
    name: "Visual Arts Academy",
    category: "visual",
    description: "Master the art of visual creation with cutting-edge tools and techniques. Learn digital painting, 3D modeling, and visual effects.",
    level: "all",
    duration: "12 weeks",
    students: 2847,
    rating: 4.8,
    price: 299,
    features: ["Digital Painting", "3D Modeling", "Visual Effects", "Portfolio Development"],
    instructor: {
      name: "Elena Vasquez",
      title: "Senior Visual Artist"
    },
    featured: true
  },
  {
    id: "narrative-academy",
    name: "Narrative Craft Academy",
    category: "narrative",
    description: "Develop compelling storytelling skills across multiple mediums. From screenwriting to interactive narratives.",
    level: "beginner",
    duration: "10 weeks",
    students: 1934,
    rating: 4.9,
    price: 249,
    features: ["Screenwriting", "Character Development", "Plot Structure", "Interactive Stories"],
    instructor: {
      name: "Marcus Chen",
      title: "Narrative Designer"
    }
  },
  {
    id: "music-academy",
    name: "Music Production Academy",
    category: "music",
    description: "Create professional-quality music using modern production techniques and industry-standard tools.",
    level: "intermediate",
    duration: "14 weeks",
    students: 3156,
    rating: 4.7,
    price: 349,
    features: ["Digital Audio Workstations", "Mixing & Mastering", "Sound Design", "Music Theory"],
    instructor: {
      name: "DJ Luna",
      title: "Music Producer"
    }
  },
  {
    id: "video-academy",
    name: "Video Creation Academy",
    category: "video",
    description: "Master video production from concept to final cut. Learn cinematography, editing, and post-production.",
    level: "all",
    duration: "16 weeks",
    students: 2445,
    rating: 4.6,
    price: 399,
    features: ["Cinematography", "Video Editing", "Color Grading", "Motion Graphics"],
    instructor: {
      name: "Alex Rodriguez",
      title: "Film Director"
    }
  },
  {
    id: "code-academy",
    name: "Creative Coding Academy",
    category: "code",
    description: "Bridge the gap between technology and creativity. Learn to code interactive experiences and digital art.",
    level: "intermediate",
    duration: "18 weeks",
    students: 4120,
    rating: 4.9,
    price: 449,
    features: ["JavaScript", "Creative Libraries", "Generative Art", "Interactive Design"],
    instructor: {
      name: "Sarah Kim",
      title: "Creative Technologist"
    },
    featured: true
  },
  {
    id: "synthesis-academy",
    name: "Synthesis Mastery Academy",
    category: "synthesis",
    description: "Learn to combine multiple creative disciplines into cohesive, innovative projects.",
    level: "advanced",
    duration: "20 weeks",
    students: 1567,
    rating: 5.0,
    price: 599,
    features: ["Cross-Disciplinary Projects", "Innovation Methods", "Portfolio Integration", "Industry Mentorship"],
    instructor: {
      name: "Dr. James Wright",
      title: "Creative Director"
    },
    featured: true
  }
]

const AcademiesSection = React.forwardRef<HTMLElement, AcademiesSectionProps>(
  ({ 
    className, 
    academies = defaultAcademies,
    title = "Choose Your Creative Path",
    subtitle = "Explore our comprehensive academies designed to nurture your creative potential across multiple disciplines.",
    showFilters = true,
    showSearch = true,
    showViewToggle = true,
    maxDisplayed,
    variant = "grid",
    onAcademyClick,
    onEnrollClick,
    ...props 
  }, ref) => {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
    const [selectedLevel, setSelectedLevel] = React.useState<string>("all")
    const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

    const categories = [
      { id: "all", name: "All Categories", icon: "🎯" },
      { id: "visual", name: "Visual Arts", icon: "🎨" },
      { id: "narrative", name: "Narrative", icon: "📚" },
      { id: "music", name: "Music", icon: "🎵" },
      { id: "video", name: "Video", icon: "🎬" },
      { id: "code", name: "Creative Code", icon: "💻" },
      { id: "synthesis", name: "Synthesis", icon: "⚡" }
    ]

    const levels = [
      { id: "all", name: "All Levels" },
      { id: "beginner", name: "Beginner" },
      { id: "intermediate", name: "Intermediate" },
      { id: "advanced", name: "Advanced" }
    ]

    // Filter academies
    const filteredAcademies = React.useMemo(() => {
      let filtered = academies.filter(academy => {
        const matchesSearch = academy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            academy.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || academy.category === selectedCategory
        const matchesLevel = selectedLevel === "all" || academy.level === selectedLevel || academy.level === "all"
        
        return matchesSearch && matchesCategory && matchesLevel
      })

      // Sort featured first
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return 0
      })

      return maxDisplayed ? filtered.slice(0, maxDisplayed) : filtered
    }, [academies, searchTerm, selectedCategory, selectedLevel, maxDisplayed])

    const featuredAcademies = academies.filter(academy => academy.featured)

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

            <div className="space-y-8">
              {/* Featured Academy */}
              {featuredAcademies[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <AcademyCard
                    academy={featuredAcademies[0]}
                    variant="featured"
                    onLearnMore={() => onAcademyClick?.(featuredAcademies[0])}
                    onEnroll={() => onEnrollClick?.(featuredAcademies[0])}
                  />
                </motion.div>
              )}

              {/* Other Featured Academies */}
              <GridLayout cols={2} gap="lg" responsive>
                {featuredAcademies.slice(1, 3).map((academy, index) => (
                  <motion.div
                    key={academy.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <AcademyCard
                      academy={academy}
                      variant="default"
                      onLearnMore={() => onAcademyClick?.(academy)}
                      onEnroll={() => onEnrollClick?.(academy)}
                    />
                  </motion.div>
                ))}
              </GridLayout>
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Button variant="luminor" size="lg">
                View All Academies
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </Container>
        </Section>
      )
    }

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

          {/* Filters and Search */}
          {(showFilters || showSearch || showViewToggle) && (
            <motion.div
              className="mb-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Search and View Toggle */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {showSearch && (
                  <div className="w-full md:w-auto md:min-w-[300px]">
                    <SearchInput
                      placeholder="Search academies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onClear={() => setSearchTerm("")}
                      variant="cosmic"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  {showViewToggle && (
                    <div className="flex items-center space-x-2 bg-arcanean-cosmic/30 rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "cosmic" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "cosmic" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="text-sm text-muted-foreground">
                    {filteredAcademies.length} academies
                  </div>
                </div>
              </div>

              {/* Category and Level Filters */}
              {showFilters && (
                <div className="space-y-4">
                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "cosmic" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Levels */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Skill Level</h3>
                    <div className="flex flex-wrap gap-2">
                      {levels.map((level) => (
                        <Button
                          key={level.id}
                          variant={selectedLevel === level.id ? "cosmic" : "outline"}
                          size="sm"
                          onClick={() => setSelectedLevel(level.id)}
                        >
                          {level.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Academies Grid/List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {filteredAcademies.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold mb-2">No academies found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className={cn(
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              )}>
                {filteredAcademies.map((academy, index) => (
                  <motion.div
                    key={academy.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <AcademyCard
                      academy={academy}
                      variant={variant === "compact" || viewMode === "list" ? "compact" : "default"}
                      onLearnMore={() => onAcademyClick?.(academy)}
                      onEnroll={() => onEnrollClick?.(academy)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Show More Button */}
          {maxDisplayed && academies.length > maxDisplayed && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button variant="outline" size="lg">
                View All {academies.length} Academies
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </Container>
      </Section>
    )
  }
)

AcademiesSection.displayName = "AcademiesSection"

export { AcademiesSection, type Academy }