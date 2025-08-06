"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Brain, Target, Calendar, Clock, Zap, TrendingUp, Users, DollarSign,
  BarChart3, MessageSquare, Instagram, Facebook, Mail, Smartphone,
  Package, Tag, Percent, Activity, History, Play, Pause, Settings,
  Download, Share2, Bell, CheckCircle, AlertTriangle, Star, ArrowRight,
  Plus, Edit, Trash, Eye, Copy, ExternalLink, ChevronRight, ChevronDown,
  Lightbulb, Rocket, Shield, Crown, Heart, EyeOff, RefreshCw,
  Save, Loader2, Sparkles, Target as TargetIcon, Calendar as CalendarIcon,
  Users as UsersIcon, DollarSign as DollarSignIcon, BarChart3 as BarChart3Icon
} from "lucide-react"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from "recharts"

// Interfaces for data structures
interface StrategyGoal {
  id: string
  type: 'revenue' | 'orders' | 'engagement' | 'reach' | 'custom'
  target: string
  timeframe: number // days
  urgency: 'low' | 'medium' | 'high'
  budget?: number
  constraints?: string[]
  description: string
  createdAt: string
  status: 'draft' | 'active' | 'completed' | 'paused'
}

interface StrategyAction {
  id: string
  type: 'drop' | 'ad' | 'content' | 'vip' | 'timing' | 'budget' | 'reminder'
  title: string
  description: string
  day: number // which day in the strategy
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'in-progress' | 'completed' | 'skipped'
  estimatedImpact: number // percentage
  budget?: number
  platform?: string[]
  targetAudience?: string
  creativeType?: string
  timing?: string
  dependencies?: string[]
  completionNotes?: string
}

interface StrategyPlan {
  id: string
  goalId: string
  title: string
  description: string
  duration: number // days
  confidence: number // percentage
  predictedOutcome: {
    revenue?: number
    orders?: number
    engagement?: number
    reach?: number
  }
  actions: StrategyAction[]
  dataSources: string[]
  reasoning: string[]
  recommendations: string[]
  riskFactors: string[]
  createdAt: string
  status: 'draft' | 'active' | 'completed' | 'paused'
  lastUpdated: string
}

interface StrategyMetrics {
  totalStrategies: number
  activeStrategies: number
  completedStrategies: number
  averageConfidence: number
  averageSuccessRate: number
  totalPredictedRevenue: number
  totalActualRevenue: number
  topPerformingActions: string[]
}

export function AIStrategyComposer() {
  const [goals, setGoals] = useState<StrategyGoal[]>([])
  const [strategies, setStrategies] = useState<StrategyPlan[]>([])
  const [metrics, setMetrics] = useState<StrategyMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'composer' | 'strategies' | 'analytics'>('composer')
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyPlan | null>(null)
  const [showGoalDialog, setShowGoalDialog] = useState(false)
  const [newGoal, setNewGoal] = useState({
    type: 'revenue' as const,
    target: '',
    timeframe: 7,
    urgency: 'medium' as const,
    budget: 0,
    constraints: [] as string[],
    description: ''
  })

  // Load data functions
  const loadGoals = async () => {
    try {
      const response = await fetch('/api/ai-strategy-composer/goals')
      if (response.ok) {
        const data = await response.json()
        setGoals(data)
      }
    } catch (error) {
      console.error('Error loading goals:', error)
    }
  }

  const loadStrategies = async () => {
    try {
      const response = await fetch('/api/ai-strategy-composer/strategies')
      if (response.ok) {
        const data = await response.json()
        setStrategies(data)
      }
    } catch (error) {
      console.error('Error loading strategies:', error)
    }
  }

  const loadMetrics = async () => {
    try {
      const response = await fetch('/api/ai-strategy-composer/metrics')
      if (response.ok) {
        const data = await response.json()
        setMetrics(data)
      }
    } catch (error) {
      console.error('Error loading metrics:', error)
    }
  }

  // Generate strategy function
  const generateStrategy = async (goal: StrategyGoal) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/ai-strategy-composer/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goal)
      })
      if (response.ok) {
        const strategy = await response.json()
        setStrategies(prev => [strategy, ...prev])
        setSelectedStrategy(strategy)
        setActiveTab('strategies')
      }
    } catch (error) {
      console.error('Error generating strategy:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Update action status
  const updateActionStatus = async (strategyId: string, actionId: string, status: StrategyAction['status']) => {
    try {
      const response = await fetch(`/api/ai-strategy-composer/actions/${actionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (response.ok) {
        setStrategies(prev => prev.map(strategy => {
          if (strategy.id === strategyId) {
            return {
              ...strategy,
              actions: strategy.actions.map(action =>
                action.id === actionId ? { ...action, status } : action
              )
            }
          }
          return strategy
        }))
      }
    } catch (error) {
      console.error('Error updating action status:', error)
    }
  }

  // Create new goal
  const createGoal = async () => {
    try {
      const response = await fetch('/api/ai-strategy-composer/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal)
      })
      if (response.ok) {
        const goal = await response.json()
        setGoals(prev => [goal, ...prev])
        setShowGoalDialog(false)
        setNewGoal({
          type: 'revenue',
          target: '',
          timeframe: 7,
          urgency: 'medium',
          budget: 0,
          constraints: [],
          description: ''
        })
      }
    } catch (error) {
      console.error('Error creating goal:', error)
    }
  }

  useEffect(() => {
    loadGoals()
    loadStrategies()
    loadMetrics()
  }, [])

  const getPriorityColor = (priority: StrategyAction['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: StrategyAction['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'skipped': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getUrgencyColor = (urgency: StrategyGoal['urgency']) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Strategy Composer</h1>
          <p className="text-gray-600 mt-2">
            Your AI-powered business strategist. Input any goal and get a complete action plan.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setShowGoalDialog(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Goal
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="composer" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>Strategy Composer</span>
          </TabsTrigger>
          <TabsTrigger value="strategies" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>My Strategies</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Strategy Composer Tab */}
        <TabsContent value="composer" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Smart Input */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span>Smart Goal Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-900">AI Goal Understanding</h3>
                  </div>
                  <p className="text-sm text-purple-700 mb-4">
                    Tell me what you want to achieve. I&apos;ll analyze your goal and create a complete strategy.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-purple-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Auto-detect timeframes and urgency</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-purple-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Pull data from all connected modules</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-purple-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Generate step-by-step action plan</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="goal-input">What&apos;s your goal?</Label>
                    <Textarea
                      id="goal-input"
                      placeholder="e.g., I want to generate 300,000 EGP this month, I need to hit 1,000 orders in the next 21 days, I&apos;m launching a new hoodie — help me do it right..."
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Strategy...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Generate Strategy
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {metrics ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Active Strategies</span>
                        <Badge variant="secondary">{metrics.activeStrategies}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Success Rate</span>
                        <Badge variant="secondary">{metrics.averageSuccessRate}%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Avg Confidence</span>
                        <Badge variant="secondary">{metrics.averageConfidence}%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Predicted Revenue</span>
                        <span className="text-sm font-semibold text-green-600">
                          {formatCurrency(metrics.totalPredictedRevenue)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500">
                    <Activity className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">Loading metrics...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <span>Recent Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {goals.length > 0 ? (
                <div className="space-y-3">
                  {goals.slice(0, 5).map((goal) => (
                    <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {goal.type === 'revenue' && <DollarSignIcon className="w-4 h-4 text-green-600" />}
                          {goal.type === 'orders' && <Package className="w-4 h-4 text-blue-600" />}
                          {goal.type === 'engagement' && <Heart className="w-4 h-4 text-red-600" />}
                          {goal.type === 'reach' && <UsersIcon className="w-4 h-4 text-purple-600" />}
                          {goal.type === 'custom' && <TargetIcon className="w-4 h-4 text-gray-600" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{goal.target}</p>
                          <p className="text-sm text-gray-600">{goal.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getUrgencyColor(goal.urgency)}>
                          {goal.urgency}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => generateStrategy(goal)}
                          disabled={isLoading}
                        >
                          <Brain className="w-4 h-4 mr-1" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Target className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No goals created yet. Create your first goal to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Strategies Tab */}
        <TabsContent value="strategies" className="space-y-6">
          {strategies.length > 0 ? (
            <div className="space-y-6">
              {strategies.map((strategy) => (
                <Card key={strategy.id} className="border-2 border-gray-100 hover:border-purple-200 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                          <Brain className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{strategy.title}</CardTitle>
                          <p className="text-sm text-gray-600">{strategy.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{strategy.status}</Badge>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          {strategy.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Duration</p>
                        <p className="text-lg font-semibold">{strategy.duration} days</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Actions</p>
                        <p className="text-lg font-semibold">{strategy.actions.length} steps</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Predicted Revenue</p>
                        <p className="text-lg font-semibold text-green-600">
                          {strategy.predictedOutcome.revenue ? formatCurrency(strategy.predictedOutcome.revenue) : 'N/A'}
                        </p>
                      </div>
                    </div>

                    {/* Timeline View */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Action Timeline</h4>
                      <div className="space-y-2">
                        {strategy.actions
                          .sort((a, b) => a.day - b.day)
                          .map((action) => (
                            <div key={action.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Badge className={getPriorityColor(action.priority)}>
                                  {action.priority}
                                </Badge>
                                <Badge className={getStatusColor(action.status)}>
                                  {action.status}
                                </Badge>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{action.title}</p>
                                <p className="text-sm text-gray-600">{action.description}</p>
                                <p className="text-xs text-gray-500">Day {action.day} • {action.estimatedImpact}% impact</p>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateActionStatus(strategy.id, action.id, 'completed')}
                                  disabled={action.status === 'completed'}
                                >
                                  <CheckCircle className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateActionStatus(strategy.id, action.id, 'skipped')}
                                  disabled={action.status === 'skipped'}
                                >
                                  <EyeOff className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">AI Reasoning</h4>
                      <div className="space-y-2">
                        {strategy.reasoning.map((reason, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-blue-800">{reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">Recommendations</h4>
                      <div className="space-y-2">
                        {strategy.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Rocket className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-green-800">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Brain className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">No strategies yet</h3>
              <p className="text-sm">Create your first goal and generate a strategy to get started.</p>
            </div>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {metrics ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Strategies</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.totalStrategies}</div>
                  <p className="text-xs text-muted-foreground">
                    +{metrics.activeStrategies} active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.averageSuccessRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Average across all strategies
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.averageConfidence}%</div>
                  <p className="text-xs text-muted-foreground">
                    AI prediction accuracy
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Predicted Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(metrics.totalPredictedRevenue)}</div>
                  <p className="text-xs text-muted-foreground">
                    Total across all strategies
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Loading analytics...</h3>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Goal Creation Dialog */}
      <Dialog open={showGoalDialog} onOpenChange={setShowGoalDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="goal-type">Goal Type</Label>
              <Select
                value={newGoal.type}
                onValueChange={(value) => setNewGoal(prev => ({ ...prev, type: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Target</SelectItem>
                  <SelectItem value="orders">Order Count</SelectItem>
                  <SelectItem value="engagement">Engagement Rate</SelectItem>
                  <SelectItem value="reach">Audience Reach</SelectItem>
                  <SelectItem value="custom">Custom Goal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goal-target">Target</Label>
              <Input
                id="goal-target"
                value={newGoal.target}
                onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                placeholder="e.g., 300,000 EGP, 1,000 orders, 15% engagement"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="goal-timeframe">Timeframe (days)</Label>
                <Input
                  id="goal-timeframe"
                  type="number"
                  value={newGoal.timeframe}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, timeframe: parseInt(e.target.value) }))}
                  min="1"
                  max="90"
                />
              </div>
              <div>
                <Label htmlFor="goal-urgency">Urgency</Label>
                <Select
                  value={newGoal.urgency}
                  onValueChange={(value) => setNewGoal(prev => ({ ...prev, urgency: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="goal-budget">Budget (optional)</Label>
              <Input
                id="goal-budget"
                type="number"
                value={newGoal.budget}
                onChange={(e) => setNewGoal(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                placeholder="Enter budget amount"
              />
            </div>

            <div>
              <Label htmlFor="goal-description">Description</Label>
              <Textarea
                id="goal-description"
                value={newGoal.description}
                onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your goal in detail..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowGoalDialog(false)}>
                Cancel
              </Button>
              <Button onClick={createGoal}>
                Create Goal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 