"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    TrendingUp, TrendingDown, Target, Clock, CheckCircle, XCircle,
    Users, Calendar, Zap, Award, Star, Activity, BarChart3,
    Brain, AlertTriangle, RefreshCw, Eye, Download, Filter, Mail
} from "lucide-react"
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts"

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

interface PerformanceTrackerProps {
    teamMembers: TeamMember[]
}

interface WeeklySummary {
    memberId: string
    memberName: string
    summary: string
    highlights: string[]
    concerns: string[]
    recommendations: string[]
    week: string
}

export function PerformanceTracker({ teamMembers }: PerformanceTrackerProps) {
    const [selectedMember, setSelectedMember] = useState<string | null>(null)
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('week')
    const [viewMode, setViewMode] = useState<'cards' | 'charts' | 'summary'>('cards')

    // Mock weekly summaries
    const weeklySummaries: WeeklySummary[] = [
        {
            memberId: '1',
            memberName: 'Ahmed Hassan',
            summary: 'Ahmed maintained excellent performance with 95% task completion rate and 98% deadline compliance. His ROI of 5.6x continues to be the highest in the team.',
            highlights: ['Completed 15 tasks this week', 'Achieved 98% deadline compliance', 'Generated 5.6x ROI'],
            concerns: ['Slight increase in stress level (25%)', 'Could improve meeting attendance'],
            recommendations: ['Consider reducing workload to maintain stress levels', 'Schedule more focused work sessions'],
            week: 'Week 12, 2024'
        },
        {
            memberId: '2',
            memberName: 'Nada El-Sayed',
            summary: 'Nada showed strong creative output with 8 campaigns involved. Her focus mode usage increased productivity by 40%.',
            highlights: ['Involved in 8 campaigns', 'Used focus mode 6 times', 'Improved content quality'],
            concerns: ['Stress level at 35% (moderate)', 'Meeting attendance dropped to 88%'],
            recommendations: ['Encourage more breaks during focus sessions', 'Consider flexible meeting schedule'],
            week: 'Week 12, 2024'
        },
        {
            memberId: '3',
            memberName: 'Omar Khalil',
            summary: 'Omar demonstrated exceptional data analysis skills with 99% deadline compliance and 96% response speed. His 6.2x ROI is outstanding.',
            highlights: ['99% deadline compliance', '96% response speed', '6.2x ROI (highest)'],
            concerns: ['Working longer hours (45h/week)', 'Low stress but high workload'],
            recommendations: ['Monitor workload to prevent burnout', 'Consider automation opportunities'],
            week: 'Week 12, 2024'
        },
        {
            memberId: '4',
            memberName: 'Farouk Ali',
            summary: 'Farouk missed 2 meetings and shows signs of stress with 40% burnout risk. His performance needs attention.',
            highlights: ['Completed 67 tasks total', 'Involved in 6 campaigns', 'Quick learning ability'],
            concerns: ['40% burnout risk (high)', 'Missed 2 meetings', 'Stress level at 45%'],
            recommendations: ['Immediate workload reduction needed', 'Schedule regular check-ins', 'Consider mentorship support'],
            week: 'Week 12, 2024'
        }
    ]

    const getPerformanceColor = (value: number) => {
        if (value >= 90) return 'text-green-600 bg-green-100'
        if (value >= 75) return 'text-yellow-600 bg-yellow-100'
        return 'text-red-600 bg-red-100'
    }

    const getPerformanceLevel = (value: number) => {
        if (value >= 90) return 'Excellent'
        if (value >= 75) return 'Good'
        if (value >= 60) return 'Fair'
        return 'Needs Improvement'
    }

    const chartData = teamMembers.map(member => ({
        name: member.name,
        tasks: member.completedTasks,
        campaigns: member.campaignsInvolved,
        attendance: member.meetingAttendance,
        response: member.responseSpeed,
        compliance: member.deadlineCompliance,
        roi: member.roi,
        stress: member.currentStressLevel
    }))

    const performanceData = [
        { metric: 'Task Completion', average: teamMembers.reduce((sum, m) => sum + m.completedTasks, 0) / teamMembers.length },
        { metric: 'Campaign Involvement', average: teamMembers.reduce((sum, m) => sum + m.campaignsInvolved, 0) / teamMembers.length },
        { metric: 'Meeting Attendance', average: teamMembers.reduce((sum, m) => sum + m.meetingAttendance, 0) / teamMembers.length },
        { metric: 'Response Speed', average: teamMembers.reduce((sum, m) => sum + m.responseSpeed, 0) / teamMembers.length },
        { metric: 'Deadline Compliance', average: teamMembers.reduce((sum, m) => sum + m.deadlineCompliance, 0) / teamMembers.length },
        { metric: 'ROI', average: teamMembers.reduce((sum, m) => sum + m.roi, 0) / teamMembers.length }
    ]

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Performance Tracker</h2>
                    <p className="text-gray-300">Track individual and team performance metrics</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant={viewMode === 'cards' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('cards')}
                    >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Cards
                    </Button>
                    <Button
                        variant={viewMode === 'charts' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('charts')}
                    >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Charts
                    </Button>
                    <Button
                        variant={viewMode === 'summary' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('summary')}
                    >
                        <Brain className="h-4 w-4 mr-2" />
                        AI Summary
                    </Button>
                </div>
            </div>

            {/* Time Range Filter */}
            <div className="flex items-center space-x-2">
                <Badge
                    variant={timeRange === 'week' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTimeRange('week')}
                >
                    Week
                </Badge>
                <Badge
                    variant={timeRange === 'month' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTimeRange('month')}
                >
                    Month
                </Badge>
                <Badge
                    variant={timeRange === 'quarter' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTimeRange('quarter')}
                >
                    Quarter
                </Badge>
            </div>

            {/* Content */}
            {viewMode === 'cards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teamMembers.map((member) => (
                        <Card key={member.id} className="relative hover:shadow-lg transition-all duration-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={member.avatar} />
                                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold">{member.name}</h3>
                                            <p className="text-sm text-gray-500">{member.role}</p>
                                        </div>
                                    </div>
                                    <Badge className={getPerformanceColor(member.deadlineCompliance)}>
                                        {getPerformanceLevel(member.deadlineCompliance)}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Key Metrics */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">Completed Tasks</p>
                                        <p className="text-lg font-bold text-white">{member.completedTasks}</p>
                                        <p className="text-xs text-gray-400">{member.openTasks} open</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">Campaigns</p>
                                        <p className="text-lg font-bold text-white">{member.campaignsInvolved}</p>
                                        <p className="text-xs text-gray-400">involved</p>
                                    </div>
                                </div>

                                {/* Performance Bars */}
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs text-gray-500">Meeting Attendance</span>
                                            <span className="text-xs font-medium">{member.meetingAttendance}%</span>
                                        </div>
                                        <Progress value={member.meetingAttendance} className="h-2" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs text-gray-500">Response Speed</span>
                                            <span className="text-xs font-medium">{member.responseSpeed}%</span>
                                        </div>
                                        <Progress value={member.responseSpeed} className="h-2" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs text-gray-500">Deadline Compliance</span>
                                            <span className="text-xs font-medium">{member.deadlineCompliance}%</span>
                                        </div>
                                        <Progress value={member.deadlineCompliance} className="h-2" />
                                    </div>
                                </div>

                                {/* ROI & Stress */}
                                <div className="flex items-center justify-between">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">ROI</p>
                                        <p className="text-lg font-bold text-green-500">{member.roi}x</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">Stress Level</p>
                                        <p className="text-lg font-bold text-red-500">{member.currentStressLevel}%</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-2">
                                    <Button size="sm" variant="outline">
                                        <Eye className="h-4 w-4 mr-2" />
                                        Details
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {viewMode === 'charts' && (
                <div className="space-y-6">
                    {/* Performance Comparison Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <BarChart3 className="h-5 w-5" />
                                <span>Performance Comparison</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="attendance" fill="#3b82f6" name="Attendance %" />
                                    <Bar dataKey="response" fill="#10b981" name="Response %" />
                                    <Bar dataKey="compliance" fill="#f59e0b" name="Compliance %" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* ROI vs Stress Scatter */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <TrendingUp className="h-5 w-5" />
                                    <span>ROI by Member</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="roi" fill="#8b5cf6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <AlertTriangle className="h-5 w-5" />
                                    <span>Stress Levels</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="stress" fill="#ef4444" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {viewMode === 'summary' && (
                <div className="space-y-4">
                    {/* AI Weekly Summaries */}
                    {weeklySummaries.map((summary) => (
                        <Card key={summary.memberId} className="relative">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={teamMembers.find(m => m.id === summary.memberId)?.avatar} />
                                            <AvatarFallback>{summary.memberName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold">{summary.memberName}</h3>
                                            <p className="text-sm text-gray-500">{summary.week}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                        <Brain className="h-3 w-3 mr-1" />
                                        AI Generated
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Summary */}
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                                    <p className="text-sm text-gray-700">{summary.summary}</p>
                                </div>

                                {/* Highlights */}
                                <div>
                                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                                        Highlights
                                    </h4>
                                    <div className="space-y-1">
                                        {summary.highlights.map((highlight, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <CheckCircle className="h-3 w-3 text-green-500" />
                                                <span className="text-sm text-gray-600">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Concerns */}
                                {summary.concerns.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-semibold mb-2 flex items-center">
                                            <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                                            Concerns
                                        </h4>
                                        <div className="space-y-1">
                                            {summary.concerns.map((concern, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <XCircle className="h-3 w-3 text-red-500" />
                                                    <span className="text-sm text-gray-600">{concern}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Recommendations */}
                                <div>
                                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                                        <Zap className="h-4 w-4 mr-2 text-blue-500" />
                                        AI Recommendations
                                    </h4>
                                    <div className="space-y-1">
                                        {summary.recommendations.map((rec, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <Target className="h-3 w-3 text-blue-500" />
                                                <span className="text-sm text-gray-600">{rec}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center space-x-2 pt-2">
                                    <Button size="sm" variant="outline">
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Regenerate
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Mail className="h-4 w-4 mr-2" />
                                        Share
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
} 