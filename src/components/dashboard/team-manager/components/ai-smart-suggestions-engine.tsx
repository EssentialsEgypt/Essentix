"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Brain, Zap, Target, CheckCircle, XCircle,
    TrendingUp, AlertTriangle, Star, Lightbulb, Users,
    BarChart3, Clock, Calendar, MessageSquare, Award,
    RefreshCw, Settings, Eye, EyeOff, Bell, BellOff
} from "lucide-react"

interface SmartSuggestion {
    id: string
    type: 'task' | 'meeting' | 'break' | 'learning' | 'collaboration' | 'optimization'
    title: string
    description: string
    priority: 'critical' | 'high' | 'medium' | 'low'
    category: 'productivity' | 'wellness' | 'growth' | 'team' | 'process'
    confidence: number
    expectedImpact: string
    action: string
    trigger: 'time' | 'behavior' | 'performance' | 'mood' | 'schedule'
    status: 'pending' | 'accepted' | 'rejected' | 'completed'
    timestamp: Date
    teamMemberId?: string
    teamMemberName?: string
    aiReasoning: string
    relatedMetrics: string[]
}

interface SuggestionAnalytics {
    totalSuggestions: number
    acceptedSuggestions: number
    averageConfidence: number
    impactScore: number
    topCategories: { category: string; count: number }[]
    improvementAreas: string[]
    aiInsights: string[]
}

interface TeamMember {
    id: string
    name: string
    role: string
    currentTasks: string[]
    mood: 'positive' | 'neutral' | 'negative'
    energyLevel: number
    productivityScore: number
    lastBreak: Date
    preferredSchedule: string
    aiMotivationType: string
}

interface AISmartSuggestionsEngineProps {
    teamMembers: TeamMember[]
}

export function AISmartSuggestionsEngine({ teamMembers }: AISmartSuggestionsEngineProps) {
    const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([])
    const [analytics, setAnalytics] = useState<SuggestionAnalytics | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [autoSuggestions, setAutoSuggestions] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [aiInsights, setAiInsights] = useState<string[]>([])

    // Generate mock suggestions
    useEffect(() => {
        const generateMockSuggestions = () => {
            const mockSuggestions: SmartSuggestion[] = [
                {
                    id: 'suggestion-1',
                    type: 'break',
                    title: 'Energy Recharge Break',
                    description: 'Ahmed has been working for 2.5 hours. Suggest a 15-minute break to maintain peak performance.',
                    priority: 'high',
                    category: 'wellness',
                    confidence: 85,
                    expectedImpact: 'Prevent burnout and maintain focus',
                    action: 'Schedule 15-minute break',
                    trigger: 'time',
                    status: 'pending',
                    timestamp: new Date(),
                    teamMemberId: '1',
                    teamMemberName: 'Ahmed',
                    aiReasoning: 'Pattern analysis shows productivity drops after 2.5 hours of continuous work',
                    relatedMetrics: ['energy_level', 'focus_score', 'productivity']
                },
                {
                    id: 'suggestion-2',
                    type: 'collaboration',
                    title: 'Cross-Team Knowledge Share',
                    description: 'Nada and Omar have complementary skills. Suggest a knowledge sharing session.',
                    priority: 'medium',
                    category: 'team',
                    confidence: 72,
                    expectedImpact: 'Improve team cohesion and skill development',
                    action: 'Schedule 30-minute knowledge share',
                    trigger: 'behavior',
                    status: 'pending',
                    timestamp: new Date(),
                    teamMemberId: '2',
                    teamMemberName: 'Nada',
                    aiReasoning: 'Skill gap analysis reveals complementary expertise between team members',
                    relatedMetrics: ['collaboration_score', 'skill_gaps', 'team_cohesion']
                },
                {
                    id: 'suggestion-3',
                    type: 'optimization',
                    title: 'Process Automation Opportunity',
                    description: 'Repetitive tasks detected. Suggest automation tools to save 3 hours/week.',
                    priority: 'critical',
                    category: 'process',
                    confidence: 91,
                    expectedImpact: 'Save 3 hours/week per team member',
                    action: 'Implement automation workflow',
                    trigger: 'performance',
                    status: 'pending',
                    timestamp: new Date(),
                    aiReasoning: 'Task analysis reveals 40% of time spent on repetitive activities',
                    relatedMetrics: ['time_spent', 'task_efficiency', 'automation_potential']
                },
                {
                    id: 'suggestion-4',
                    type: 'learning',
                    title: 'Skill Development Session',
                    description: 'Team shows interest in advanced analytics. Recommend specialized training.',
                    priority: 'medium',
                    category: 'growth',
                    confidence: 68,
                    expectedImpact: 'Improve data-driven decision making',
                    action: 'Schedule analytics workshop',
                    trigger: 'behavior',
                    status: 'pending',
                    timestamp: new Date(),
                    aiReasoning: 'Learning pattern analysis shows growing interest in data analytics',
                    relatedMetrics: ['learning_interest', 'skill_growth', 'career_development']
                },
                {
                    id: 'suggestion-5',
                    type: 'meeting',
                    title: 'Strategic Planning Session',
                    description: 'Optimal time for quarterly planning. Team energy and availability align.',
                    priority: 'high',
                    category: 'productivity',
                    confidence: 78,
                    expectedImpact: 'Align team goals and improve execution',
                    action: 'Schedule 2-hour planning session',
                    trigger: 'schedule',
                    status: 'pending',
                    timestamp: new Date(),
                    aiReasoning: 'Calendar analysis shows optimal team availability and energy levels',
                    relatedMetrics: ['team_availability', 'energy_levels', 'strategic_alignment']
                }
            ]

            setSuggestions(mockSuggestions)
        }

        generateMockSuggestions()
    }, [])

    // Generate analytics
    useEffect(() => {
        if (suggestions.length > 0) {
            const totalSuggestions = suggestions.length
            const acceptedSuggestions = suggestions.filter(s => s.status === 'accepted').length
            const averageConfidence = suggestions.reduce((sum, s) => sum + s.confidence, 0) / totalSuggestions
            const impactScore = (acceptedSuggestions / totalSuggestions) * 100

            const categoryCounts = suggestions.reduce((acc, suggestion) => {
                acc[suggestion.category] = (acc[suggestion.category] || 0) + 1
                return acc
            }, {} as Record<string, number>)

            const topCategories = Object.entries(categoryCounts)
                .map(([category, count]) => ({ category, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 3)

            const analytics: SuggestionAnalytics = {
                totalSuggestions,
                acceptedSuggestions,
                averageConfidence,
                impactScore,
                topCategories,
                improvementAreas: [
                    'Increase suggestion acceptance rate',
                    'Improve confidence scoring accuracy',
                    'Optimize trigger timing'
                ],
                aiInsights: [
                    'Team responds best to wellness suggestions',
                    'Process optimization has highest impact',
                    'Morning suggestions have 40% higher acceptance'
                ]
            }

            setAnalytics(analytics)
        }
    }, [suggestions])

    const acceptSuggestion = (suggestionId: string) => {
        setSuggestions(prev => prev.map(s =>
            s.id === suggestionId ? { ...s, status: 'accepted' } : s
        ))
    }

    const rejectSuggestion = (suggestionId: string) => {
        setSuggestions(prev => prev.map(s =>
            s.id === suggestionId ? { ...s, status: 'rejected' } : s
        ))
    }

    const completeSuggestion = (suggestionId: string) => {
        setSuggestions(prev => prev.map(s =>
            s.id === suggestionId ? { ...s, status: 'completed' } : s
        ))
    }

    const analyzeSuggestionPatterns = async () => {
        setIsAnalyzing(true)
        try {
            // Simulate AI analysis
            await new Promise(resolve => setTimeout(resolve, 2000))

            const insights = [
                "Team accepts 73% of wellness-related suggestions",
                "Process optimization suggestions have 2.3x higher impact",
                "Morning suggestions (9-11 AM) have 40% higher acceptance",
                "Personalized suggestions show 60% better engagement",
                "Cross-team collaboration suggestions improve team cohesion by 25%"
            ]

            setAiInsights(insights)
        } catch (error) {
            console.error('Analysis failed:', error)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'bg-red-500'
            case 'high': return 'bg-orange-500'
            case 'medium': return 'bg-yellow-500'
            case 'low': return 'bg-green-500'
            default: return 'bg-gray-500'
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'productivity': return 'text-blue-400'
            case 'wellness': return 'text-green-400'
            case 'growth': return 'text-purple-400'
            case 'team': return 'text-pink-400'
            case 'process': return 'text-yellow-400'
            default: return 'text-gray-400'
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'task': return <Target className="h-4 w-4" />
            case 'meeting': return <Calendar className="h-4 w-4" />
            case 'break': return <Clock className="h-4 w-4" />
            case 'learning': return <Brain className="h-4 w-4" />
            case 'collaboration': return <Users className="h-4 w-4" />
            case 'optimization': return <Zap className="h-4 w-4" />
            default: return <Lightbulb className="h-4 w-4" />
        }
    }

    const filteredSuggestions = selectedCategory === 'all'
        ? suggestions
        : suggestions.filter(s => s.category === selectedCategory)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">AI Smart Suggestions Engine</h2>
                    <p className="text-gray-400">Intelligent recommendations and automated triggers</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={autoSuggestions}
                            onCheckedChange={setAutoSuggestions}
                        />
                        <span className="text-sm text-gray-400">Auto-suggestions</span>
                    </div>
                    <Button
                        onClick={analyzeSuggestionPatterns}
                        disabled={isAnalyzing}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                        <Brain className="h-4 w-4 mr-2" />
                        {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
                    </Button>
                </div>
            </div>

            {/* AI Insights */}
            {aiInsights.length > 0 && (
                <Alert className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30">
                    <Lightbulb className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="text-blue-200">
                        <div className="space-y-2">
                            <p className="font-medium">AI Suggestion Optimization Insights:</p>
                            <ul className="space-y-1 text-sm">
                                {aiInsights.map((insight, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                        <span className="text-blue-400">•</span>
                                        <span>{insight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AlertDescription>
                </Alert>
            )}

            {/* Analytics */}
            {analytics && (
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <BarChart3 className="h-5 w-5 text-green-400" />
                            <span className="text-white">Suggestion Analytics</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Total Suggestions</p>
                                        <p className="text-2xl font-bold text-white">{analytics.totalSuggestions}</p>
                                    </div>
                                    <Lightbulb className="h-8 w-8 text-blue-400" />
                                </div>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Accepted</p>
                                        <p className="text-2xl font-bold text-white">{analytics.acceptedSuggestions}</p>
                                    </div>
                                    <CheckCircle className="h-8 w-8 text-green-400" />
                                </div>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Avg Confidence</p>
                                        <p className="text-2xl font-bold text-white">{analytics.averageConfidence.toFixed(0)}%</p>
                                    </div>
                                    <TrendingUp className="h-8 w-8 text-purple-400" />
                                </div>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Impact Score</p>
                                        <p className="text-2xl font-bold text-white">{analytics.impactScore.toFixed(0)}%</p>
                                    </div>
                                    <Award className="h-8 w-8 text-yellow-400" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium text-white mb-3">Top Categories</h4>
                                <div className="space-y-2">
                                    {analytics.topCategories.map((cat, index) => (
                                        <div key={index} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-300 capitalize">{cat.category}</span>
                                            <Badge variant="outline" className="text-white">
                                                {cat.count} suggestions
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium text-white mb-3">AI Insights</h4>
                                <ul className="space-y-2">
                                    {analytics.aiInsights.map((insight, index) => (
                                        <li key={index} className="flex items-start space-x-2 text-sm">
                                            <Star className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-300">{insight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Suggestions */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Brain className="h-5 w-5 text-purple-400" />
                            <span className="text-white">Smart Suggestions</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="bg-gray-800 text-white text-sm rounded px-2 py-1 border border-gray-600"
                                aria-label="Filter suggestions by category"
                            >
                                <option value="all">All Categories</option>
                                <option value="productivity">Productivity</option>
                                <option value="wellness">Wellness</option>
                                <option value="growth">Growth</option>
                                <option value="team">Team</option>
                                <option value="process">Process</option>
                            </select>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredSuggestions.map(suggestion => (
                            <div key={suggestion.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 rounded-lg bg-purple-500/20">
                                            {getTypeIcon(suggestion.type)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h4 className="font-medium text-white">{suggestion.title}</h4>
                                                <Badge className={`${getPriorityColor(suggestion.priority)} text-white`}>
                                                    {suggestion.priority}
                                                </Badge>
                                                <Badge variant="outline" className={getCategoryColor(suggestion.category)}>
                                                    {suggestion.category}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-300 mb-2">{suggestion.description}</p>
                                            {suggestion.teamMemberName && (
                                                <p className="text-xs text-gray-400">For: {suggestion.teamMemberName}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="text-right">
                                            <p className="text-sm text-gray-400">Confidence</p>
                                            <p className="text-lg font-bold text-white">{suggestion.confidence}%</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Expected Impact</p>
                                            <p className="text-sm text-blue-300">{suggestion.expectedImpact}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">AI Reasoning</p>
                                            <p className="text-sm text-purple-300 italic">&quot;{suggestion.aiReasoning}&quot;</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                size="sm"
                                                onClick={() => acceptSuggestion(suggestion.id)}
                                                disabled={suggestion.status !== 'pending'}
                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Accept
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => rejectSuggestion(suggestion.id)}
                                                disabled={suggestion.status !== 'pending'}
                                                className="border-red-500 text-red-400 hover:bg-red-500/20"
                                            >
                                                <XCircle className="h-4 w-4 mr-1" />
                                                Reject
                                            </Button>
                                            {suggestion.status === 'accepted' && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => completeSuggestion(suggestion.id)}
                                                    className="border-blue-500 text-blue-400 hover:bg-blue-500/20"
                                                >
                                                    Complete
                                                </Button>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">
                                                {suggestion.timestamp.toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>

                                    <Progress value={suggestion.confidence} className="h-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 