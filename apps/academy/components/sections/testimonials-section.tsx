"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Star, Quote, ArrowLeft, ArrowRight, Play, CheckCircle } from "lucide-react"
import { cn } from "../ui/utils"
import { Section, Container, Grid } from "../ui/layout"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"

interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  avatar?: string
  content: string
  rating: number
  verified?: boolean
  featured?: boolean
  videoUrl?: string
  academy?: string
  skillsGained?: string[]
  beforeAfter?: {
    before: string
    after: string
  }
  results?: {
    metric: string
    value: string
  }[]
}

interface TestimonialsSectionProps extends React.HTMLAttributes<HTMLElement> {
  testimonials?: Testimonial[]
  title?: string
  subtitle?: string
  variant?: "grid" | "carousel" | "featured" | "video" | "detailed"
  showRatings?: boolean
  showFilters?: boolean
  autoPlay?: boolean
  onTestimonialClick?: (testimonial: Testimonial) => void
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "UX Designer",
    company: "Google",
    content: "Arcanea Academy completely transformed my creative process. The AI mentors provided insights I never would have discovered on my own, and the cross-disciplinary approach opened up entirely new possibilities in my design work.",
    rating: 5,
    verified: true,
    featured: true,
    academy: "Visual Arts Academy",
    skillsGained: ["Design Thinking", "3D Modeling", "Creative Coding"],
    results: [
      { metric: "Portfolio Projects", value: "12 new pieces" },
      { metric: "Skill Improvement", value: "300% faster workflow" }
    ]
  },
  {
    id: "marcus-rodriguez",
    name: "Marcus Rodriguez",
    role: "Film Director",
    company: "Independent",
    content: "The video production tools and Kinetix's guidance helped me create my first feature film. The collaborative environment and real-time feedback were game-changers for my creative development.",
    rating: 5,
    verified: true,
    featured: true,
    academy: "Video Creation Academy",
    videoUrl: "https://example.com/testimonial-video.mp4",
    skillsGained: ["Cinematography", "Color Grading", "Story Structure"],
    results: [
      { metric: "Film Festivals", value: "8 accepted submissions" },
      { metric: "Skills Mastered", value: "Advanced level in 6 months" }
    ]
  },
  {
    id: "elena-novak",
    name: "Elena Novak",
    role: "Music Producer",
    company: "Warner Music",
    content: "Harmonix became my creative partner. The AI's understanding of music theory combined with innovative production techniques helped me develop a signature sound that's been featured in major releases.",
    rating: 5,
    verified: true,
    academy: "Music Production Academy",
    skillsGained: ["Advanced Production", "Sound Design", "Genre Fusion"],
    beforeAfter: {
      before: "Struggling with basic beats",
      after: "Producing chart-topping tracks"
    }
  },
  {
    id: "james-kim",
    name: "James Kim",
    role: "Creative Developer",
    company: "Adobe",
    content: "The creative coding environment at Arcanea is unmatched. Syntaxa helped me bridge the gap between programming and art, leading to interactive installations that have been showcased internationally.",
    rating: 5,
    verified: true,
    academy: "Creative Coding Academy",
    skillsGained: ["Generative Art", "Interactive Design", "Creative AI"],
    results: [
      { metric: "Installations Created", value: "15 interactive pieces" },
      { metric: "Exhibition Invites", value: "Global recognition" }
    ]
  },
  {
    id: "maya-patel",
    name: "Maya Patel",
    role: "Narrative Designer",
    company: "Netflix",
    content: "Scripta's storytelling guidance helped me craft narratives that resonate globally. The platform's collaborative tools made it easy to work with international teams on complex story structures.",
    rating: 5,
    verified: true,
    academy: "Narrative Craft Academy",
    skillsGained: ["Character Development", "World Building", "Interactive Storytelling"]
  },
  {
    id: "alex-thompson",
    name: "Alex Thompson",
    role: "Digital Artist",
    company: "Freelance",
    content: "From complete beginner to professional artist in 8 months. The personalized learning path and Lumina's mentorship made complex concepts accessible and enjoyable to learn.",
    rating: 5,
    verified: true,
    academy: "Visual Arts Academy",
    beforeAfter: {
      before: "No artistic background",
      after: "Professional commissions"
    }
  }
]

const TestimonialsSection = React.forwardRef<HTMLElement, TestimonialsSectionProps>(
  ({ 
    className, 
    testimonials = defaultTestimonials,
    title = "Creators Love Arcanea Academy",
    subtitle = "Join thousands of creators who have transformed their artistic journey with AI-powered mentorship and cutting-edge tools.",
    variant = "grid",
    showRatings = true,
    showFilters = false,
    autoPlay = false,
    onTestimonialClick,
    ...props 
  }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [selectedAcademy, setSelectedAcademy] = React.useState<string>("all")
    
    const academies = Array.from(new Set(testimonials.map(t => t.academy).filter(Boolean)))
    const filteredTestimonials = selectedAcademy === "all" 
      ? testimonials 
      : testimonials.filter(t => t.academy === selectedAcademy)
    
    const featuredTestimonials = testimonials.filter(t => t.featured)

    // Auto-play carousel
    React.useEffect(() => {
      if (autoPlay && variant === "carousel") {
        const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
        }, 5000)
        return () => clearInterval(interval)
      }
    }, [autoPlay, variant, filteredTestimonials.length])

    const nextTestimonial = () => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
    }

    const prevTestimonial = () => {
      setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length)
    }

    const renderStars = (rating: number) => {
      return (
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4",
                i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
              )}
            />
          ))}
        </div>
      )
    }

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

            {/* Featured Testimonial */}
            {featuredTestimonials[0] && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-arcanean-luminous/30 bg-gradient-to-br from-arcanean-cosmic/20 to-arcanean-deep/20">
                  <CardContent className="p-8 md:p-12">
                    <div className="text-center max-w-4xl mx-auto">
                      <Quote className="w-12 h-12 text-arcanean-luminous mx-auto mb-6 opacity-50" />
                      <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                        "{featuredTestimonials[0].content}"
                      </blockquote>
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                          {featuredTestimonials[0].avatar ? (
                            <img 
                              src={featuredTestimonials[0].avatar} 
                              alt={featuredTestimonials[0].name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-lg font-medium">
                              {featuredTestimonials[0].name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center space-x-2">
                            <p className="font-semibold text-lg">{featuredTestimonials[0].name}</p>
                            {featuredTestimonials[0].verified && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                          </div>
                          <p className="text-muted-foreground">
                            {featuredTestimonials[0].role}
                            {featuredTestimonials[0].company && ` at ${featuredTestimonials[0].company}`}
                          </p>
                          {showRatings && (
                            <div className="mt-2">
                              {renderStars(featuredTestimonials[0].rating)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Other Featured Testimonials */}
            <Grid cols={2} gap="lg" responsive>
              {featuredTestimonials.slice(1, 3).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-arcanean-luminous/10">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <Quote className="w-8 h-8 text-arcanean-luminous mb-4 opacity-50" />
                        <blockquote className="text-sm leading-relaxed mb-4 flex-1">
                          "{testimonial.content}"
                        </blockquote>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            {testimonial.avatar ? (
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-sm font-medium">
                                {testimonial.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-1">
                              <p className="font-semibold text-sm">{testimonial.name}</p>
                              {testimonial.verified && (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {testimonial.role}
                              {testimonial.company && ` at ${testimonial.company}`}
                            </p>
                            {showRatings && (
                              <div className="mt-1">
                                {renderStars(testimonial.rating)}
                              </div>
                            )}
                          </div>
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

    if (variant === "carousel") {
      const currentTestimonial = filteredTestimonials[currentIndex]
      
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

            <motion.div
              className="relative max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center">
                    <Quote className="w-12 h-12 text-arcanean-luminous mx-auto mb-6 opacity-50" />
                    <motion.blockquote
                      key={currentTestimonial.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="text-lg md:text-xl leading-relaxed mb-8"
                    >
                      "{currentTestimonial.content}"
                    </motion.blockquote>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                        {currentTestimonial.avatar ? (
                          <img 
                            src={currentTestimonial.avatar} 
                            alt={currentTestimonial.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="font-medium">
                            {currentTestimonial.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold">{currentTestimonial.name}</p>
                          {currentTestimonial.verified && (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {currentTestimonial.role}
                          {currentTestimonial.company && ` at ${currentTestimonial.company}`}
                        </p>
                        {showRatings && (
                          <div className="mt-2">
                            {renderStars(currentTestimonial.rating)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  disabled={filteredTestimonials.length <= 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="flex space-x-2">
                  {filteredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        index === currentIndex 
                          ? "bg-arcanean-luminous" 
                          : "bg-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  disabled={filteredTestimonials.length <= 1}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </Container>
        </Section>
      )
    }

    if (variant === "detailed") {
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

            {/* Academy Filters */}
            {showFilters && academies.length > 0 && (
              <motion.div
                className="flex flex-wrap justify-center gap-2 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Button
                  variant={selectedAcademy === "all" ? "cosmic" : "outline"}
                  size="sm"
                  onClick={() => setSelectedAcademy("all")}
                >
                  All Academies
                </Button>
                {academies.map((academy) => (
                  <Button
                    key={academy}
                    variant={selectedAcademy === academy ? "cosmic" : "outline"}
                    size="sm"
                    onClick={() => setSelectedAcademy(academy)}
                  >
                    {academy}
                  </Button>
                ))}
              </motion.div>
            )}

            <div className="space-y-8">
              {filteredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className={cn(
                      "transition-all duration-300 hover:shadow-lg hover:shadow-arcanean-luminous/10",
                      onTestimonialClick && "cursor-pointer"
                    )}
                    onClick={() => onTestimonialClick?.(testimonial)}
                  >
                    <CardContent className="p-6 md:p-8">
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Main Testimonial */}
                        <div className="md:col-span-2">
                          <Quote className="w-8 h-8 text-arcanean-luminous mb-4 opacity-50" />
                          <blockquote className="text-lg leading-relaxed mb-6">
                            "{testimonial.content}"
                          </blockquote>
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                              {testimonial.avatar ? (
                                <img 
                                  src={testimonial.avatar} 
                                  alt={testimonial.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <span className="font-medium">
                                  {testimonial.name.charAt(0)}
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-semibold">{testimonial.name}</p>
                                {testimonial.verified && (
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {testimonial.role}
                                {testimonial.company && ` at ${testimonial.company}`}
                              </p>
                              {showRatings && (
                                <div className="mt-1">
                                  {renderStars(testimonial.rating)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-4">
                          {testimonial.academy && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Academy</h4>
                              <Badge variant="cosmic" size="sm">
                                {testimonial.academy}
                              </Badge>
                            </div>
                          )}

                          {testimonial.skillsGained && testimonial.skillsGained.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Skills Gained</h4>
                              <div className="flex flex-wrap gap-1">
                                {testimonial.skillsGained.map((skill, i) => (
                                  <Badge key={i} variant="outline" size="sm">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {testimonial.results && testimonial.results.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Results</h4>
                              <div className="space-y-2">
                                {testimonial.results.map((result, i) => (
                                  <div key={i} className="text-sm">
                                    <div className="font-medium text-arcanean-luminous">
                                      {result.value}
                                    </div>
                                    <div className="text-muted-foreground text-xs">
                                      {result.metric}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {testimonial.beforeAfter && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Transformation</h4>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <div className="text-xs text-muted-foreground">Before</div>
                                  <div>{testimonial.beforeAfter.before}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-muted-foreground">After</div>
                                  <div className="text-arcanean-luminous font-medium">
                                    {testimonial.beforeAfter.after}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {testimonial.videoUrl && (
                            <Button variant="outline" size="sm" className="w-full">
                              <Play className="w-4 h-4 mr-2" />
                              Watch Video
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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

          <Grid cols={3} gap="lg" responsive>
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className={cn(
                    "h-full transition-all duration-300 hover:shadow-lg hover:shadow-arcanean-luminous/10",
                    onTestimonialClick && "cursor-pointer"
                  )}
                  onClick={() => onTestimonialClick?.(testimonial)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full">
                      <Quote className="w-8 h-8 text-arcanean-luminous mb-4 opacity-50" />
                      <blockquote className="text-sm leading-relaxed mb-4 flex-1">
                        "{testimonial.content}"
                      </blockquote>
                      
                      <div className="border-t pt-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            {testimonial.avatar ? (
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-sm font-medium">
                                {testimonial.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-1">
                              <p className="font-semibold text-sm">{testimonial.name}</p>
                              {testimonial.verified && (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {testimonial.role}
                              {testimonial.company && ` at ${testimonial.company}`}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          {showRatings && renderStars(testimonial.rating)}
                          {testimonial.academy && (
                            <Badge variant="outline" size="sm">
                              {testimonial.academy}
                            </Badge>
                          )}
                        </div>
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
)

TestimonialsSection.displayName = "TestimonialsSection"

export { TestimonialsSection, type Testimonial }