"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Star, Users, Clock, Award, ArrowRight } from "lucide-react"
import { cn } from "../ui/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

interface AcademyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  academy: {
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
  }
  variant?: "default" | "featured" | "compact"
  onEnroll?: () => void
  onLearnMore?: () => void
  enrolled?: boolean
}

const categoryConfig = {
  visual: {
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: "🎨",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  narrative: {
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    icon: "📚",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  music: {
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    icon: "🎵",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  video: {
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    icon: "🎬",
    gradient: "from-red-500/20 to-orange-500/20"
  },
  code: {
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    icon: "💻",
    gradient: "from-yellow-500/20 to-amber-500/20"
  },
  synthesis: {
    color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    icon: "⚡",
    gradient: "from-indigo-500/20 to-purple-500/20"
  }
}

const AcademyCard = React.forwardRef<HTMLDivElement, AcademyCardProps>(
  ({ className, academy, variant = "default", onEnroll, onLearnMore, enrolled = false, ...props }, ref) => {
    const config = categoryConfig[academy.category]
    
    if (variant === "compact") {
      return (
        <motion.div
          ref={ref}
          className={cn("group cursor-pointer", className)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          {...props}
        >
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-arcanean-luminous/10">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center text-lg",
                  config.color
                )}>
                  {academy.icon || config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{academy.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{academy.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" size="sm">
                      {academy.level}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{academy.duration}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )
    }

    return (
      <motion.div
        ref={ref}
        className={cn("group", className)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <Card className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-arcanean-luminous/20",
          variant === "featured" && "border-arcanean-luminous/50 bg-gradient-to-br from-arcanean-cosmic/20 to-arcanean-deep/20"
        )}>
          {/* Header Image/Icon */}
          <div className={cn(
            "relative h-48 bg-gradient-to-br",
            config.gradient
          )}>
            {academy.image ? (
              <img 
                src={academy.image} 
                alt={academy.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-6xl opacity-50">
                  {academy.icon || config.icon}
                </div>
              </div>
            )}
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge className={config.color} size="sm">
                {config.icon} {academy.category}
              </Badge>
            </div>

            {/* Level Badge */}
            <div className="absolute top-4 right-4">
              <Badge variant="cosmic" size="sm">
                {academy.level}
              </Badge>
            </div>

            {/* Enrolled Badge */}
            {enrolled && (
              <div className="absolute bottom-4 left-4">
                <Badge variant="success" size="sm">
                  <Award className="w-3 h-3 mr-1" />
                  Enrolled
                </Badge>
              </div>
            )}
          </div>

          <CardHeader>
            <CardTitle className="text-xl group-hover:text-arcanean-luminous transition-colors">
              {academy.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {academy.description}
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Stats */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{academy.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{academy.duration}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{academy.rating}</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Key Features:</h4>
              <div className="flex flex-wrap gap-1">
                {academy.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" size="sm">
                    {feature}
                  </Badge>
                ))}
                {academy.features.length > 3 && (
                  <Badge variant="outline" size="sm">
                    +{academy.features.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Instructor */}
            {academy.instructor && (
              <div className="flex items-center space-x-3 pt-2 border-t">
                <div className="w-8 h-8 rounded-full bg-arcanean-cosmic/30 flex items-center justify-center">
                  {academy.instructor.avatar ? (
                    <img 
                      src={academy.instructor.avatar} 
                      alt={academy.instructor.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-medium">
                      {academy.instructor.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{academy.instructor.name}</p>
                  <p className="text-xs text-muted-foreground">{academy.instructor.title}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2 pt-2">
              {enrolled ? (
                <Button 
                  variant="luminor" 
                  size="sm" 
                  className="flex-1"
                  onClick={onLearnMore}
                >
                  Continue Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={onLearnMore}
                  >
                    Learn More
                  </Button>
                  <Button 
                    variant="luminor" 
                    size="sm" 
                    className="flex-1"
                    onClick={onEnroll}
                  >
                    {academy.price ? `$${academy.price}` : "Enroll Now"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }
)

AcademyCard.displayName = "AcademyCard"

export { AcademyCard }