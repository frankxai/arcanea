"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  Sparkles,
  Brain,
  Users,
  Book,
  Trophy,
  HelpCircle
} from "lucide-react"
import { cn } from "../ui/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { 
  Navigation, 
  NavigationContainer, 
  NavigationLogo, 
  NavigationMenu, 
  NavigationItem, 
  NavigationDropdown,
  MobileNavigationToggle,
  MobileNavigationMenu,
  UserNavigation
} from "../ui/navigation"

interface NavigationBarProps extends React.HTMLAttributes<HTMLElement> {
  user?: {
    name: string
    email?: string
    avatar?: string
    level?: number
    xp?: number
    notifications?: number
  }
  variant?: "default" | "transparent" | "cosmic" | "compact"
  showSearch?: boolean
  showNotifications?: boolean
  onSignIn?: () => void
  onSignOut?: () => void
  onSearch?: (query: string) => void
  onNotificationClick?: () => void
  fixed?: boolean
}

const NavigationBar = React.forwardRef<HTMLElement, NavigationBarProps>(
  ({ 
    className, 
    user,
    variant = "default",
    showSearch = true,
    showNotifications = true,
    onSignIn,
    onSignOut,
    onSearch,
    onNotificationClick,
    fixed = true,
    ...props 
  }, ref) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [searchFocused, setSearchFocused] = React.useState(false)

    const academiesMenuItems = [
      { label: "Visual Arts", href: "/academies/visual", icon: <span className="text-purple-400">🎨</span> },
      { label: "Narrative Craft", href: "/academies/narrative", icon: <span className="text-blue-400">📚</span> },
      { label: "Music Production", href: "/academies/music", icon: <span className="text-green-400">🎵</span> },
      { label: "Video Creation", href: "/academies/video", icon: <span className="text-red-400">🎬</span> },
      { label: "Creative Coding", href: "/academies/code", icon: <span className="text-yellow-400">💻</span> },
      { label: "Synthesis Mastery", href: "/academies/synthesis", icon: <span className="text-indigo-400">⚡</span> }
    ]

    const luminorsMenuItems = [
      { label: "Harmonix", href: "/luminors/harmonix", icon: <span className="text-red-400">🎵</span> },
      { label: "Scripta", href: "/luminors/scripta", icon: <span className="text-teal-400">📝</span> },
      { label: "Lumina", href: "/luminors/lumina", icon: <span className="text-blue-400">💡</span> },
      { label: "Kinetix", href: "/luminors/kinetix", icon: <span className="text-green-400">🎬</span> },
      { label: "Syntaxa", href: "/luminors/syntaxa", icon: <span className="text-yellow-400">💻</span> },
      { label: "Nexus", href: "/luminors/nexus", icon: <span className="text-purple-400">🔮</span> }
    ]

    const communityMenuItems = [
      { label: "Showcase", href: "/community/showcase", icon: <Trophy className="h-4 w-4" /> },
      { label: "Discussions", href: "/community/discussions", icon: <Users className="h-4 w-4" /> },
      { label: "Events", href: "/community/events", icon: <Sparkles className="h-4 w-4" /> },
      { label: "Leaderboard", href: "/community/leaderboard", icon: <Trophy className="h-4 w-4" /> }
    ]

    const resourcesMenuItems = [
      { label: "Documentation", href: "/docs", icon: <Book className="h-4 w-4" /> },
      { label: "Tutorials", href: "/tutorials", icon: <Brain className="h-4 w-4" /> },
      { label: "Help Center", href: "/help", icon: <HelpCircle className="h-4 w-4" /> },
      { label: "API Reference", href: "/api", icon: <Book className="h-4 w-4" /> }
    ]

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault()
      if (searchQuery.trim()) {
        onSearch?.(searchQuery)
      }
    }

    const navVariant = variant === "transparent" ? "transparent" : variant === "cosmic" ? "cosmic" : "default"

    return (
      <Navigation
        ref={ref}
        variant={navVariant}
        fixed={fixed}
        blur={variant !== "transparent"}
        className={cn("border-b border-arcanean-aurora/20", className)}
        {...props}
      >
        <NavigationContainer>
          {/* Logo */}
          <NavigationLogo href="/" gradient>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-arcanean-luminous rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-arcanean-void" />
              </div>
              <span className="font-bold text-xl">Arcanea</span>
            </div>
          </NavigationLogo>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationDropdown
                trigger={<span>Academies</span>}
                items={academiesMenuItems}
              />
              <NavigationDropdown
                trigger={<span>Luminors</span>}
                items={luminorsMenuItems}
              />
              <NavigationDropdown
                trigger={<span>Community</span>}
                items={communityMenuItems}
              />
              <NavigationItem href="/pricing">Pricing</NavigationItem>
              <NavigationDropdown
                trigger={<span>Resources</span>}
                items={resourcesMenuItems}
              />
            </NavigationMenu>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <motion.div
              className="hidden md:flex flex-1 max-w-md mx-4"
              animate={{
                width: searchFocused ? "100%" : "auto",
              }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search academies, projects, creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  variant="cosmic"
                  className="pl-10 pr-4 w-full"
                />
              </form>
            </motion.div>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {showNotifications && user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onNotificationClick}
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {user.notifications && user.notifications > 0 && (
                  <Badge
                    variant="destructive"
                    size="sm"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {user.notifications > 9 ? "9+" : user.notifications}
                  </Badge>
                )}
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <MobileNavigationToggle
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />

            {/* User Navigation */}
            {user ? (
              <div className="hidden lg:block">
                <NavigationDropdown
                  trigger={
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-arcanean-cosmic/50 flex items-center justify-center">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </div>
                      <div className="hidden xl:block text-left">
                        <p className="text-sm font-medium">{user.name}</p>
                        {user.level && (
                          <p className="text-xs text-muted-foreground">
                            Level {user.level} • {user.xp?.toLocaleString()} XP
                          </p>
                        )}
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  }
                  items={[
                    { label: "Profile", href: "/profile", icon: <User className="h-4 w-4" /> },
                    { label: "Dashboard", href: "/dashboard", icon: <Brain className="h-4 w-4" /> },
                    { label: "Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
                    { label: "Sign Out", onClick: onSignOut, icon: <LogOut className="h-4 w-4" /> }
                  ]}
                />
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={onSignIn}>
                  Sign In
                </Button>
                <Button variant="luminor" size="sm" onClick={onSignIn}>
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </NavigationContainer>

        {/* Mobile Menu */}
        <MobileNavigationMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {/* Mobile Search */}
          {showSearch && (
            <div className="mb-6">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  variant="cosmic"
                  className="pl-10 pr-4 w-full"
                />
              </form>
            </div>
          )}

          {/* Mobile Navigation Items */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Academies</h3>
              <div className="space-y-1">
                {academiesMenuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Luminors</h3>
              <div className="space-y-1">
                {luminorsMenuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Community</h3>
              <div className="space-y-1">
                {communityMenuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <a
                href="/pricing"
                className="block p-2 rounded-md hover:bg-accent text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
            </div>

            {/* Mobile User Section */}
            {user ? (
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center space-x-3 p-2">
                  <div className="w-10 h-10 rounded-full bg-arcanean-cosmic/50 flex items-center justify-center">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    {user.level && (
                      <p className="text-xs text-muted-foreground">
                        Level {user.level} • {user.xp?.toLocaleString()} XP
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <a href="/profile" className="block p-2 rounded-md hover:bg-accent text-sm">
                    Profile
                  </a>
                  <a href="/dashboard" className="block p-2 rounded-md hover:bg-accent text-sm">
                    Dashboard
                  </a>
                  <a href="/settings" className="block p-2 rounded-md hover:bg-accent text-sm">
                    Settings
                  </a>
                  <button
                    onClick={onSignOut}
                    className="block w-full text-left p-2 rounded-md hover:bg-accent text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-t pt-4 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    onSignIn?.()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="luminor"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    onSignIn?.()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </MobileNavigationMenu>
      </Navigation>
    )
  }
)

NavigationBar.displayName = "NavigationBar"

export { NavigationBar }