"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Heart, Share2, Eye, Download, Play, Star, Calendar, User, Tag } from "lucide-react"
import { cn } from "../ui/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

interface ProjectShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  project: {
    id: string
    title: string
    description: string
    category: "visual" | "narrative" | "music" | "video" | "code" | "synthesis"
    thumbnail?: string
    media?: {
      type: "image" | "video" | "audio" | "code"
      url: string
      duration?: number
    }
    author: {
      name: string
      avatar?: string
      username: string
      verified?: boolean
    }
    academy?: string
    luminor?: string
    stats: {
      views: number
      likes: number
      shares: number
      downloads?: number
      rating?: number
      ratingCount?: number
    }
    tags: string[]
    createdAt: Date
    featured?: boolean
    status: "draft" | "published" | "archived"
    difficulty: "beginner" | "intermediate" | "advanced"
  }
  variant?: "card" | "grid" | "list" | "featured"
  onView?: () => void
  onLike?: () => void
  onShare?: () => void
  onDownload?: () => void
  onAuthorClick?: () => void
  liked?: boolean
  showActions?: boolean
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

const ProjectShowcase = React.forwardRef<HTMLDivElement, ProjectShowcaseProps>(
  ({ 
    className, 
    project, 
    variant = "card", 
    onView, 
    onLike, 
    onShare, 
    onDownload, 
    onAuthorClick,
    liked = false,
    showActions = true,
    ...props 
  }, ref) => {
    const config = categoryConfig[project.category]
    
    if (variant === "list") {
      return (
        <motion.div
          ref={ref}
          className={cn("group cursor-pointer", className)}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          onClick={onView}
          {...props}
        >
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {project.thumbnail ? (
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={cn(
                      "w-full h-full flex items-center justify-center text-2xl",
                      config.color
                    )}>
                      {config.icon}
                    </div>
                  )}
                  {project.media?.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm truncate group-hover:text-arcanean-luminous transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {project.description}
                      </p>
                    </div>
                    <Badge className={config.color} size="sm">
                      {config.icon}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{project.stats.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{project.stats.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{project.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onAuthorClick?.()
                      }}
                      className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <User className="w-3 h-3" />
                      <span>{project.author.username}</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )
    }

    if (variant === "grid") {
      return (
        <motion.div
          ref={ref}
          className={cn("group cursor-pointer", className)}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
          onClick={onView}
          {...props}
        >
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-arcanean-luminous/10">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-muted">
              {project.thumbnail ? (
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={cn(
                  "w-full h-full flex items-center justify-center text-4xl",
                  config.color
                )}>
                  {config.icon}
                </div>
              )}
              
              {/* Play Button for Videos */}
              {project.media?.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <Badge className={config.color} size="sm">
                  {config.icon}
                </Badge>
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-2 right-2">
                  <Badge variant="luminor" size="sm">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-arcanean-luminous transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {project.description}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    {project.author.avatar ? (
                      <img 
                        src={project.author.avatar} 
                        alt={project.author.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xs">{project.author.name.charAt(0)}</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground truncate">
                    {project.author.username}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{project.stats.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{project.stats.likes.toLocaleString()}</span>
                    </div>
                  </div>
                  <span>{project.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )
    }

    if (variant === "featured") {
      return (
        <motion.div
          ref={ref}
          className={cn("group", className)}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          {...props}
        >
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-arcanean-luminous/20 border-arcanean-luminous/30">
            {/* Large Thumbnail */}
            <div className="relative aspect-[16/9] bg-muted">
              {project.thumbnail ? (
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={cn(
                  "w-full h-full flex items-center justify-center text-6xl",
                  config.color
                )}>
                  {config.icon}
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Badge className={config.color} size="lg">
                  {config.icon} {project.category}
                </Badge>
              </div>

              {/* Featured Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant="luminor" size="lg">
                  <Star className="w-4 h-4 mr-1" />
                  Featured
                </Badge>
              </div>

              {/* Play Button */}
              {project.media?.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onView}
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </motion.div>
                </div>
              )}
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <CardTitle className="text-xl group-hover:text-arcanean-luminous transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {project.author.avatar ? (
                      <img 
                        src={project.author.avatar} 
                        alt={project.author.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium">{project.author.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{project.author.name}</p>
                    <p className="text-xs text-muted-foreground">@{project.author.username}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag, index) => (
                    <Badge key={index} variant="outline" size="sm">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 4 && (
                    <Badge variant="outline" size="sm">
                      +{project.tags.length - 4} more
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{project.stats.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{project.stats.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="w-4 h-4" />
                      <span>{project.stats.shares.toLocaleString()}</span>
                    </div>
                  </div>
                  {project.stats.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{project.stats.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({project.stats.ratingCount})
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {showActions && (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={onView}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant={liked ? "cosmic" : "outline"}
                      size="sm"
                      onClick={onLike}
                    >
                      <Heart className={cn("w-4 h-4", liked && "fill-current")} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={onShare}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    {project.stats.downloads && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={onDownload}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )
    }

    // Default card variant
    return (
      <motion.div
        ref={ref}
        className={cn("group cursor-pointer", className)}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3 }}
        onClick={onView}
        {...props}
      >
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-arcanean-luminous/10">
          {/* Thumbnail */}
          <div className="relative aspect-video bg-muted">
            {project.thumbnail ? (
              <img 
                src={project.thumbnail} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={cn(
                "w-full h-full flex items-center justify-center text-4xl",
                config.color
              )}>
                {config.icon}
              </div>
            )}
            
            {/* Play Button */}
            {project.media?.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute top-2 left-2">
              <Badge className={config.color} size="sm">
                {config.icon}
              </Badge>
            </div>

            {/* Difficulty Badge */}
            <div className="absolute top-2 right-2">
              <Badge variant="outline" size="sm">
                {project.difficulty}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-arcanean-luminous transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {project.description}
                </p>
              </div>

              {/* Author and Date */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onAuthorClick?.()
                  }}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <User className="w-3 h-3" />
                  <span>{project.author.username}</span>
                </button>
                <span>{project.createdAt.toLocaleDateString()}</span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{project.stats.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{project.stats.likes.toLocaleString()}</span>
                  </div>
                </div>
                {project.stats.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{project.stats.rating}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              {showActions && (
                <div className="flex space-x-1">
                  <Button 
                    variant={liked ? "cosmic" : "outline"}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onLike?.()
                    }}
                  >
                    <Heart className={cn("w-4 h-4", liked && "fill-current")} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onShare?.()
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  {project.stats.downloads && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDownload?.()
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }
)

ProjectShowcase.displayName = "ProjectShowcase"

export { ProjectShowcase }