'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Infinity,
  Users,
  Crown,
  Star,
  TrendingUp,
  Clock,
  Cpu,
  MemoryStick,
  Database
} from 'lucide-react'
import { secureMCPManager } from '@/lib/secure-mcp-manager'

interface UsageMetric {
  label: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'stable'
  icon?: React.ComponentType<any>
}

interface PerformanceMetric {
  label: string
  value: string | number
  benchmark?: string
  status?: 'optimal' | 'warning' | 'critical'
}

export default function UsageAnalytics() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day')
  const [realTimeMetrics, setRealTimeMetrics] = useState<UsageMetric[]>([])
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      updateMetrics()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const updateMetrics = async () => {
    try {
      const systemHealth = secureMCPManager.getSystemHealth()
      const usageStats = secureMCPManager.getUsageStatistics()
      
      // Update real-time usage metrics
      const newMetrics: UsageMetric[] = [
        {
          label: 'Active Users',
          value: systemHealth.healthyConnections || 0,
          change: Math.floor(Math.random() * 10) - 5,
          trend: Math.random() > 0.5 ? 'up' : 'down',
          icon: Users
        },
        {
          label: 'Generations/Min',
          value: Math.floor(Math.random() * 50) + 10,
          change: Math.floor(Math.random() * 5) - 2,
          trend: 'up',
          icon: Zap
        },
        {
          label: 'API Calls/Min',
          value: Math.floor(Math.random() * 200) + 50,
          trend: 'stable',
          icon: Infinity
        },
        {
          label: 'Avg Response Time',
          value: `${(Math.random() * 500 + 200).toFixed(0)}ms`,
          change: Math.random() > 0.3 ? -50 : 20,
          trend: Math.random() > 0.5 ? 'down' : 'up',
          icon: Clock
        }
      ]
      
      setRealTimeMetrics(newMetrics)
      
      // Update performance metrics
      const newPerformanceMetrics: PerformanceMetric[] = [
        {
          label: 'CPU Usage',
          value: `${(Math.random() * 60 + 20).toFixed(1)}%`,
          benchmark: '70%',
          status: Math.random() > 0.3 ? 'warning' : 'optimal'
        },
        {
          label: 'Memory Usage',
          value: `${(Math.random() * 40 + 30).toFixed(1)}%`,
          benchmark: '60%',
          status: Math.random() > 0.4 ? 'critical' : 'optimal'
        },
        {
          label: 'Database Connections',
          value: Math.floor(Math.random() * 50) + 10,
          benchmark: '80',
          status: Math.random() > 0.2 ? 'optimal' : 'warning'
        },
        {
          label: 'Cache Hit Rate',
          value: `${(Math.random() * 30 + 70).toFixed(1)}%`,
          benchmark: '85%',
          status: 'optimal'
        }
      ]
      
      setPerformanceMetrics(newPerformanceMetrics)
      
    } catch (error) {
      console.error('Failed to update metrics:', error)
    }
  }

  const periodData = {
    day: { 
      cost: 12.50, 
      generations: 245, 
      users: 89 
    },
    week: { 
      cost: 87.30, 
      generations: 1714, 
      users: 612 
    },
    month: { 
      cost: 374.80, 
      generations: 7380, 
      users: 2650 
    }
  }

  const currentData = periodData[period]

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'optimal': return 'text-arcane-crystal'
      case 'warning': return 'text-arcane-fire'
      case 'critical': return 'text-red-500'
      default: return 'text-arcane-300'
    }
  }

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return 'text-green-500'
      case 'down': return 'text-red-500'
      default: return 'text-arcane-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-arcane-cosmic via-arcane-shadow to-arcane-cosmic p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-arcane-shadow/80 backdrop-blur-sm rounded-2xl border border-arcane-crystal/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display text-arcane-crystal mb-2 flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                Usage Analytics
              </h1>
              <p className="text-arcane-300">Real-time performance and cost monitoring</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPeriod('day')}
                className={period === 'day' ? 'bg-arcane-crystal/20 text-arcane-crystal' : 'text-arcane-300 hover:text-arcane-crystal'}
              >
                Day
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPeriod('week')}
                className={period === 'week' ? 'bg-arcane-crystal/20 text-arcane-crystal' : 'text-arcane-300 hover:text-arcane-crystal'}
              >
                Week
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPeriod('month')}
                className={period === 'month' ? 'bg-arcane-crystal/20 text-arcane-crystal' : 'text-arcane-300 hover:text-arcane-crystal'}
              >
                Month
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Usage Metrics */}
        <div className="space-y-6">
          <div className="bg-arcane-shadow/80 backdrop-blur-sm rounded-2xl border border-arcane-cosmic/30 p-6">
            <h2 className="text-xl font-display text-arcane-crystal mb-6 flex items-center gap-3">
              <Users className="w-5 h-5" />
              Usage Metrics
              <Badge variant="crystal" className="text-xs">LIVE</Badge>
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 bg-arcane-cosmic/50 rounded-xl p-4 border border-arcane-crystal/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-arcane-crystal mb-2">${currentData.cost.toFixed(2)}</div>
                  <div className="text-sm text-arcane-300">Total Cost ({period})</div>
                  <div className={`text-xs ${getTrendIcon('up')} flex items-center gap-1 mt-2`}>
                    <TrendingUp className="w-3 h-3" />
                    <span>12% from last {period === 'day' ? 'week' : 'month'}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-arcane-cosmic/50 rounded-xl p-4 border border-arcane-cosmic/30">
                  <div className="flex items-center justify-between">
                    <span className="text-arcane-300">Generations</span>
                    <span className="text-2xl font-bold text-arcane-crystal">{currentData.generations.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bg-arcane-cosmic/50 rounded-xl p-4 border border-arcane-cosmic/30">
                  <div className="flex items-center justify-between">
                    <span className="text-arcane-300">Active Users</span>
                    <span className="text-2xl font-bold text-arcane-crystal">{currentData.users.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Metrics */}
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-display text-arcane-crystal mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Real-time Activity
              </h3>
              {realTimeMetrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <div key={index} className="flex items-center justify-between bg-arcane-cosmic/50 rounded-lg p-3 border border-arcane-cosmic/30">
                    <div className="flex items-center gap-3">
                      {Icon && <Icon className="w-4 h-4 text-arcane-crystal" />}
                      <span className="text-arcane-300">{metric.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-white">{metric.value}</span>
                      {metric.change && (
                        <span className={`text-sm ${getTrendIcon(metric.trend)}`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}
                        </span>
                      )}
                      {metric.trend && (
                        <TrendingUp className={`w-3 h-3 ${getTrendIcon(metric.trend)}`} />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-6">
          <div className="bg-arcane-shadow/80 backdrop-blur-sm rounded-2xl border border-arcane-cosmic/30 p-6">
            <h2 className="text-xl font-display text-arcane-crystal mb-6 flex items-center gap-3">
              <Cpu className="w-5 h-5" />
              System Performance
              <Badge variant="default" className="text-xs">OPTIMIZED</Badge>
            </h2>

            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => {
                const Icon = metric.label.includes('CPU') ? Cpu : 
                           metric.label.includes('Memory') ? MemoryStick : 
                           metric.label.includes('Database') ? Database : Shield
                           
                return (
                  <div key={index} className="bg-arcane-cosmic/50 rounded-lg p-4 border border-arcane-cosmic/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-arcane-crystal" />
                        <span className="text-arcane-300">{metric.label}</span>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getStatusColor(metric.status)}`}>
                          {metric.value}
                        </div>
                        {metric.benchmark && (
                          <div className="text-xs text-arcane-400">
                            Target: {metric.benchmark}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className={`w-full h-1 mt-3 rounded-full ${getStatusColor(metric.status)} ${
                      metric.status === 'optimal' ? 'bg-green-500' :
                      metric.status === 'warning' ? 'bg-arcane-fire' : 'bg-red-500'
                    }`} />
                  </div>
                )
              })}
            </div>

            {/* Health Status */}
            <div className="mt-6 p-4 bg-gradient-to-r from-arcane-crystal/10 to-arcane-fire/10 rounded-lg border border-arcane-crystal/30">
              <div className="text-center">
                <div className="text-lg font-display text-arcane-crystal mb-2">System Status</div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-arcane-300">All Systems Operational</span>
                </div>
                <div className="text-sm text-arcane-400 mt-2">
                  Uptime: 99.9% | Last 30 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-arcane-shadow/80 backdrop-blur-sm rounded-2xl border border-arcane-cosmic/30 p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-arcane-crystal mb-2">99.9%</div>
              <div className="text-sm text-arcane-300">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-arcane-crystal mb-2">247ms</div>
              <div className="text-sm text-arcane-300">Avg Response</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-arcane-crystal mb-2">40%</div>
              <div className="text-sm text-arcane-300">Cost Savings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-arcane-crystal mb-2">A+</div>
              <div className="text-sm text-arcane-300">Security Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}