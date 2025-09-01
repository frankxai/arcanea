"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Users, 
  Crown, 
  Flame, 
  TrendingUp,
  Calendar,
  Clock,
  Star,
  Award,
  ChevronUp,
  ChevronDown,
  Reply,
  MoreHorizontal,
  Pin,
  Flag
} from "lucide-react"
import { cn } from "../ui/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

interface User {
  id: string
  username: string
  name: string
  avatar?: string
  level: number
  xp: number
  role?: "student" | "instructor" | "mentor" | "admin"
  badges?: string[]
  verified?: boolean
}

interface Post {
  id: string
  author: User
  content: string
  type: "discussion" | "showcase" | "question" | "announcement"
  category?: string
  tags?: string[]
  createdAt: Date
  updatedAt?: Date
  stats: {
    likes: number
    replies: number
    views: number
    shares?: number
  }
  isPinned?: boolean
  isLocked?: boolean
  media?: {
    type: "image" | "video" | "audio"
    url: string
    thumbnail?: string
  }[]
  replies?: Reply[]
}

interface Reply {
  id: string
  author: User
  content: string
  createdAt: Date
  stats: {
    likes: number
  }
  parentId?: string
}

interface CommunityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: Post[]
  onLike?: (postId: string) => void
  onReply?: (postId: string, content: string) => void
  onShare?: (postId: string) => void
  onUserClick?: (userId: string) => void
  variant?: "feed" | "compact" | "detailed"
  showCategories?: boolean
  currentUserId?: string
}

const CommunityFeed = React.forwardRef<HTMLDivElement, CommunityFeedProps>(
  ({ 
    className, 
    posts, 
    onLike, 
    onReply, 
    onShare, 
    onUserClick,
    variant = "feed",
    showCategories = true,
    currentUserId,
    ...props 
  }, ref) => {
    const [expandedPosts, setExpandedPosts] = React.useState<Set<string>>(new Set())
    const [replyingTo, setReplyingTo] = React.useState<string | null>(null)
    const [replyContent, setReplyContent] = React.useState("")

    const toggleExpanded = (postId: string) => {
      const newExpanded = new Set(expandedPosts)
      if (newExpanded.has(postId)) {
        newExpanded.delete(postId)
      } else {
        newExpanded.add(postId)
      }
      setExpandedPosts(newExpanded)
    }

    const handleReply = (postId: string) => {
      if (replyContent.trim()) {
        onReply?.(postId, replyContent)
        setReplyContent("")
        setReplyingTo(null)
      }
    }

    const getPostTypeConfig = (type: Post["type"]) => {
      switch (type) {
        case "discussion":
          return { icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-500/20" }
        case "showcase":
          return { icon: Star, color: "text-purple-400", bg: "bg-purple-500/20" }
        case "question":
          return { icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/20" }
        case "announcement":
          return { icon: Crown, color: "text-yellow-400", bg: "bg-yellow-500/20" }
        default:
          return { icon: MessageSquare, color: "text-gray-400", bg: "bg-gray-500/20" }
      }
    }

    if (variant === "compact") {
      return (
        <div ref={ref} className={cn("space-y-2", className)} {...props}>
          {posts.map((post) => {
            const typeConfig = getPostTypeConfig(post.type)
            
            return (
              <Card key={post.id} className="transition-all duration-300 hover:shadow-md">
                <CardContent className="p-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      {post.author.avatar ? (
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.username}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-medium">
                          {post.author.username.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <button
                          onClick={() => onUserClick?.(post.author.id)}
                          className="text-sm font-medium hover:text-arcanean-luminous transition-colors"
                        >
                          {post.author.username}
                        </button>
                        <div className={cn("w-1 h-1 rounded-full", typeConfig.bg)} />
                        <span className="text-xs text-muted-foreground">
                          {post.createdAt.toLocaleDateString()}
                        </span>
                        {post.isPinned && <Pin className="w-3 h-3 text-yellow-400" />}
                      </div>
                      <p className="text-sm line-clamp-2">{post.content}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{post.stats.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{post.stats.replies}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {posts.map((post) => {
          const typeConfig = getPostTypeConfig(post.type)
          const isExpanded = expandedPosts.has(post.id)
          
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-arcanean-luminous/10">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        {post.author.avatar ? (
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.username}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-medium">
                            {post.author.username.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUserClick?.(post.author.id)}
                            className="font-medium hover:text-arcanean-luminous transition-colors"
                          >
                            {post.author.username}
                          </button>
                          {post.author.verified && (
                            <Badge variant="cosmic" size="sm">Verified</Badge>
                          )}
                          <Badge variant="outline" size="sm" className={typeConfig.color}>
                            <typeConfig.icon className="w-3 h-3 mr-1" />
                            {post.type}
                          </Badge>
                          {post.isPinned && (
                            <Pin className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                          <span>Level {post.author.level}</span>
                          <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                          <span>{post.createdAt.toLocaleDateString()}</span>
                          {post.category && (
                            <>
                              <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                              <span>{post.category}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Content */}
                  <div>
                    <p className="text-sm leading-relaxed">
                      {post.content}
                    </p>
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" size="sm">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Media */}
                  {post.media && post.media.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {post.media.slice(0, 4).map((item, index) => (
                        <div key={index} className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                          {item.type === "image" ? (
                            <img 
                              src={item.url} 
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-2xl">
                                {item.type === "video" ? "🎬" : "🎵"}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.stats.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.stats.replies.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{post.stats.views.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onLike?.(post.id)}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        Like
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(post.id)}
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onShare?.(post.id)}
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Replies Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 pt-4 border-t"
                      >
                        {/* Reply Form */}
                        <div className="flex space-x-3">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <span className="text-xs">U</span>
                          </div>
                          <div className="flex-1 space-y-2">
                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="Write a reply..."
                              className="w-full p-3 bg-arcanean-cosmic/30 border border-arcanean-aurora/30 rounded-lg text-sm resize-none focus:outline-none focus:border-arcanean-luminous/50"
                              rows={3}
                            />
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setReplyingTo(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="luminor"
                                size="sm"
                                onClick={() => handleReply(post.id)}
                                disabled={!replyContent.trim()}
                              >
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Existing Replies */}
                        {post.replies && post.replies.map((reply) => (
                          <div key={reply.id} className="flex space-x-3">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                              {reply.author.avatar ? (
                                <img 
                                  src={reply.author.avatar} 
                                  alt={reply.author.username}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-xs font-medium">
                                  {reply.author.username.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="bg-arcanean-cosmic/20 rounded-lg p-3">
                                <div className="flex items-center space-x-2 mb-1">
                                  <button
                                    onClick={() => onUserClick?.(reply.author.id)}
                                    className="text-sm font-medium hover:text-arcanean-luminous transition-colors"
                                  >
                                    {reply.author.username}
                                  </button>
                                  <span className="text-xs text-muted-foreground">
                                    {reply.createdAt.toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm">{reply.content}</p>
                              </div>
                              <div className="flex items-center space-x-2 mt-2">
                                <Button variant="ghost" size="sm">
                                  <Heart className="w-3 h-3 mr-1" />
                                  {reply.stats.likes}
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Reply className="w-3 h-3 mr-1" />
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    )
  }
)

CommunityFeed.displayName = "CommunityFeed"

// Leaderboard Component
interface LeaderboardProps extends React.HTMLAttributes<HTMLDivElement> {
  users: Array<User & { 
    rank: number
    weeklyXp?: number
    streak?: number
  }>
  variant?: "weekly" | "overall" | "compact"
  showBadges?: boolean
  onUserClick?: (userId: string) => void
}

const Leaderboard = React.forwardRef<HTMLDivElement, LeaderboardProps>(
  ({ className, users, variant = "overall", showBadges = true, onUserClick, ...props }, ref) => {
    const getRankIcon = (rank: number) => {
      switch (rank) {
        case 1:
          return <Crown className="w-5 h-5 text-yellow-400" />
        case 2:
          return <Award className="w-5 h-5 text-gray-400" />
        case 3:
          return <Award className="w-5 h-5 text-orange-400" />
        default:
          return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
      }
    }

    if (variant === "compact") {
      return (
        <Card ref={ref} className={cn("", className)} {...props}>
          <CardHeader>
            <CardTitle className="text-lg">Top Contributors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {users.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => onUserClick?.(user.id)}
              >
                <div className="flex items-center justify-center w-6">
                  {getRankIcon(user.rank)}
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.xp.toLocaleString()} XP
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )
    }

    return (
      <Card ref={ref} className={cn("", className)} {...props}>
        <CardHeader>
          <CardTitle className="text-xl">
            {variant === "weekly" ? "Weekly" : "Overall"} Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
              onClick={() => onUserClick?.(user.id)}
            >
              <div className="flex items-center justify-center w-8">
                {getRankIcon(user.rank)}
              </div>
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-medium">{user.username}</p>
                  {user.verified && (
                    <Badge variant="cosmic" size="sm">Verified</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <span>Level {user.level}</span>
                  <span>{user.xp.toLocaleString()} XP</span>
                  {variant === "weekly" && user.weeklyXp && (
                    <span>+{user.weeklyXp.toLocaleString()} this week</span>
                  )}
                </div>
                {showBadges && user.badges && user.badges.length > 0 && (
                  <div className="flex space-x-1 mt-1">
                    {user.badges.slice(0, 3).map((badge, index) => (
                      <Badge key={index} variant="outline" size="sm">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              {user.streak && (
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-orange-400">
                    <Flame className="w-4 h-4" />
                    <span className="font-medium">{user.streak}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">day streak</div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }
)

Leaderboard.displayName = "Leaderboard"

export { 
  CommunityFeed, 
  Leaderboard,
  type User,
  type Post,
  type Reply 
}