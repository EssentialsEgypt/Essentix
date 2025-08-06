"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Activity, Clock, AlertTriangle, TrendingUp, TrendingDown,
    Users, Calendar, BarChart3, Eye, EyeOff, Zap, Target,
    CheckCircle, XCircle, Plus, Settings, RefreshCw
} from "lucide-react"
import styles from "./attendance-activity-heatmap.module.css"

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

interface AttendanceData {
    memberId: string
    memberName: string
    date: string
    hoursOnline: number
    meetingsAttended: number
    tasksCompleted: number
    engagementScore: number
    status: 'online' | 'offline' | 'away' | 'focus'
}

interface ActivityHeatmapProps {
    teamMembers: TeamMember[]
}

export function AttendanceActivityHeatmap({ teamMembers }: ActivityHeatmapProps) {
    const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [insights, setInsights] = useState<string[]>([])
    const [selectedMember, setSelectedMember] = useState<string | null>(null)
    const [timeRange, setTimeRange] = useState<'week' | 'month'>('week')

    // Generate mock attendance data
    useEffect(() => {
        const generateMockData = () => {
            const data: AttendanceData[] = []
            const days = timeRange === 'week' ? 7 : 30

            teamMembers.forEach(member => {
                for (let i = 0; i < days; i++) {
                    const date = new Date()
                    date.setDate(date.getDate() - i)

                    data.push({
                        memberId: member.id,
                        memberName: member.name,
                        date: date.toISOString().split('T')[0],
                        hoursOnline: Math.floor(Math.random() * 8) + 4,
                        meetingsAttended: Math.floor(Math.random() * 3),
                        tasksCompleted: Math.floor(Math.random() * 5) + 1,
                        engagementScore: Math.floor(Math.random() * 40) + 60,
                        status: ['online', 'offline', 'away', 'focus'][Math.floor(Math.random() * 4)] as any
                    })
                }
            })

            setAttendanceData(data)
        }

        generateMockData()
    }, [teamMembers, timeRange])

    const analyzeAttendance = async () => {
        setIsAnalyzing(true)
        try {
            // Simulate AI analysis
            await new Promise(resolve => setTimeout(resolve, 2000))

            const newInsights = [
                "Ahmed shows consistent 8-hour online patterns - high reliability",
                "Nada's focus mode sessions correlate with 3x task completion",
                "Omar's attendance dropped 20% this week - check workload",
                "Team average engagement: 78% (above target of 70%)",
                "Peak activity hours: 10 AM - 2 PM, 4 PM - 6 PM"
            ]

            setInsights(newInsights)
        } catch (error) {
            console.error('Analysis failed:', error)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'bg-green-500'
            case 'offline': return 'bg-gray-500'
            case 'away': return 'bg-yellow-500'
            case 'focus': return 'bg-blue-500'
            default: return 'bg-gray-500'
        }
    }

    const getEngagementColor = (score: number) => {
        if (score >= 80) return 'text-green-400'
        if (score >= 60) return 'text-yellow-400'
        return 'text-red-400'
    }

    const getMemberData = (memberId: string) => {
        return attendanceData.filter(d => d.memberId === memberId)
    }

    const getAverageEngagement = (memberId: string) => {
        const memberData = getMemberData(memberId)
        if (memberData.length === 0) return 0
        return memberData.reduce((sum, d) => sum + d.engagementScore, 0) / memberData.length
    }

    const getTotalHours = (memberId: string) => {
        const memberData = getMemberData(memberId)
        return memberData.reduce((sum, d) => sum + d.hoursOnline, 0)
    }

    const getEngagementLevelClass = (engagement: number) => {
        const level = Math.round(engagement / 10) * 10
        return styles[`engagementLevel${level}` as keyof typeof styles] || styles.engagementLevel0
    }

    return (
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Activity className="h-5 w-5 text-blue-400" />
                        <span className="text-white">Attendance & Activity Heatmap</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            size="sm"
                            onClick={analyzeAttendance}
                            disabled={isAnalyzing}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                        </Button>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value as 'week' | 'month')}
                            className="bg-gray-800 text-white text-sm rounded px-2 py-1 border border-gray-600"
                            aria-label="Select time range for attendance data"
                        >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Avg Online Hours</p>
                                <p className="text-2xl font-bold text-white">6.8h</p>
                            </div>
                            <Clock className="h-8 w-8 text-blue-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Engagement Score</p>
                                <p className="text-2xl font-bold text-white">78%</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Active Members</p>
                                <p className="text-2xl font-bold text-white">3/4</p>
                            </div>
                            <Users className="h-8 w-8 text-yellow-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Focus Sessions</p>
                                <p className="text-2xl font-bold text-white">12</p>
                            </div>
                            <Target className="h-8 w-8 text-purple-400" />
                        </div>
                    </div>
                </div>

                {/* AI Insights */}
                {insights.length > 0 && (
                    <Alert className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30">
                        <BarChart3 className="h-4 w-4 text-blue-400" />
                        <AlertDescription className="text-blue-200">
                            <div className="space-y-2">
                                <p className="font-medium">AI Attendance Insights:</p>
                                <ul className="space-y-1 text-sm">
                                    {insights.map((insight, index) => (
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

                {/* Member Activity Cards */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Member Activity Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teamMembers.map(member => {
                            const avgEngagement = getAverageEngagement(member.id)
                            const totalHours = getTotalHours(member.id)
                            const memberData = getMemberData(member.id)
                            const recentStatus = memberData[0]?.status || member.status

                            return (
                                <div key={member.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-3 h-3 rounded-full ${getStatusColor(recentStatus)}`} />
                                            <div>
                                                <p className="font-medium text-white">{member.name}</p>
                                                <p className="text-sm text-gray-400">{member.role}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className={getEngagementColor(avgEngagement)}>
                                            {avgEngagement.toFixed(0)}% engaged
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Online Hours:</span>
                                            <span className="text-white">{totalHours}h</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Avg Daily:</span>
                                            <span className="text-white">{(totalHours / memberData.length).toFixed(1)}h</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Tasks Completed:</span>
                                            <span className="text-white">{memberData.reduce((sum, d) => sum + d.tasksCompleted, 0)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Meetings:</span>
                                            <span className="text-white">{memberData.reduce((sum, d) => sum + d.meetingsAttended, 0)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <Progress value={avgEngagement} className="h-2" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Activity Heatmap */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Activity Heatmap</h3>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <div key={day} className="text-center text-xs text-gray-400 font-medium">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: 7 }, (_, i) => {
                                const dayData = attendanceData.filter(d => {
                                    const date = new Date(d.date)
                                    return date.getDay() === i
                                })
                                const avgEngagement = dayData.length > 0
                                    ? dayData.reduce((sum, d) => sum + d.engagementScore, 0) / dayData.length
                                    : 0

                                return (
                                    <div key={i} className="aspect-square rounded border border-gray-600 flex items-center justify-center">
                                        <div
                                            className={`${styles.heatmapCell} ${avgEngagement > 50 ? styles.heatmapCellHigh : styles.heatmapCellLow} ${getEngagementLevelClass(avgEngagement)}`}
                                        >
                                            {avgEngagement > 0 ? `${Math.round(avgEngagement)}%` : '-'}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* AI Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">AI Capabilities</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Pattern recognition</li>
                            <li>• Engagement analysis</li>
                            <li>• Productivity correlation</li>
                            <li>• Burnout detection</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Attendance Features</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Real-time tracking</li>
                            <li>• Focus mode detection</li>
                            <li>• Meeting attendance</li>
                            <li>• Activity correlation</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 