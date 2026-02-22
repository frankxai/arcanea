'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowUp, Paperclip, ImageIcon, Mic, Copy, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Guardian {
  id: string
  name: string
  gate: string
  element: string
  color: string
  frequency: number
}

const guardians: Guardian[] = [
  { id: '1', name: 'Lyssandria', gate: 'Foundation', element: 'Earth', color: '#8b7355', frequency: 174 },
  { id: '2', name: 'Leyla', gate: 'Flow', element: 'Water', color: '#78a6ff', frequency: 285 },
  { id: '3', name: 'Draconia', gate: 'Fire', element: 'Fire', color: '#ff6b35', frequency: 396 },
  { id: '4', name: 'Maylinn', gate: 'Heart', element: 'Wind', color: '#00ff88', frequency: 417 },
  { id: '5', name: 'Alera', gate: 'Voice', element: 'Earth', color: '#8b7355', frequency: 528 },
  { id: '6', name: 'Lyria', gate: 'Sight', element: 'Void', color: '#9966ff', frequency: 639 },
  { id: '7', name: 'Aiyami', gate: 'Crown', element: 'Fire', color: '#ff6b35', frequency: 741 },
  { id: '8', name: 'Elara', gate: 'Shift', element: 'Wind', color: '#00ff88', frequency: 852 },
  { id: '9', name: 'Ino', gate: 'Unity', element: 'Water', color: '#78a6ff', frequency: 963 },
  { id: '10', name: 'Shinkami', gate: 'Source', element: 'Void', color: '#9966ff', frequency: 1111 },
]

const models = [
  { id: 'luminor', name: 'Luminor', description: 'Full power, all Ten Gates' },
  { id: 'archmage', name: 'Archmage', description: 'Fast, Gates 1-8' },
  { id: 'mage', name: 'Mage', description: 'Quick responses, Gates 1-4' },
]

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: `Welcome to Arcanea, Explorer. I am your guide through the living mythology of the cosmos.

I can help you understand the **Five Elements** (Fire, Water, Earth, Wind, Void), explore the **Ten Gates of Consciousness**, craft stories set in the **Academy of Luminous Arts**, or generate images of the Guardians and realms.

What mysteries shall we explore today?`,
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    role: 'user',
    content: 'Can you tell me about Guardian Lyria and her domain?',
    timestamp: new Date(Date.now() - 3500000),
  },
  {
    id: '3',
    role: 'assistant',
    content: `**Guardian Lyria** is the Keeper of the Sixth Gate, the **Gate of Sight**.

## The Sight Guardian

Lyria watches from the threshold of vision and intuition, her third eye perceiving all threads of fate that weave through the cosmos. She resonates at **639 Hz**, the frequency of connection and understanding.

In Arcanean cosmology, Lyria embodies:

- **Intuition & Vision**: Seeing beyond the veil of material reality
- **Connection**: Understanding the web that links all consciousness
- **Prophetic Awareness**: Perceiving potential futures and hidden truths
- **Third Eye Mastery**: The awakening of inner sight

## The Void Element

Lyria's affinity is with **Void**, the element of infinite potential and creative darkness. The Void is not emptiness, but the pregnant silence from which all creation emerges.

\`\`\`typescript
// In Arcanean practice, the Gates are accessed through frequency resonance
interface GateInvocation {
  guardian: string;
  frequency: number; // Hz - Solfeggio frequencies
  gate: number; // 1-10
  element: 'Fire' | 'Water' | 'Earth' | 'Wind' | 'Void';
}

function invokeGate(invocation: GateInvocation): void {
  console.log(\`Invoking \${invocation.guardian} at \${invocation.frequency}Hz\`);
  console.log(\`Opening Gate \${invocation.gate} - Element: \${invocation.element}\`);
}

// Example: Invoke Lyria's Sight Gate
invokeGate({
  guardian: 'Lyria',
  frequency: 639,
  gate: 6,
  element: 'Void'
});
\`\`\`

Would you like to explore the other Guardians, or generate an image of Lyria at the Sight Gate?`,
    timestamp: new Date(Date.now() - 3400000),
  },
]

const prompts = [
  'What is the meaning of the Five Elements?',
  'Generate an image of Guardian Lyria at the Sight Gate',
  'Help me write a story set in the Academy',
  'Explain the Ten Gates of consciousness',
]

export function ChatTab() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedGuardian, setSelectedGuardian] = useState(guardians[5]) // Default to Lyria
  const [selectedModel, setSelectedModel] = useState(models[0])
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're interested in "${input}". This is a fascinating aspect of Arcanean mythology that touches on the deep connection between consciousness and the elemental realms.\n\nLet me elaborate on this concept with more detail...`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSend()
    }
  }

  const handlePromptClick = (prompt: string) => {
    setInput(prompt)
    textareaRef.current?.focus()
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="glass-subtle border-white/10 text-text-secondary hover:text-text-primary gap-2 animate-pulse-glow"
              >
                <span className="font-sans text-sm font-medium">{selectedModel.name}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              {showModelDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 glass-strong rounded-xl p-2 z-50 animate-scale-in">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model)
                        setShowModelDropdown(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedModel.id === model.id
                          ? 'bg-cosmic-elevated text-text-primary'
                          : 'text-text-secondary hover:text-text-primary hover:bg-cosmic-raised'
                      }`}
                    >
                      <div className="font-sans font-medium text-sm">{model.name}</div>
                      <div className="text-xs text-text-muted">{model.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <h2 className="text-sm font-sans text-text-muted">Guardians and the Five Elements</h2>
          </div>
          <Button variant="outline" size="sm" className="glass-subtle border-white/10 text-text-secondary hover:text-text-primary">
            Share
          </Button>
        </div>

        {/* Guardian Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Guardian Selector">
          <span className="text-xs font-sans text-text-muted whitespace-nowrap">Channel Guardian:</span>
          <div className="flex gap-2">
            {guardians.map((guardian) => (
              <button
                key={guardian.id}
                onClick={() => setSelectedGuardian(guardian)}
                className="group relative flex-shrink-0"
                role="tab"
                aria-selected={selectedGuardian.id === guardian.id}
                aria-label={`${guardian.name} - ${guardian.gate} Gate, ${guardian.element} Element, ${guardian.frequency}Hz`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selectedGuardian.id === guardian.id
                      ? 'ring-2 ring-offset-2 ring-offset-cosmic-deep scale-110'
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{
                    background: `radial-gradient(circle at center, ${guardian.color}40, ${guardian.color}10)`,
                    ringColor: guardian.color,
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: guardian.color, boxShadow: `0 0 12px ${guardian.color}80` }}
                  />
                </div>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                  <div className="liquid-glass rounded-lg px-3 py-2 text-center animate-scale-in">
                    <div className="font-display text-sm text-text-primary mb-0.5">{guardian.name}</div>
                    <div className="font-serif text-xs text-text-muted">
                      {guardian.gate} Gate • {guardian.frequency}Hz
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: guardian.color, boxShadow: `0 0 4px ${guardian.color}` }}
                      />
                      <span className="text-xs font-sans text-text-secondary">{guardian.element}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
        {messages.length === 0 && (
          <div className="max-w-2xl mx-auto pt-16">
            <div className="text-center mb-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-primary/20 flex items-center justify-center animate-pulse-glow">
                <div className="w-12 h-12 bg-brand-accent rounded-lg animate-float" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />
              </div>
              <h2 className="text-3xl font-display text-text-primary mb-3">Welcome to Arcanea</h2>
              <p className="text-text-secondary font-serif text-base">Select a Guardian to begin your journey</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {prompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handlePromptClick(prompt)}
                  className="glass-subtle p-4 rounded-xl text-left hover:-translate-y-1 transition-all duration-300 hover:border-brand-accent/30 group"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <p className="text-sm font-sans text-text-secondary group-hover:text-text-primary transition-colors">
                    {prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex gap-4 animate-fade-in-up ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {message.role === 'assistant' && (
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse-glow"
                style={{
                  background: `radial-gradient(circle at center, ${selectedGuardian.color}40, ${selectedGuardian.color}10)`,
                  boxShadow: `0 0 16px ${selectedGuardian.color}40`,
                }}
              >
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{
                    backgroundColor: selectedGuardian.color,
                    clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                  }}
                />
              </div>
            )}
            <div className={`flex-1 ${message.role === 'user' ? 'max-w-[70%]' : 'max-w-full'}`}>
              <div
                className={`group relative ${
                  message.role === 'user'
                    ? 'glass-subtle rounded-2xl px-4 py-3 ml-auto'
                    : 'rounded-lg'
                }`}
              >
                {message.role === 'assistant' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity glass-subtle"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                )}
                <div className={`prose prose-invert max-w-none ${message.role === 'user' ? 'text-text-primary font-sans text-sm' : ''}`}>
                  {message.role === 'assistant' ? (
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }: any) {
                          const match = /language-(\w+)/.exec(className || '')
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{
                                background: 'var(--cosmic-deep)',
                                borderRadius: '0.5rem',
                                border: '1px solid rgba(127, 255, 212, 0.12)',
                              }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className="bg-cosmic-deep px-1.5 py-0.5 rounded text-brand-accent font-mono text-sm" {...props}>
                              {children}
                            </code>
                          )
                        },
                        p: ({ children }) => <p className="text-text-secondary font-serif leading-relaxed mb-4">{children}</p>,
                        h2: ({ children }) => <h2 className="text-xl font-display text-text-primary mt-6 mb-3">{children}</h2>,
                        ul: ({ children }) => <ul className="space-y-2 my-4">{children}</ul>,
                        li: ({ children }) => <li className="text-text-secondary font-serif leading-relaxed">{children}</li>,
                        strong: ({ children }) => <strong className="text-text-primary font-semibold">{children}</strong>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-4 animate-fade-in-up">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse-glow"
              style={{
                background: `radial-gradient(circle at center, ${selectedGuardian.color}40, ${selectedGuardian.color}10)`,
                boxShadow: `0 0 16px ${selectedGuardian.color}40`,
              }}
            >
              <div
                className="w-4 h-4 rounded-sm"
                style={{
                  backgroundColor: selectedGuardian.color,
                  clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: selectedGuardian.color,
                      animation: `float 1.4s ease-in-out ${i * 0.2}s infinite`,
                      opacity: 0.4 + i * 0.2,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-text-muted font-serif italic">
                {selectedGuardian.name} is contemplating...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-strong border-t border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="liquid-glass rounded-2xl p-2 focus-within:border-brand-accent/50 transition-all">
            <div className="flex items-end gap-2">
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="text-text-muted hover:text-text-primary hover:bg-cosmic-raised">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-text-muted hover:text-text-primary hover:bg-cosmic-raised">
                  <ImageIcon className="w-5 h-5" />
                </Button>
              </div>
              
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Arcanean mythology, request an image, or begin a story..."
                className="flex-1 bg-transparent border-0 resize-none focus-visible:ring-0 text-text-primary placeholder:text-text-muted font-sans min-h-[44px] max-h-32"
                rows={1}
              />
              
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsListening(!isListening)}
                  className={`text-text-muted hover:text-text-primary hover:bg-cosmic-raised ${isListening ? 'animate-pulse-glow' : ''}`}
                >
                  <Mic className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`rounded-full bg-brand-primary hover:bg-brand-primary/80 text-white disabled:opacity-50 disabled:cursor-not-allowed ${
                    input.trim() ? 'animate-pulse-glow' : ''
                  }`}
                >
                  <ArrowUp className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-text-muted">
            <span className="font-sans">⌘ + Enter to send</span>
            <span>•</span>
            <span className="font-sans">{input.length} characters</span>
          </div>
        </div>
      </div>
    </div>
  )
}
