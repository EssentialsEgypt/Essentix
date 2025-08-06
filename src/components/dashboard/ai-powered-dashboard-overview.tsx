"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Brain, Zap, Target, CheckCircle, XCircle,
    TrendingUp, AlertTriangle, Star, Lightbulb, Users,
    BarChart3, Clock, Calendar, MessageSquare, Award,
    RefreshCw, Settings, Eye, EyeOff, Bell, BellOff,
    DollarSign, Activity, Heart, Shield, Crown, Gift,
    ArrowUpRight, ArrowDownRight, Minus, Plus
} from "lucide-react"
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from "recharts"

interface DashboardMetric {
    id: string
    title: string
    value: string | number
    change: number
    trend: 'up' | 'down' | 'stable'
    target: number
    status: 'on-track' | 'ahead' | 'behind' | 'critical'
    aiInsight: string
    priority: 'high' | 'medium' | 'low'
}

interface AIInsight {
    id: string
    type: 'alert' | 'recommendation' | 'prediction' | 'opportunity'
    title: string
    description: string
    impact: 'high' | 'medium' | 'low'
    category: 'revenue' | 'customers' | 'operations' | 'team' | 'marketing'
    confidence: number
    action: string
    urgency: 'immediate' | 'soon' | 'planning'
    timestamp: Date
}

interface SystemStatus {
    system: string
    status: 'operational' | 'degraded' | 'down' | 'maintenance'
    performance: number
    lastCheck: Date
    issues: string[]
}

interface QuickAction {
    id: string
    title: string
    description: string
    icon: any
    action: string
    priority: 'urgent' | 'high' | 'medium' | 'low'
    category: string
}

export function AIPoweredDashboardOverview() {
    const [metrics, setMetrics] = useState<DashboardMetric[]>([])
    const [insights, setInsights] = useState<AIInsight[]>([])
    const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([])
    const [quickActions, setQuickActions] = useState<QuickAction[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week' | 'month'>('week')

    // Generate mock data
    useEffect(() => {
        generateMockData()
    }, [selectedTimeframe])

    const generateMockData = () => {
        // Generate metrics
        const mockMetrics: DashboardMetric[] = [
            {
                id: 'revenue',
                title: 'Total Revenue',
                value: '$125,430',
                change: 23.5,
                trend: 'up',
                target: 120000,
                status: 'ahead',
                aiInsight: 'Revenue growth exceeds target by 4.5%. Strong performance in premium segment.',
                priority: 'high'
            },
            {
                id: 'customers',
                title: 'Active Customers',
                value: '2,847',
                change: 12.3,
                trend: 'up',
                target: 2800,
                status: 'on-track',
                aiInsight: 'Customer acquisition rate improving. VIP segment growing 18% faster.',
                priority: 'high'
            },
            {
                id: 'conversion',
                title: 'Conversion Rate',
                value: '8.7%',
                change: -2.1,
                trend: 'down',
                target: 9.0,
                status: 'behind',
                aiInsight: 'Conversion dip detected. Checkout optimization needed.',
                priority: 'medium'
            },
            {
                id: 'satisfaction',
                title: 'Customer Satisfaction',
                value: '4.8/5',
                change: 0.3,
                trend: 'up',
                target: 4.5,
                status: 'ahead',
                aiInsight: 'Satisfaction scores improving. Support team performance excellent.',
                priority: 'medium'
            },
            {
                id: 'team',
                title: 'Team Productivity',
                value: '87%',
                change: 5.2,
                trend: 'up',
                target: 85,
                status: 'ahead',
                aiInsight: 'Team performance above target. AI tools showing positive impact.',
                priority: 'medium'
            },
            {
                id: 'marketing',
                title: 'Marketing ROI',
                value: '3.2x',
                change: 0.4,
                trend: 'up',
                target: 3.0,
                status: 'ahead',
                aiInsight: 'Marketing efficiency improving. Facebook ads performing exceptionally well.',
                priority: 'high'
            }
        ]

        // Generate insights
        const mockInsights: AIInsight[] = [
            {
                id: 'insight-1',
                type: 'opportunity',
                title: 'VIP Customer Upsell Opportunity',
                description: '15 VIP customers ready for premium upgrades. Potential $45K additional revenue.',
                impact: 'high',
                category: 'revenue',
                confidence: 89,
                action: 'Launch VIP upgrade campaign',
                urgency: 'soon',
                timestamp: new Date()
            },
            {
                id: 'insight-2',
                type: 'alert',
                title: 'Conversion Rate Decline',
                description: 'Checkout abandonment increased 12% this week. Mobile optimization needed.',
                impact: 'medium',
                category: 'customers',
                confidence: 76,
                action: 'Optimize checkout flow',
                urgency: 'immediate',
                timestamp: new Date()
            },
            {
                id: 'insight-3',
                type: 'recommendation',
                title: 'Marketing Budget Reallocation',
                description: 'Facebook ads showing 3.2x ROI vs Instagram 1.8x. Recommend budget shift.',
                impact: 'high',
                category: 'marketing',
                confidence: 92,
                action: 'Increase Facebook ad spend',
                urgency: 'soon',
                timestamp: new Date()
            },
            {
                id: 'insight-4',
                type: 'prediction',
                title: 'Q4 Revenue Forecast',
                description: 'Based on current trends, Q4 revenue expected to grow 28% vs Q3.',
                impact: 'medium',
                category: 'revenue',
                confidence: 85,
                action: 'Prepare Q4 strategy',
                urgency: 'planning',
                timestamp: new Date()
            }
        ]

        // Generate system status
        const mockSystemStatus: SystemStatus[] = [
            {
                system: 'E-commerce Platform',
                status: 'operational',
                performance: 99.8,
                lastCheck: new Date(),
                issues: []
            },
            {
                system: 'Payment Processing',
                status: 'operational',
                performance: 99.9,
                lastCheck: new Date(),
                issues: []
            },
            {
                system: 'AI Analytics Engine',
                status: 'operational',
                performance: 98.5,
                lastCheck: new Date(),
                issues: ['Minor latency in real-time processing']
            },
            {
                system: 'Customer Support',
                status: 'operational',
                performance: 95.2,
                lastCheck: new Date(),
                issues: ['Response time slightly above target']
            }
        ]

        // Generate quick actions
        const mockQuickActions: QuickAction[] = [
            {
                id: 'action-1',
                title: 'Launch VIP Campaign',
                description: 'Target 15 high-value customers for premium upgrades',
                icon: Crown,
                action: 'campaign',
                priority: 'urgent',
                category: 'revenue'
            },
            {
                id: 'action-2',
                title: 'Optimize Checkout',
                description: 'Fix mobile checkout flow to reduce abandonment',
                icon: Settings,
                action: 'optimize',
                priority: 'high',
                category: 'customers'
            },
            {
                id: 'action-3',
                title: 'Adjust Ad Budget',
                description: 'Reallocate budget to high-performing Facebook ads',
                icon: BarChart3,
                action: 'budget',
                priority: 'high',
                category: 'marketing'
            },
            {
                id: 'action-4',
                title: 'Team Meeting',
                description: 'Schedule weekly performance review and planning',
                icon: Users,
                action: 'meeting',
                priority: 'medium',
                category: 'team'
            }
        ]

        setMetrics(mockMetrics)
        setInsights(mockInsights)
        setSystemStatus(mockSystemStatus)
        setQuickActions(mockQuickActions)
    }

    const performAIAnalysis = async () => {
        setIsAnalyzing(true)
        try {
            // Simulate AI analysis
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Add new insights
            const newInsights: AIInsight[] = [
                {
                    id: 'insight-5',
                    type: 'recommendation',
                    title: 'Inventory Optimization',
                    description: 'Fast-moving products showing stock risk. Recommend restocking strategy.',
                    impact: 'medium',
                    category: 'operations',
                    confidence: 78,
                    action: 'Review inventory levels',
                    urgency: 'soon',
                    timestamp: new Date()
                },
                {
                    id: 'insight-6',
                    type: 'prediction',
                    title: 'Customer Churn Risk',
                    description: '3 customers showing churn indicators. Proactive retention needed.',
                    impact: 'high',
                    category: 'customers',
                    confidence: 82,
                    action: 'Implement retention campaign',
                    urgency: 'immediate',
                    timestamp: new Date()
                }
            ]

            setInsights(prev => [...prev, ...newInsights])
        } catch (error) {
            console.error('AI Analysis failed:', error)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
        switch (trend) {
            case 'up': return <ArrowUpRight className="h-4 w-4 text-green-400" />
            case 'down': return <ArrowDownRight className="h-4 w-4 text-red-400" />
            case 'stable': return <Minus className="h-4 w-4 text-gray-400" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'operational': return 'text-green-400'
            case 'degraded': return 'text-yellow-400'
            case 'down': return 'text-red-400'
            case 'maintenance': return 'text-blue-400'
            default: return 'text-gray-400'
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-500'
            case 'high': return 'bg-orange-500'
            case 'medium': return 'bg-yellow-500'
            case 'low': return 'bg-green-500'
            default: return 'bg-gray-500'
        }
    }

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'high': return 'text-red-400'
            case 'medium': return 'text-yellow-400'
            case 'low': return 'text-green-400'
            default: return 'text-gray-400'
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">AI-Powered Dashboard</h1>
                    <p className="text-gray-400">Intelligent insights and automated recommendations</p>
                </div>
                <div className="flex items-center space-x-4">
                    <select
                        value={selectedTimeframe}
                        onChange={(e) => setSelectedTimeframe(e.target.value as 'day' | 'week' | 'month')}
                        className="bg-gray-800 text-white text-sm rounded px-3 py-2 border border-gray-600"
                        aria-label="Select time frame for dashboard data"
                    >
                        <option value="day">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                    </select>
                    <Button
                        onClick={performAIAnalysis}
                        disabled={isAnalyzing}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                        <Brain className="h-4 w-4 mr-2" />
                        {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.map(metric => (
                    <Card key={metric.id} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center justify-between">
                                <span className="text-white text-lg">{metric.title}</span>
                                <Badge className={`${getPriorityColor(metric.priority)} text-white`}>
                                    {metric.priority}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-white">{metric.value}</span>
                                    <div className="flex items-center space-x-1">
                                        {getTrendIcon(metric.trend)}
                                        <span className={`text-sm ${metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                                            {metric.change > 0 ? '+' : ''}{metric.change}%
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Target</span>
                                        <span className="text-white">{typeof metric.value === 'string' ? metric.value : `$${metric.target.toLocaleString()}`}</span>
                                    </div>
                                    <Progress
                                        value={metric.status === 'ahead' ? 110 : metric.status === 'behind' ? 85 : 100}
                                        className="h-2"
                                    />
                                </div>

                                <div className="text-xs text-blue-300 italic">
                                    {metric.aiInsight}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* AI Insights and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* AI Insights */}
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Brain className="h-5 w-5 text-purple-400" />
                            <span className="text-white">AI Insights</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {insights.map(insight => (
                                <div key={insight.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <Badge className={`${getImpactColor(insight.impact)} border-${insight.impact === 'high' ? 'red' : insight.impact === 'medium' ? 'yellow' : 'green'}-500`}>
                                                {insight.type}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs">
                                                {insight.confidence}% confidence
                                            </Badge>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {insight.timestamp.toLocaleTimeString()}
                                        </span>
                                    </div>

                                    <h4 className="font-medium text-white mb-1">{insight.title}</h4>
                                    <p className="text-sm text-gray-300 mb-3">{insight.description}</p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-400">Action: {insight.action}</span>
                                        <Badge variant="outline" className="text-xs">
                                            {insight.urgency}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Zap className="h-5 w-5 text-yellow-400" />
                            <span className="text-white">Quick Actions</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {quickActions.map(action => (
                                <div key={action.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-lg bg-purple-500/20">
                                                <action.icon className="h-5 w-5 text-purple-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">{action.title}</h4>
                                                <p className="text-sm text-gray-400">{action.description}</p>
                                            </div>
                                        </div>
                                        <Badge className={`${getPriorityColor(action.priority)} text-white`}>
                                            {action.priority}
                                        </Badge>
                                    </div>

                                    <Button
                                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                                        size="sm"
                                    >
                                        Execute Action
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* System Status */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Activity className="h-5 w-5 text-green-400" />
                        <span className="text-white">System Status</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {systemStatus.map(system => (
                            <div key={system.system} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-white">{system.system}</h4>
                                    <div className={`w-3 h-3 rounded-full ${getStatusColor(system.status).replace('text-', 'bg-')}`} />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Performance</span>
                                        <span className="text-white">{system.performance}%</span>
                                    </div>
                                    <Progress value={system.performance} className="h-2" />

                                    {system.issues.length > 0 && (
                                        <div className="text-xs text-yellow-400">
                                            {system.issues[0]}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 