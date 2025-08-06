"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
    Heart,
    Brain,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Activity,
    Clock,
    Smile,
    Meh,
    Frown,
    Zap,
    RefreshCw
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

interface MoodData {
    id: string
    memberId: string
    memberName: string
    date: Date
    mood: '😎' | '😐' | '😔'
    stressLevel: number
    energyLevel: number
    productivity: number
    notes: string
    aiAnalysis: string
    recommendations: string[]
}

interface StressAlert {
    id: string
    memberId: string
    memberName: string
    type: 'stress' | 'burnout' | 'energy' | 'productivity'
    severity: 'low' | 'medium' | 'high' | 'critical'
    message: string
    detectedAt: Date
    status: 'active' | 'acknowledged' | 'resolved'
    aiRecommendation: string
}

interface AIMoodStressTrackerProps {
    teamMembers: TeamMember[]
}

export function AIMoodStressTracker({ teamMembers }: AIMoodStressTrackerProps) {
    const [moodData, setMoodData] = useState<MoodData[]>([])
    const [stressAlerts, setStressAlerts] = useState<StressAlert[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [selectedMember, setSelectedMember] = useState<string | null>(null)
    const [showMoodPrompt, setShowMoodPrompt] = useState(false)

    // Mock mood data
    const mockMoodData: MoodData[] = [
        {
            id: "1",
            memberId: "1",
            memberName: "Ahmed",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            mood: "😐",
            stressLevel: 65,
            energyLevel: 45,
            productivity: 78,
            notes: "Feeling overwhelmed with current workload",
            aiAnalysis: "Stress level increased 48% this week. Signs of burnout detected.",
            recommendations: ["Reduce task load", "Schedule breaks", "Delegate more tasks"]
        },
        {
            id: "2",
            memberId: "2",
            memberName: "Nada",
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            mood: "😎",
            stressLevel: 25,
            energyLevel: 85,
            productivity: 92,
            notes: "Great week! Completed all tasks ahead of schedule",
            aiAnalysis: "Excellent performance. Energy and productivity are optimal.",
            recommendations: ["Maintain current pace", "Share best practices", "Consider mentoring"]
        },
        {
            id: "3",
            memberId: "3",
            memberName: "Omar",
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            mood: "😔",
            stressLevel: 80,
            energyLevel: 30,
            productivity: 45,
            notes: "Struggling with deadlines and team communication",
            aiAnalysis: "Critical stress levels. Immediate intervention recommended.",
            recommendations: ["Urgent check-in needed", "Reduce workload", "Provide support"]
        }
    ]

    // Mock stress alerts
    const mockStressAlerts: StressAlert[] = [
        {
            id: "1",
            memberId: "1",
            memberName: "Ahmed",
            type: "stress",
            severity: "high",
            message: "Ahmed's energy dropped 48% this week — suggest check-in",
            detectedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            status: "active",
            aiRecommendation: "Schedule a one-on-one meeting to discuss workload and provide support"
        },
        {
            id: "2",
            memberId: "3",
            memberName: "Omar",
            type: "burnout",
            severity: "critical",
            message: "Omar showing signs of burnout — immediate action required",
            detectedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            status: "active",
            aiRecommendation: "Immediate workload reduction and stress management support needed"
        }
    ]

    useEffect(() => {
        setMoodData(mockMoodData)
        setStressAlerts(mockStressAlerts)
    }, [])

    const analyzeMoodAndStress = async () => {
        setIsAnalyzing(true)

        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 3000))

        // In real implementation, this would call OpenAI API for mood analysis
        const newAlerts = await performAIAnalysis()
        setStressAlerts(prev => [...prev, ...newAlerts])
        setIsAnalyzing(false)
    }

    const performAIAnalysis = async (): Promise<StressAlert[]> => {
        // Mock AI analysis - in real implementation, this would use OpenAI
        const newAlerts: StressAlert[] = []

        moodData.forEach(mood => {
            if (mood.stressLevel > 70) {
                newAlerts.push({
                    id: `alert-${Date.now()}-${mood.memberId}`,
                    memberId: mood.memberId,
                    memberName: mood.memberName,
                    type: mood.stressLevel > 85 ? 'burnout' : 'stress',
                    severity: mood.stressLevel > 85 ? 'critical' : 'high',
                    message: `${mood.memberName}'s stress level is ${mood.stressLevel}% - intervention needed`,
                    detectedAt: new Date(),
                    status: 'active',
                    aiRecommendation: generateAIRecommendation(mood)
                })
            }
        })

        return newAlerts
    }

    const generateAIRecommendation = (mood: MoodData): string => {
        if (mood.stressLevel > 80) {
            return "Immediate workload reduction and stress management support needed"
        } else if (mood.stressLevel > 60) {
            return "Schedule regular check-ins and provide additional support"
        } else if (mood.stressLevel > 40) {
            return "Monitor closely and offer flexible work arrangements"
        } else {
            return "Maintain current support level and encourage work-life balance"
        }
    }

    const submitMoodCheck = async (memberId: string, mood: '😎' | '😐' | '😔', notes: string) => {
        const member = teamMembers.find(m => m.id === memberId)
        if (!member) return

        const stressLevel = mood === '😎' ? 20 : mood === '😐' ? 50 : 80
        const energyLevel = mood === '😎' ? 90 : mood === '😐' ? 60 : 30
        const productivity = mood === '😎' ? 95 : mood === '😐' ? 75 : 50

        const newMoodData: MoodData = {
            id: `mood-${Date.now()}`,
            memberId,
            memberName: member.name,
            date: new Date(),
            mood,
            stressLevel,
            energyLevel,
            productivity,
            notes,
            aiAnalysis: generateAIAnalysis(mood, stressLevel),
            recommendations: generateRecommendations(mood, stressLevel)
        }

        setMoodData(prev => [newMoodData, ...prev])
        setShowMoodPrompt(false)
        setSelectedMember(null)
    }

    const generateAIAnalysis = (mood: string, stressLevel: number): string => {
        if (mood === '😎') {
            return "Excellent mood and energy levels. Optimal performance detected."
        } else if (mood === '😐') {
            return "Neutral mood with moderate stress. Monitor for changes."
        } else {
            return `Stress level is ${stressLevel}%. Immediate support recommended.`
        }
    }

    const generateRecommendations = (mood: string, stressLevel: number): string[] => {
        if (mood === '😎') {
            return ["Maintain current pace", "Share positive energy", "Consider mentoring others"]
        } else if (mood === '😐') {
            return ["Take short breaks", "Communicate concerns", "Seek support if needed"]
        } else {
            return ["Immediate check-in needed", "Reduce workload", "Provide stress support"]
        }
    }

    const getMoodColor = (mood: string) => {
        switch (mood) {
            case '😎': return 'text-green-500'
            case '😐': return 'text-yellow-500'
            case '😔': return 'text-red-500'
            default: return 'text-gray-500'
        }
    }

    const getStressColor = (level: number) => {
        if (level > 80) return 'text-red-500'
        if (level > 60) return 'text-orange-500'
        if (level > 40) return 'text-yellow-500'
        return 'text-green-500'
    }

    const acknowledgeAlert = (alertId: string) => {
        setStressAlerts(prev => prev.map(alert =>
            alert.id === alertId
                ? { ...alert, status: 'acknowledged' as const }
                : alert
        ))
    }

    const resolveAlert = (alertId: string) => {
        setStressAlerts(prev => prev.map(alert =>
            alert.id === alertId
                ? { ...alert, status: 'resolved' as const }
                : alert
        ))
    }

    const activeAlerts = stressAlerts.filter(alert => alert.status === 'active')
    const averageStressLevel = moodData.length > 0
        ? moodData.reduce((sum, mood) => sum + mood.stressLevel, 0) / moodData.length
        : 0

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Heart className="h-5 w-5" />
                        <span>AI Mood & Stress Tracker</span>
                    </div>
                    <Button
                        onClick={analyzeMoodAndStress}
                        disabled={isAnalyzing}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        {isAnalyzing ? (
                            <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Brain className="h-4 w-4 mr-2" />
                                Analyze
                            </>
                        )}
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-purple-400">Avg Stress Level</p>
                                <p className={`text-2xl font-bold ${getStressColor(averageStressLevel)}`}>
                                    {averageStressLevel.toFixed(0)}%
                                </p>
                            </div>
                            <Activity className="h-8 w-8 text-purple-500" />
                        </div>
                    </div>
                    <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-red-400">Active Alerts</p>
                                <p className="text-2xl font-bold text-red-500">{activeAlerts.length}</p>
                            </div>
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                        </div>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-400">Team Morale</p>
                                <p className="text-2xl font-bold text-green-500">
                                    {moodData.filter(m => m.mood === '😎').length}/{moodData.length}
                                </p>
                            </div>
                            <Smile className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-400">AI Accuracy</p>
                                <p className="text-2xl font-bold text-blue-500">91%</p>
                            </div>
                            <Brain className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                </div>

                {/* Mood Check Prompt */}
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-white mb-3">Weekly Mood Check</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {teamMembers.map(member => (
                            <div key={member.id} className="bg-gray-800/50 p-3 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-medium">{member.name}</span>
                                    <Badge variant="outline" className="text-xs">
                                        {member.role}
                                    </Badge>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => submitMoodCheck(member.id, '😎', 'Feeling great!')}
                                        className="text-green-500 border-green-500 hover:bg-green-500/10"
                                    >
                                        😎
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => submitMoodCheck(member.id, '😐', 'Okay')}
                                        className="text-yellow-500 border-yellow-500 hover:bg-yellow-500/10"
                                    >
                                        😐
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => submitMoodCheck(member.id, '😔', 'Struggling')}
                                        className="text-red-500 border-red-500 hover:bg-red-500/10"
                                    >
                                        😔
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stress Alerts */}
                {activeAlerts.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Stress Alerts</h3>
                        {activeAlerts.map((alert) => (
                            <Alert key={alert.id} className="border-red-500/20 bg-red-500/5">
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                <AlertDescription className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-white">{alert.memberName}</p>
                                            <p className="text-sm text-gray-400">{alert.message}</p>
                                        </div>
                                        <Badge className={`${alert.severity === 'critical' ? 'bg-red-500 text-white' :
                                                alert.severity === 'high' ? 'bg-orange-500 text-white' :
                                                    'bg-yellow-500 text-black'
                                            }`}>
                                            {alert.severity}
                                        </Badge>
                                    </div>

                                    <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                                        <p className="text-sm text-blue-400 font-medium">AI Recommendation:</p>
                                        <p className="text-sm text-white">{alert.aiRecommendation}</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            onClick={() => acknowledgeAlert(alert.id)}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            Acknowledge
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => resolveAlert(alert.id)}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            Resolve
                                        </Button>
                                    </div>
                                </AlertDescription>
                            </Alert>
                        ))}
                    </div>
                )}

                {/* Recent Mood Data */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Recent Mood Checks</h3>
                    <div className="space-y-3">
                        {moodData.slice(0, 5).map((mood) => (
                            <div key={mood.id} className="bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <span className={`text-2xl ${getMoodColor(mood.mood)}`}>
                                            {mood.mood}
                                        </span>
                                        <div>
                                            <p className="font-medium text-white">{mood.memberName}</p>
                                            <p className="text-sm text-gray-400">
                                                {mood.date.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-medium ${getStressColor(mood.stressLevel)}`}>
                                            Stress: {mood.stressLevel}%
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Energy: {mood.energyLevel}%
                                        </p>
                                    </div>
                                </div>

                                {mood.notes && (
                                    <p className="text-sm text-gray-300 mb-3">&quot;{mood.notes}&quot;</p>
                                )}

                                <div className="space-y-2">
                                    <p className="text-sm text-gray-400">AI Analysis:</p>
                                    <p className="text-sm text-white">{mood.aiAnalysis}</p>
                                </div>

                                <div className="mt-3">
                                    <p className="text-sm text-gray-400 mb-2">Recommendations:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {mood.recommendations.map((rec, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {rec}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Mood Tracking</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Weekly mood prompts</li>
                            <li>• Stress level analysis</li>
                            <li>• Energy level tracking</li>
                            <li>• Productivity correlation</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">AI Capabilities</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Pattern recognition</li>
                            <li>• Burnout prediction</li>
                            <li>• Personalized recommendations</li>
                            <li>• Early intervention alerts</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 