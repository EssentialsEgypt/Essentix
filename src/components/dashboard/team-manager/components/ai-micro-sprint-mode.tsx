"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import {
    Clock, Brain, Zap, Target, CheckCircle, XCircle,
    TrendingUp, AlertTriangle, Star, Timer, Play, Pause,
    RotateCcw, Award, Lightbulb, Users, BarChart3
} from "lucide-react"

interface MicroSprint {
    id: string
    title: string
    description: string
    duration: number // in minutes
    status: 'active' | 'completed' | 'paused' | 'planned'
    priority: 'urgent' | 'high' | 'medium' | 'low'
    aiMotivation: string
    expectedOutcome: string
    actualOutcome?: string
    startTime?: Date
    endTime?: Date
    focusScore: number
    interruptions: number
    energyLevel: number
    teamMemberId: string
    teamMemberName: string
}

interface SprintAnalytics {
    totalSprints: number
    completedSprints: number
    averageFocusScore: number
    totalTimeSpent: number
    productivityGain: number
    aiRecommendations: string[]
    topPerformingSprints: MicroSprint[]
    improvementAreas: string[]
}

interface TeamMember {
    id: string
    name: string
    role: string
    currentSprint?: MicroSprint
    sprintHistory: MicroSprint[]
    aiMotivationType: string
    focusPattern: string
    energyLevel: number
    preferredSprintDuration: number
}

interface AIMicroSprintModeProps {
    teamMembers: TeamMember[]
}

export function AIMicroSprintMode({ teamMembers }: AIMicroSprintModeProps) {
    const [activeSprints, setActiveSprints] = useState<MicroSprint[]>([])
    const [sprintHistory, setSprintHistory] = useState<MicroSprint[]>([])
    const [analytics, setAnalytics] = useState<SprintAnalytics | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [selectedMember, setSelectedMember] = useState<string | null>(null)
    const [aiInsights, setAiInsights] = useState<string[]>([])

    // Generate mock sprint data
    useEffect(() => {
        const generateMockSprints = () => {
            const sprints: MicroSprint[] = []
            const durations = [25, 45, 60, 90] // Pomodoro variations

            teamMembers.forEach(member => {
                const memberSprints = Array.from({ length: 5 }, (_, i) => ({
                    id: `sprint-${member.id}-${i}`,
                    title: `Sprint ${i + 1}`,
                    description: `Focused work session for ${member.name}`,
                    duration: durations[Math.floor(Math.random() * durations.length)],
                    status: ['active', 'completed', 'planned'][Math.floor(Math.random() * 3)] as any,
                    priority: ['urgent', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as any,
                    aiMotivation: [
                        "Your focus is creating momentum. Keep pushing!",
                        "This sprint will unlock new opportunities.",
                        "Your energy is contagious. Team is watching!",
                        "Small wins compound into big results.",
                        "You're building something amazing. Stay focused!"
                    ][Math.floor(Math.random() * 5)],
                    expectedOutcome: [
                        "Complete task analysis",
                        "Draft initial concepts",
                        "Review and refine",
                        "Finalize deliverables",
                        "Prepare presentation"
                    ][Math.floor(Math.random() * 5)],
                    focusScore: Math.floor(Math.random() * 40) + 60,
                    interruptions: Math.floor(Math.random() * 3),
                    energyLevel: Math.floor(Math.random() * 40) + 60,
                    teamMemberId: member.id,
                    teamMemberName: member.name,
                    startTime: new Date(Date.now() - Math.random() * 86400000),
                    endTime: new Date(Date.now() - Math.random() * 43200000)
                }))

                sprints.push(...memberSprints)
            })

            setActiveSprints(sprints.filter(s => s.status === 'active'))
            setSprintHistory(sprints.filter(s => s.status === 'completed'))
        }

        generateMockSprints()
    }, [teamMembers])

    // Generate analytics
    useEffect(() => {
        if (sprintHistory.length > 0) {
            const totalSprints = sprintHistory.length
            const completedSprints = sprintHistory.filter(s => s.status === 'completed').length
            const averageFocusScore = sprintHistory.reduce((sum, s) => sum + s.focusScore, 0) / totalSprints
            const totalTimeSpent = sprintHistory.reduce((sum, s) => sum + s.duration, 0)
            const productivityGain = ((averageFocusScore - 50) / 50) * 100

            const analytics: SprintAnalytics = {
                totalSprints,
                completedSprints,
                averageFocusScore,
                totalTimeSpent,
                productivityGain,
                aiRecommendations: [
                    "Ahmed performs best with 45-minute sprints",
                    "Nada's focus peaks in morning sessions",
                    "Team productivity increases 23% with micro-breaks",
                    "Omar needs more frequent energy check-ins"
                ],
                topPerformingSprints: sprintHistory
                    .sort((a, b) => b.focusScore - a.focusScore)
                    .slice(0, 3),
                improvementAreas: [
                    "Reduce interruptions during deep work",
                    "Implement energy management breaks",
                    "Optimize sprint duration per individual"
                ]
            }

            setAnalytics(analytics)
        }
    }, [sprintHistory])

    const startSprint = (memberId: string) => {
        const member = teamMembers.find(m => m.id === memberId)
        if (!member) return

        const newSprint: MicroSprint = {
            id: `sprint-${Date.now()}`,
            title: `Focus Session`,
            description: `AI-optimized sprint for ${member.name}`,
            duration: member.preferredSprintDuration || 45,
            status: 'active',
            priority: 'high',
            aiMotivation: generateAIMotivation(member),
            expectedOutcome: generateExpectedOutcome(member),
            focusScore: 0,
            interruptions: 0,
            energyLevel: member.energyLevel,
            teamMemberId: member.id,
            teamMemberName: member.name,
            startTime: new Date()
        }

        setActiveSprints(prev => [...prev, newSprint])
    }

    const completeSprint = (sprintId: string) => {
        setActiveSprints(prev => prev.filter(s => s.id !== sprintId))
        setSprintHistory(prev => {
            const sprint = activeSprints.find(s => s.id === sprintId)
            if (sprint) {
                return [...prev, { ...sprint, status: 'completed', endTime: new Date() }]
            }
            return prev
        })
    }

    const generateAIMotivation = (member: TeamMember): string => {
        const motivations = [
            "Your unique perspective is driving innovation. Keep pushing boundaries!",
            "The team is inspired by your dedication. Lead by example!",
            "Your energy creates positive ripples. Harness this momentum!",
            "Every focused minute compounds into extraordinary results.",
            "You're building the future. Stay locked in!"
        ]
        return motivations[Math.floor(Math.random() * motivations.length)]
    }

    const generateExpectedOutcome = (member: TeamMember): string => {
        const outcomes = [
            "Breakthrough insights and actionable solutions",
            "Refined strategy with clear next steps",
            "Innovative approach to complex challenges",
            "Streamlined process improvements",
            "Creative solutions that drive results"
        ]
        return outcomes[Math.floor(Math.random() * outcomes.length)]
    }

    const analyzeSprintPatterns = async () => {
        setIsAnalyzing(true)
        try {
            // Simulate AI analysis
            await new Promise(resolve => setTimeout(resolve, 2000))

            const insights = [
                "Ahmed&apos;s productivity peaks between 9-11 AM. Schedule critical sprints then.",
                "Nada shows 40% better focus with 45-minute sessions vs 25-minute.",
                "Team energy drops 15% after lunch. Consider lighter tasks.",
                "Micro-breaks improve focus scores by 23% across the team.",
                "Omar's best sprints happen after physical activity breaks."
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
            case 'urgent': return 'bg-red-500'
            case 'high': return 'bg-orange-500'
            case 'medium': return 'bg-yellow-500'
            case 'low': return 'bg-green-500'
            default: return 'bg-gray-500'
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-400'
            case 'completed': return 'text-blue-400'
            case 'paused': return 'text-yellow-400'
            case 'planned': return 'text-gray-400'
            default: return 'text-gray-400'
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">AI Micro Sprint Mode</h2>
                    <p className="text-gray-400">Intelligent focus sessions with AI motivation</p>
                </div>
                <Button
                    onClick={analyzeSprintPatterns}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                    <Brain className="h-4 w-4 mr-2" />
                    {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
                </Button>
            </div>

            {/* AI Insights */}
            {aiInsights.length > 0 && (
                <Alert className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30">
                    <Lightbulb className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="text-blue-200">
                        <div className="space-y-2">
                            <p className="font-medium">AI Sprint Optimization Insights:</p>
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

            {/* Active Sprints */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Timer className="h-5 w-5 text-blue-400" />
                        <span className="text-white">Active Focus Sessions</span>
                        <Badge variant="outline" className="bg-green-500/20 text-green-400">
                            {activeSprints.length} Active
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {activeSprints.length === 0 ? (
                        <div className="text-center py-8">
                            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-400">No active sprints</p>
                            <p className="text-sm text-gray-500">Start a focused session to boost productivity</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeSprints.map(sprint => (
                                <div key={sprint.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 className="font-medium text-white">{sprint.title}</h4>
                                            <p className="text-sm text-gray-400">{sprint.teamMemberName}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={`${getPriorityColor(sprint.priority)} text-white`}>
                                                {sprint.priority}
                                            </Badge>
                                            <Button
                                                size="sm"
                                                onClick={() => completeSprint(sprint.id)}
                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">AI Motivation</p>
                                            <p className="text-sm text-blue-300 italic">&quot;{sprint.aiMotivation}&quot;</p>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div>
                                                <p className="text-gray-400">Duration</p>
                                                <p className="text-white">{sprint.duration}m</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400">Focus Score</p>
                                                <p className="text-white">{sprint.focusScore}%</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400">Energy</p>
                                                <p className="text-white">{sprint.energyLevel}%</p>
                                            </div>
                                        </div>

                                        <Progress value={sprint.focusScore} className="h-2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Team Member Quick Start */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-purple-400" />
                        <span className="text-white">Quick Sprint Start</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {teamMembers.map(member => (
                            <div key={member.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h4 className="font-medium text-white">{member.name}</h4>
                                        <p className="text-sm text-gray-400">{member.role}</p>
                                    </div>
                                    <div className={`w-3 h-3 rounded-full ${member.energyLevel > 70 ? 'bg-green-500' : member.energyLevel > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                </div>

                                <div className="space-y-2 mb-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Energy Level:</span>
                                        <span className="text-white">{member.energyLevel}%</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Preferred Duration:</span>
                                        <span className="text-white">{member.preferredSprintDuration || 45}m</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Focus Pattern:</span>
                                        <span className="text-white">{member.focusPattern}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => startSprint(member.id)}
                                    disabled={activeSprints.some(s => s.teamMemberId === member.id)}
                                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                                >
                                    <Play className="h-4 w-4 mr-2" />
                                    Start Sprint
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Analytics */}
            {analytics && (
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <BarChart3 className="h-5 w-5 text-green-400" />
                            <span className="text-white">Sprint Analytics</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Total Sprints</p>
                                        <p className="text-2xl font-bold text-white">{analytics.totalSprints}</p>
                                    </div>
                                    <Target className="h-8 w-8 text-blue-400" />
                                </div>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Completed</p>
                                        <p className="text-2xl font-bold text-white">{analytics.completedSprints}</p>
                                    </div>
                                    <CheckCircle className="h-8 w-8 text-green-400" />
                                </div>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Avg Focus Score</p>
                                        <p className="text-2xl font-bold text-white">{analytics.averageFocusScore.toFixed(0)}%</p>
                                    </div>
                                    <TrendingUp className="h-8 w-8 text-purple-400" />
                                </div>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Productivity Gain</p>
                                        <p className="text-2xl font-bold text-white">+{analytics.productivityGain.toFixed(1)}%</p>
                                    </div>
                                    <Zap className="h-8 w-8 text-yellow-400" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium text-white mb-3">AI Recommendations</h4>
                                <ul className="space-y-2">
                                    {analytics.aiRecommendations.map((rec, index) => (
                                        <li key={index} className="flex items-start space-x-2 text-sm">
                                            <Star className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-300">{rec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-white mb-3">Improvement Areas</h4>
                                <ul className="space-y-2">
                                    {analytics.improvementAreas.map((area, index) => (
                                        <li key={index} className="flex items-start space-x-2 text-sm">
                                            <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-300">{area}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
} 