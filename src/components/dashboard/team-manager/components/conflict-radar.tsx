"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { 
    AlertTriangle, 
    Radar, 
    Shield, 
    MessageSquare, 
    Clock, 
    Users,
    TrendingUp,
    TrendingDown,
    Activity,
    RefreshCw,
    Brain
} from "lucide-react"

interface TeamMember {
    id: string
    name: string
    role: string
    status: 'active' | 'away' | 'offline' | 'focus'
    avatar: string
    email: string
    phone: string
    joinDate: Date
    aiMotivationType: string
    strengths: string[]
    currentStressLevel: number
    lastTasks: string[]
    openTasks: number
    completedTasks: number
    campaignsInvolved: number
    meetingAttendance: number
    responseSpeed: number
    deadlineCompliance: number
    salary: number
    toolCost: number
    revenueImpact: number
    roi: number
    mood: 'positive' | 'neutral' | 'negative'
    burnoutRisk: number
    focusMode: boolean
    lastActive: Date
    timeSpent: number
    skills: string[]
    desiredSkills: string[]
    mentorId?: string
    menteeIds: string[]
    permissions: string[]
    motivationDrivers: string[]
}

interface ConflictData {
    id: string
    member1Id: string
    member2Id: string
    member1Name: string
    member2Name: string
    conflictType: 'communication' | 'workload' | 'deadline' | 'responsibility'
    severity: 'low' | 'medium' | 'high' | 'critical'
    detectedAt: Date
    lastInteraction: Date
    messageCount: number
    avgResponseTime: number
    toneAnalysis: {
        negative: number
        neutral: number
        positive: number
    }
    status: 'active' | 'resolved' | 'escalated'
    description: string
    aiRecommendation: string
}

interface ConflictRadarProps {
    teamMembers: TeamMember[]
}

export function ConflictRadar({ teamMembers }: ConflictRadarProps) {
    const [conflicts, setConflicts] = useState<ConflictData[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [lastAnalysis, setLastAnalysis] = useState<Date | null>(null)

    // Mock conflict data - in real implementation, this would come from Supabase
    const mockConflicts: ConflictData[] = [
        {
            id: "1",
            member1Id: "1",
            member2Id: "2",
            member1Name: "Omar",
            member2Name: "Nada",
            conflictType: "communication",
            severity: "medium",
            detectedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            lastInteraction: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            messageCount: 12,
            avgResponseTime: 4.5,
            toneAnalysis: {
                negative: 65,
                neutral: 25,
                positive: 10
            },
            status: "active",
            description: "Tension detected between Omar and Nada — no replies in 3 days",
            aiRecommendation: "Schedule a mediated conversation to address communication gaps"
        },
        {
            id: "2",
            member1Id: "3",
            member2Id: "4",
            member1Name: "Ahmed",
            member2Name: "Farouk",
            conflictType: "workload",
            severity: "high",
            detectedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            lastInteraction: new Date(Date.now() - 6 * 60 * 60 * 1000),
            messageCount: 8,
            avgResponseTime: 2.1,
            toneAnalysis: {
                negative: 45,
                neutral: 40,
                positive: 15
            },
            status: "active",
            description: "Workload distribution conflict - Ahmed feels overburdened",
            aiRecommendation: "Redistribute tasks and set clear expectations"
        }
    ]

    useEffect(() => {
        setConflicts(mockConflicts)
        setLastAnalysis(new Date())
    }, [])

    const analyzeConflicts = async () => {
        setIsAnalyzing(true)
        
        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // In real implementation, this would call OpenAI API for tone analysis
        const newConflicts = await performAIAnalysis()
        setConflicts(newConflicts)
        setLastAnalysis(new Date())
        setIsAnalyzing(false)
    }

    const performAIAnalysis = async (): Promise<ConflictData[]> => {
        // Mock AI analysis - in real implementation, this would use OpenAI
        return mockConflicts.map(conflict => ({
            ...conflict,
            aiRecommendation: generateAIRecommendation(conflict)
        }))
    }

    const generateAIRecommendation = (conflict: ConflictData): string => {
        const recommendations = [
            "Schedule a mediated conversation to address communication gaps",
            "Redistribute tasks and set clear expectations",
            "Implement regular check-ins to improve collaboration",
            "Create clear role boundaries and responsibilities",
            "Facilitate team building activities to improve relationships"
        ]
        return recommendations[Math.floor(Math.random() * recommendations.length)]
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical': return 'bg-red-500 text-white'
            case 'high': return 'bg-orange-500 text-white'
            case 'medium': return 'bg-yellow-500 text-black'
            case 'low': return 'bg-green-500 text-white'
            default: return 'bg-gray-500 text-white'
        }
    }

    const getConflictTypeIcon = (type: string) => {
        switch (type) {
            case 'communication': return <MessageSquare className="h-4 w-4" />
            case 'workload': return <Activity className="h-4 w-4" />
            case 'deadline': return <Clock className="h-4 w-4" />
            case 'responsibility': return <Users className="h-4 w-4" />
            default: return <AlertTriangle className="h-4 w-4" />
        }
    }

    const resolveConflict = async (conflictId: string) => {
        setConflicts(prev => prev.map(conflict => 
            conflict.id === conflictId 
                ? { ...conflict, status: 'resolved' as const }
                : conflict
        ))
    }

    const escalateConflict = async (conflictId: string) => {
        setConflicts(prev => prev.map(conflict => 
            conflict.id === conflictId 
                ? { ...conflict, status: 'escalated' as const }
                : conflict
        ))
    }

    const activeConflicts = conflicts.filter(c => c.status === 'active')
    const resolvedConflicts = conflicts.filter(c => c.status === 'resolved')

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Radar className="h-5 w-5" />
                        <span>Conflict Radar</span>
                    </div>
                    <Button 
                        onClick={analyzeConflicts} 
                        disabled={isAnalyzing}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {isAnalyzing ? (
                            <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Radar className="h-4 w-4 mr-2" />
                                Analyze
                            </>
                        )}
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-red-400">Active Conflicts</p>
                                <p className="text-2xl font-bold text-red-500">{activeConflicts.length}</p>
                            </div>
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                        </div>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-400">Resolved</p>
                                <p className="text-2xl font-bold text-green-500">{resolvedConflicts.length}</p>
                            </div>
                            <Shield className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-400">Avg Response</p>
                                <p className="text-2xl font-bold text-blue-500">2.3h</p>
                            </div>
                            <Clock className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-purple-400">AI Accuracy</p>
                                <p className="text-2xl font-bold text-purple-500">94%</p>
                            </div>
                            <Brain className="h-8 w-8 text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* Last Analysis */}
                {lastAnalysis && (
                    <div className="text-sm text-gray-500">
                        Last analysis: {lastAnalysis.toLocaleString()}
                    </div>
                )}

                {/* Active Conflicts */}
                {activeConflicts.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Active Conflicts</h3>
                        {activeConflicts.map((conflict) => (
                            <Alert key={conflict.id} className="border-red-500/20 bg-red-500/5">
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                <AlertDescription className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-white">
                                                {conflict.member1Name} & {conflict.member2Name}
                                            </p>
                                            <p className="text-sm text-gray-400">{conflict.description}</p>
                                        </div>
                                        <Badge className={getSeverityColor(conflict.severity)}>
                                            {conflict.severity}
                                        </Badge>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-400">Response Time</p>
                                            <p className="text-white">{conflict.avgResponseTime}h avg</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Messages</p>
                                            <p className="text-white">{conflict.messageCount} exchanged</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-400">Tone Analysis:</p>
                                        <div className="flex space-x-2">
                                            <div className="flex-1">
                                                <div className="flex justify-between text-xs">
                                                    <span>Negative</span>
                                                    <span>{conflict.toneAnalysis.negative}%</span>
                                                </div>
                                                <Progress value={conflict.toneAnalysis.negative} className="h-1" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between text-xs">
                                                    <span>Neutral</span>
                                                    <span>{conflict.toneAnalysis.neutral}%</span>
                                                </div>
                                                <Progress value={conflict.toneAnalysis.neutral} className="h-1" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between text-xs">
                                                    <span>Positive</span>
                                                    <span>{conflict.toneAnalysis.positive}%</span>
                                                </div>
                                                <Progress value={conflict.toneAnalysis.positive} className="h-1" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                                        <p className="text-sm text-blue-400 font-medium">AI Recommendation:</p>
                                        <p className="text-sm text-white">{conflict.aiRecommendation}</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <Button 
                                            size="sm" 
                                            onClick={() => resolveConflict(conflict.id)}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            Resolve
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant="outline"
                                            onClick={() => escalateConflict(conflict.id)}
                                            className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
                                        >
                                            Escalate
                                        </Button>
                                    </div>
                                </AlertDescription>
                            </Alert>
                        ))}
                    </div>
                )}

                {/* No Conflicts State */}
                {activeConflicts.length === 0 && (
                    <div className="text-center py-8">
                        <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">No Active Conflicts</h3>
                        <p className="text-gray-400">Team communication is healthy and collaborative</p>
                    </div>
                )}

                {/* AI Analysis Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Real-time Monitoring</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Message tone analysis</li>
                            <li>• Response time tracking</li>
                            <li>• Communication patterns</li>
                            <li>• Conflict prediction</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">AI Capabilities</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Sentiment analysis</li>
                            <li>• Pattern recognition</li>
                            <li>• Conflict prediction</li>
                            <li>• Resolution suggestions</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 