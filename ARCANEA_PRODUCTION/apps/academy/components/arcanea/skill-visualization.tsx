"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Trophy, Target, TrendingUp, Star, Award, ChevronRight } from "lucide-react"
import { cn } from "../ui/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Progress, CircularProgress, SkillProgress } from "../ui/progress"

interface SkillData {
  id: string
  name: string
  category: "visual" | "narrative" | "music" | "video" | "code" | "synthesis"
  level: "beginner" | "intermediate" | "advanced" | "master"
  progress: number
  xp: number
  nextLevelXp: number
  rank?: number
  totalUsers?: number
  achievements?: string[]
  recentActivity?: {
    date: Date
    type: "lesson" | "project" | "achievement"
    description: string
  }[]
}

interface SkillVisualizationProps extends React.HTMLAttributes<HTMLDivElement> {
  skills: SkillData[]
  variant?: "overview" | "detailed" | "compact" | "radar"
  showProgress?: boolean
  showRanking?: boolean
  showAchievements?: boolean
  onSkillClick?: (skill: SkillData) => void
  animated?: boolean
}

const categoryConfig = {
  visual: {
    color: "text-purple-400",
    bg: "bg-purple-500/20",
    border: "border-purple-500/30",
    icon: "🎨"
  },
  narrative: {
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    border: "border-blue-500/30",
    icon: "📚"
  },
  music: {
    color: "text-green-400",
    bg: "bg-green-500/20",
    border: "border-green-500/30",
    icon: "🎵"
  },
  video: {
    color: "text-red-400",
    bg: "bg-red-500/20",
    border: "border-red-500/30",
    icon: "🎬"
  },
  code: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/20",
    border: "border-yellow-500/30",
    icon: "💻"
  },
  synthesis: {
    color: "text-indigo-400",
    bg: "bg-indigo-500/20",
    border: "border-indigo-500/30",
    icon: "⚡"
  }
}

const levelConfig = {
  beginner: { color: "text-green-400", bg: "bg-green-500/20", threshold: 0 },
  intermediate: { color: "text-yellow-400", bg: "bg-yellow-500/20", threshold: 25 },
  advanced: { color: "text-orange-400", bg: "bg-orange-500/20", threshold: 50 },
  master: { color: "text-purple-400", bg: "bg-purple-500/20", threshold: 75 }
}

const SkillVisualization = React.forwardRef<HTMLDivElement, SkillVisualizationProps>(
  ({ 
    className, 
    skills, 
    variant = "overview", 
    showProgress = true, 
    showRanking = true,
    showAchievements = true,
    onSkillClick,
    animated = true,
    ...props 
  }, ref) => {
    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}
          {...props}
        >
          {skills.map((skill, index) => {
            const config = categoryConfig[skill.category]
            const levelConf = levelConfig[skill.level]
            
            return (
              <motion.div
                key={skill.id}
                initial={animated ? { opacity: 0, y: 20 } : false}
                animate={animated ? { opacity: 1, y: 0 } : false}
                transition={animated ? { duration: 0.3, delay: index * 0.1 } : false}
                className="group cursor-pointer"
                onClick={() => onSkillClick?.(skill)}
              >
                <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-arcanean-luminous/10">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-lg",
                        config.bg,
                        config.border,
                        "border"
                      )}>
                        {config.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate group-hover:text-arcanean-luminous transition-colors">
                          {skill.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" size="sm" className={levelConf.color}>
                            {skill.level}
                          </Badge>
                          {showRanking && skill.rank && (
                            <span className="text-xs text-muted-foreground">
                              #{skill.rank}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {showProgress && (
                      <div className="mt-3">
                        <Progress value={skill.progress} variant="cosmic" size="sm" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )
    }

    if (variant === "radar") {
      // Simplified radar chart representation
      const maxSkills = 6
      const displaySkills = skills.slice(0, maxSkills)
      
      return (
        <div ref={ref} className={cn("", className)} {...props}>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-center">Skill Radar</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative w-64 h-64 mx-auto">
                {/* Radar Grid */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute border border-arcanean-aurora/20 rounded-full"
                      style={{
                        width: `${(i + 1) * 20}%`,
                        height: `${(i + 1) * 20}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Skill Points */}
                {displaySkills.map((skill, index) => {
                  const angle = (index * 360) / displaySkills.length
                  const radius = (skill.progress / 100) * 120
                  const x = Math.cos((angle - 90) * Math.PI / 180) * radius
                  const y = Math.sin((angle - 90) * Math.PI / 180) * radius
                  const config = categoryConfig[skill.category]
                  
                  return (
                    <div
                      key={skill.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full",
                        config.bg,
                        config.border,
                        "border-2"
                      )} />
                    </div>
                  )
                })}

                {/* Skill Labels */}
                {displaySkills.map((skill, index) => {
                  const angle = (index * 360) / displaySkills.length
                  const radius = 140
                  const x = Math.cos((angle - 90) * Math.PI / 180) * radius
                  const y = Math.sin((angle - 90) * Math.PI / 180) * radius
                  
                  return (
                    <div
                      key={`label-${skill.id}`}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                    >
                      <div className="text-xs text-center font-medium">
                        {skill.name}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (variant === "detailed") {
      return (
        <div ref={ref} className={cn("space-y-6", className)} {...props}>
          {skills.map((skill, index) => {
            const config = categoryConfig[skill.category]
            const levelConf = levelConfig[skill.level]
            
            return (
              <motion.div
                key={skill.id}
                initial={animated ? { opacity: 0, x: -20 } : false}
                animate={animated ? { opacity: 1, x: 0 } : false}
                transition={animated ? { duration: 0.3, delay: index * 0.1 } : false}
                className="group cursor-pointer"
                onClick={() => onSkillClick?.(skill)}
              >
                <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-arcanean-luminous/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center text-xl",
                          config.bg,
                          config.border,
                          "border"
                        )}>
                          {config.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-arcanean-luminous transition-colors">
                            {skill.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground capitalize">
                            {skill.category} • {skill.level}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: config.color }}>
                          {skill.progress}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {skill.xp.toLocaleString()} XP
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress */}
                    {showProgress && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress to next level</span>
                          <span className="text-muted-foreground">
                            {skill.xp.toLocaleString()} / {skill.nextLevelXp.toLocaleString()} XP
                          </span>
                        </div>
                        <Progress 
                          value={(skill.xp / skill.nextLevelXp) * 100} 
                          variant="cosmic" 
                          animated={animated}
                        />
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold">
                          {skill.level}
                        </div>
                        <div className="text-xs text-muted-foreground">Level</div>
                      </div>
                      {showRanking && skill.rank && (
                        <div>
                          <div className="text-lg font-semibold">
                            #{skill.rank}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            of {skill.totalUsers?.toLocaleString()}
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="text-lg font-semibold">
                          {skill.achievements?.length || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">Achievements</div>
                      </div>
                    </div>

                    {/* Achievements */}
                    {showAchievements && skill.achievements && skill.achievements.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Recent Achievements</h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.achievements.slice(0, 3).map((achievement, i) => (
                            <Badge key={i} variant="cosmic" size="sm">
                              <Award className="w-3 h-3 mr-1" />
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Activity */}
                    {skill.recentActivity && skill.recentActivity.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Recent Activity</h4>
                        <div className="space-y-1">
                          {skill.recentActivity.slice(0, 2).map((activity, i) => (
                            <div key={i} className="flex items-center space-x-2 text-sm">
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                activity.type === "achievement" && "bg-yellow-400",
                                activity.type === "project" && "bg-green-400",
                                activity.type === "lesson" && "bg-blue-400"
                              )} />
                              <span className="text-muted-foreground flex-1">
                                {activity.description}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {activity.date.toLocaleDateString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action */}
                    <div className="flex justify-end pt-2">
                      <Button variant="outline" size="sm" className="group">
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )
    }

    // Default overview variant
    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-arcanean-luminous">
                {skills.length}
              </div>
              <div className="text-sm text-muted-foreground">Skills</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-arcanean-luminous">
                {Math.round(skills.reduce((acc, skill) => acc + skill.progress, 0) / skills.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Progress</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-arcanean-luminous">
                {skills.filter(s => s.level === "master").length}
              </div>
              <div className="text-sm text-muted-foreground">Mastered</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-arcanean-luminous">
                {skills.reduce((acc, skill) => acc + skill.xp, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => {
            const config = categoryConfig[skill.category]
            const levelConf = levelConfig[skill.level]
            
            return (
              <motion.div
                key={skill.id}
                initial={animated ? { opacity: 0, y: 20 } : false}
                animate={animated ? { opacity: 1, y: 0 } : false}
                transition={animated ? { duration: 0.3, delay: index * 0.1 } : false}
                className="group cursor-pointer"
                onClick={() => onSkillClick?.(skill)}
              >
                <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-arcanean-luminous/10">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <CircularProgress 
                          value={skill.progress} 
                          size={60} 
                          variant="cosmic"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate group-hover:text-arcanean-luminous transition-colors">
                          {skill.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" size="sm" className={levelConf.color}>
                            {skill.level}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {skill.xp.toLocaleString()} XP
                          </span>
                        </div>
                        {showRanking && skill.rank && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Rank #{skill.rank} of {skill.totalUsers?.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }
)

SkillVisualization.displayName = "SkillVisualization"

export { SkillVisualization, type SkillData }