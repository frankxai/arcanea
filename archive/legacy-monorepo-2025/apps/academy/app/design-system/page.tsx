"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TooltipProvider,
  Tooltip,
  HoverLift,
  GradientBackground,
} from "@/components/ui/arcanea-components";

export default function DesignSystemPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <GradientBackground gradient="aurora-grained" className="px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              🎨 Arcanea Design System
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Radix UI primitives enhanced with premium Arcanea effects
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="glass" size="lg">
                ✨ Glass Morphism
              </Button>
              <Button variant="premium" size="lg">
                🚀 Premium Gradient
              </Button>
            </div>
          </div>
        </GradientBackground>

        <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
          
          {/* Buttons Section */}
          <section>
            <h2 className="text-2xl font-bold mb-8">🔒 Premium Buttons (Locked Components)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <Card variant="glass">
                <h3 className="text-lg font-semibold mb-4">Premium Gradient Buttons</h3>
                <p className="text-muted-foreground mb-4">
                  🔒 LOCKED - Your beloved buttons with light sweep animation preserved
                </p>
                <div className="space-y-3">
                  <Button variant="premium" className="w-full">
                    ✨ Aurora Gradient Button
                  </Button>
                  <Button variant="premium" size="lg" className="w-full">
                    🌟 Large Premium Action
                  </Button>
                  <Button 
                    variant="premium" 
                    leftIcon={<span>⭐</span>}
                    rightIcon={<span>→</span>}
                    className="w-full"
                  >
                    With Icons
                  </Button>
                </div>
              </Card>

              <Card variant="glass">
                <h3 className="text-lg font-semibold mb-4">Glass Morphism Buttons</h3>
                <p className="text-muted-foreground mb-4">
                  🔒 LOCKED - Perfect glass effect with shimmer animation
                </p>
                <div className="space-y-3">
                  <Button variant="glass" className="w-full">
                    🔮 Glass Morphism
                  </Button>
                  <Button variant="glass" size="lg" className="w-full">
                    💎 Large Glass Button
                  </Button>
                  <Tooltip content="This button has a beautiful shimmer effect on hover">
                    <Button variant="glass" className="w-full">
                      ⚡ Hover for Magic
                    </Button>
                  </Tooltip>
                </div>
              </Card>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">🔧 Flexible Button Variants</h3>
              <div className="flex gap-4 flex-wrap">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="lg">Large</Button>
                <Button variant="primary" isLoading>Loading</Button>
              </div>
            </div>
          </section>

          {/* Cards Section */}
          <section>
            <h2 className="text-2xl font-bold mb-8">💎 Premium Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <Card variant="default">
                <h3 className="text-lg font-semibold mb-2">Standard Card</h3>
                <p className="text-muted-foreground mb-4">
                  🔧 Flexible - Customizable design with subtle hover
                </p>
                <Button variant="primary" size="sm">
                  Learn More
                </Button>
              </Card>

              <HoverLift intensity="strong">
                <Card variant="glass">
                  <h3 className="text-lg font-semibold mb-2">Premium Glass Card</h3>
                  <p className="text-muted-foreground mb-4">
                    🔒 LOCKED - Glass morphism with magical lift effect
                  </p>
                  <Button variant="glass" size="sm">
                    Explore
                  </Button>
                </Card>
              </HoverLift>

              <Card variant="gradient" gradient="cosmic-grained" className="text-center">
                <h3 className="text-lg font-semibold mb-2">Gradient Card</h3>
                <p className="text-white/80 mb-4">
                  Beautiful gradient background with premium hover effects
                </p>
                <Button 
                  variant="glass" 
                  size="sm"
                  className="bg-white/20 text-white border-white/30"
                >
                  Discover
                </Button>
              </Card>
            </div>
          </section>

          {/* Dialog Example */}
          <section>
            <h2 className="text-2xl font-bold mb-8">🪟 Premium Dialogs</h2>
            <div className="flex gap-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="premium">
                    ✨ Open Premium Dialog
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Premium Glass Dialog</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-muted-foreground mb-4">
                      This dialog uses glass morphism with backdrop blur for a premium feel.
                      The background is automatically blurred and darkened.
                    </p>
                    <div className="space-y-3">
                      <Button variant="premium" className="w-full">
                        Primary Action
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="secondary" className="flex-1">
                          Secondary
                        </Button>
                        <DialogClose asChild>
                          <Button variant="ghost" className="flex-1">
                            Close
                          </Button>
                        </DialogClose>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </section>

          {/* Tabs Example */}
          <section>
            <h2 className="text-2xl font-bold mb-8">📑 Premium Tabs</h2>
            <Card variant="glass">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">System Overview</h3>
                  <p className="text-muted-foreground mb-4">
                    Arcanea Design System combines Radix UI's accessibility and flexibility 
                    with premium visual effects including glass morphism, gradient backgrounds,
                    and magical hover animations.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <span className="text-green-800 font-medium">✓ Accessible</span>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <span className="text-blue-800 font-medium">✓ Type-safe</span>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <span className="text-purple-800 font-medium">✓ Premium Effects</span>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <span className="text-yellow-800 font-medium">✓ Customizable</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🔒</span>
                      <div>
                        <h4 className="font-medium">Locked Components</h4>
                        <p className="text-sm text-muted-foreground">
                          Premium buttons and effects that are perfected and shouldn't be changed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🔧</span>
                      <div>
                        <h4 className="font-medium">Flexible Components</h4>
                        <p className="text-sm text-muted-foreground">
                          Customizable components for different use cases and themes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">✨</span>
                      <div>
                        <h4 className="font-medium">Premium Effects</h4>
                        <p className="text-sm text-muted-foreground">
                          Glass morphism, gradient backgrounds, hover animations, and more
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="examples" className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Usage Examples</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <pre>{`// Premium button with your beloved effects
<Button variant="premium" size="lg">
  ✨ Premium Action
</Button>

// Glass morphism card
<Card variant="glass">
  <h3>Glass Card</h3>
  <p>With backdrop blur and premium hover</p>
</Card>

// Premium dialog
<Dialog>
  <DialogTrigger asChild>
    <Button variant="glass">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Premium Dialog</DialogTitle>
    {/* Content */}
  </DialogContent>
</Dialog>`}</pre>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </section>

          {/* Gradient Showcase */}
          <section>
            <h2 className="text-2xl font-bold mb-8">🌈 Premium Gradients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Aurora", key: "aurora-grained" },
                { name: "Cosmic", key: "cosmic-grained" },
                { name: "Neural", key: "neural-grained" },
                { name: "Plasma", key: "plasma" },
                { name: "Sunset", key: "sunset-grained" },
                { name: "Ocean", key: "ocean-grained" },
              ].map((gradient) => (
                <HoverLift key={gradient.key} intensity="medium">
                  <GradientBackground
                    gradient={gradient.key}
                    className="p-6 rounded-xl text-white text-center"
                  >
                    <h3 className="text-lg font-semibold mb-2">{gradient.name}</h3>
                    <p className="text-white/80 text-sm mb-3">
                      Premium grained gradient
                    </p>
                    <Button 
                      variant="glass" 
                      size="sm"
                      className="bg-white/20 text-white border-white/30"
                    >
                      Use Gradient
                    </Button>
                  </GradientBackground>
                </HoverLift>
              ))}
            </div>
          </section>

          {/* Component Status */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-8">📊 Component Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <Card variant="default">
                <div className="text-center">
                  <span className="text-3xl mb-2 block">🔒</span>
                  <h3 className="font-semibold mb-2">Locked Components</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Perfected components that preserve your beloved effects
                  </p>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Premium gradient buttons</li>
                    <li>• Glass morphism effects</li>
                    <li>• Light sweep animations</li>
                    <li>• Beloved round corners</li>
                  </ul>
                </div>
              </Card>

              <Card variant="default">
                <div className="text-center">
                  <span className="text-3xl mb-2 block">🔧</span>
                  <h3 className="font-semibold mb-2">Flexible Components</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customizable components for different needs
                  </p>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Standard buttons</li>
                    <li>• Basic cards</li>
                    <li>• Form elements</li>
                    <li>• Layout components</li>
                  </ul>
                </div>
              </Card>

              <Card variant="default">
                <div className="text-center">
                  <span className="text-3xl mb-2 block">⚡</span>
                  <h3 className="font-semibold mb-2">Radix Powered</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Built on Radix UI primitives for accessibility
                  </p>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Keyboard navigation</li>
                    <li>• Screen reader support</li>
                    <li>• Focus management</li>
                    <li>• ARIA attributes</li>
                  </ul>
                </div>
              </Card>
            </div>
          </section>

        </div>
      </div>
    </TooltipProvider>
  );
}