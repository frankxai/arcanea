"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Sparkles, Brain, Zap, User, Settings, X } from "lucide-react"
import { cn, type LuminorType } from "../ui/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { ScrollArea } from "@radix-ui/react-scroll-area"

interface LuminorPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  luminor: {
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
  }
  variant?: "card" | "panel" | "compact" | "interactive"
  onInteract?: () => void
  onViewProfile?: () => void
  onSettings?: () => void
  interactive?: boolean
}

const luminorConfig = {
  harmonix: {
    color: "#ff6b6b",
    gradient: "from-red-400 to-pink-400",
    bgGradient: "from-red-500/20 to-pink-500/20",
    icon: "🎵",
    specialty: "Music & Audio"
  },
  scripta: {
    color: "#4ecdc4",
    gradient: "from-teal-400 to-cyan-400",
    bgGradient: "from-teal-500/20 to-cyan-500/20",
    icon: "📝",
    specialty: "Writing & Literature"
  },
  lumina: {
    color: "#45b7d1",
    gradient: "from-blue-400 to-cyan-400",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    icon: "💡",
    specialty: "Visual Arts"
  },
  kinetix: {
    color: "#96ceb4",
    gradient: "from-green-400 to-emerald-400",
    bgGradient: "from-green-500/20 to-emerald-500/20",
    icon: "🎬",
    specialty: "Video & Animation"
  },
  syntaxa: {
    color: "#feca57",
    gradient: "from-yellow-400 to-orange-400",
    bgGradient: "from-yellow-500/20 to-orange-500/20",
    icon: "💻",
    specialty: "Code & Development"
  },
  nexus: {
    color: "#ff9ff3",
    gradient: "from-purple-400 to-pink-400",
    bgGradient: "from-purple-500/20 to-pink-500/20",
    icon: "🔮",
    specialty: "AI Integration"
  }
}

const LuminorPanel = React.forwardRef<HTMLDivElement, LuminorPanelProps>(
  ({ className, luminor, variant = "card", onInteract, onViewProfile, onSettings, interactive = false, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [showChat, setShowChat] = React.useState(false)
    const config = luminorConfig[luminor.type]

    if (variant === "compact") {
      return (
        <motion.div
          ref={ref}
          className={cn("group cursor-pointer", className)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          onClick={onInteract}
          {...props}
        >
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-lg relative",
                  `bg-gradient-to-br ${config.bgGradient}`
                )}>
                  {luminor.avatar ? (
                    <img 
                      src={luminor.avatar} 
                      alt={luminor.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg">{config.icon}</span>
                  )}
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                    luminor.status === "online" && "bg-green-500",
                    luminor.status === "busy" && "bg-red-500",
                    luminor.status === "away" && "bg-yellow-500",
                    luminor.status === "offline" && "bg-gray-500"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{luminor.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{config.specialty}</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" size="sm">
                      {luminor.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )
    }

    if (variant === "interactive") {
      return (
        <motion.div
          ref={ref}
          className={cn("relative", className)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          {...props}
        >
          <Card className={cn(
            "overflow-hidden transition-all duration-300",
            `bg-gradient-to-br ${config.bgGradient} border-2`,
            showChat && "shadow-xl shadow-arcanean-luminous/20"
          )}
          style={{ borderColor: config.color }}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center text-2xl",
                      `bg-gradient-to-br ${config.gradient}`
                    )}>
                      {luminor.avatar ? (
                        <img 
                          src={luminor.avatar} 
                          alt={luminor.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white">{config.icon}</span>
                      )}
                    </div>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background",
                      luminor.status === "online" && "bg-green-500",
                      luminor.status === "busy" && "bg-red-500 animate-pulse",
                      luminor.status === "away" && "bg-yellow-500",
                      luminor.status === "offline" && "bg-gray-500"
                    )} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{luminor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{config.specialty}</p>
                    <Badge 
                      variant="outline" 
                      size="sm"
                      className="mt-1"
                    >
                      {luminor.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onSettings}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowChat(!showChat)}
                  >
                    {showChat ? <X className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {luminor.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold" style={{ color: config.color }}>
                    {luminor.currentUsers || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-lg font-semibold" style={{ color: config.color }}>
                    {luminor.totalInteractions?.toLocaleString() || "0"}
                  </div>
                  <div className="text-xs text-muted-foreground">Interactions</div>
                </div>
                <div>
                  <div className="text-lg font-semibold" style={{ color: config.color }}>
                    {luminor.averageRating || "5.0"}
                  </div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <h4 className="text-sm font-medium mb-2">Capabilities:</h4>
                <div className="flex flex-wrap gap-1">
                  {luminor.capabilities.slice(0, 4).map((capability, index) => (
                    <Badge key={index} variant="outline" size="sm">
                      {capability}
                    </Badge>
                  ))}
                  {luminor.capabilities.length > 4 && (
                    <Badge variant="outline" size="sm">
                      +{luminor.capabilities.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={onViewProfile}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button 
                  variant="luminor" 
                  size="sm" 
                  className="flex-1"
                  onClick={onInteract}
                  disabled={luminor.status === "offline"}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Interact
                </Button>
              </div>
            </CardContent>

            {/* Chat Interface */}
            <AnimatePresence>
              {showChat && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t"
                >
                  <div className="p-4 space-y-3">
                    <div className="h-32 bg-arcanean-cosmic/30 rounded-lg p-3 overflow-y-auto">
                      <div className="text-xs text-muted-foreground text-center">
                        Start a conversation with {luminor.name}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder={`Message ${luminor.name}...`}
                        variant="cosmic"
                        className="flex-1"
                      />
                      <Button size="sm" variant="luminor">
                        Send
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      )
    }

    return (
      <motion.div
        ref={ref}
        className={cn("group", className)}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <Card className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-lg",
          `hover:shadow-${luminor.type}/20`
        )}>
          {/* Header */}
          <CardHeader className={cn(
            "pb-3",
            `bg-gradient-to-br ${config.bgGradient}`
          )}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center text-xl",
                    `bg-gradient-to-br ${config.gradient}`
                  )}>
                    {luminor.avatar ? (
                      <img 
                        src={luminor.avatar} 
                        alt={luminor.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white">{config.icon}</span>
                    )}
                  </div>
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                    luminor.status === "online" && "bg-green-500",
                    luminor.status === "busy" && "bg-red-500",
                    luminor.status === "away" && "bg-yellow-500",
                    luminor.status === "offline" && "bg-gray-500"
                  )} />
                </div>
                <div>
                  <CardTitle className="text-lg">{luminor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{config.specialty}</p>
                </div>
              </div>
              <Badge variant="outline" size="sm">
                {luminor.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {luminor.description}
            </p>

            {/* Quick Stats */}
            <div className="flex justify-between text-sm">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>{luminor.currentUsers || 0} active</span>
              </div>
              <div className="flex items-center space-x-1">
                <Brain className="w-4 h-4 text-muted-foreground" />
                <span>{luminor.capabilities.length} skills</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-muted-foreground" />
                <span>{luminor.averageRating || "5.0"} rating</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={onViewProfile}
              >
                View Profile
              </Button>
              <Button 
                variant="luminor" 
                size="sm" 
                className="flex-1"
                onClick={onInteract}
                disabled={luminor.status === "offline"}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }
)

LuminorPanel.displayName = "LuminorPanel"

export { LuminorPanel }