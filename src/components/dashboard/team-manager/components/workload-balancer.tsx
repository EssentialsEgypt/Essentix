"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Scale, AlertTriangle, TrendingUp, TrendingDown,
    Users, Calendar, BarChart3, Zap, Target, RefreshCw,
    CheckCircle, XCircle, Plus, Settings, ArrowRight, ArrowLeft
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

interface WorkloadData {
    memberId: string
    memberName: string
    currentLoad: number
    maxCapacity: number
    taskCount: number
    priorityTasks: number
    overdueTasks: number
    estimatedHours: number
    stressLevel: number
    efficiency: number
    recommendations: string[]
}

interface WorkloadBalancerProps {
    teamMembers: TeamMember[]
}

export function WorkloadBalancer({ teamMembers }: WorkloadBalancerProps) {
    const [workloadData, setWorkloadData] = useState<WorkloadData[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [insights, setInsights] = useState<string[]>([])
    const [showRedistribution, setShowRedistribution] = useState(false)
    const [selectedTasks, setSelectedTasks] = useState<string[]>([])

    // Generate mock workload data
    useEffect(() => {
        const generateMockData = () => {
            const data: WorkloadData[] = teamMembers.map(member => {
                const currentLoad = Math.floor(Math.random() * 40) + 40 // 40-80%
                const maxCapacity = 100
                const taskCount = Math.floor(Math.random() * 8) + 3
                const priorityTasks = Math.floor(Math.random() * 4) + 1
                const overdueTasks = Math.floor(Math.random() * 3)
                const estimatedHours = Math.floor(Math.random() * 20) + 20
                const stressLevel = member.currentStressLevel
                const efficiency = Math.floor(Math.random() * 30) + 60

                const recommendations = []
                if (currentLoad > 80) {
                    recommendations.push('Reduce task load by 20%')
                    recommendations.push('Delegate 2-3 tasks to team members')
                }
                if (overdueTasks > 0) {
                    recommendations.push('Prioritize overdue tasks')
                    recommendations.push('Request deadline extensions')
                }
                if (stressLevel > 50) {
                    recommendations.push('Consider workload reduction')
                    recommendations.push('Schedule breaks between tasks')
                }

                return {
                    memberId: member.id,
                    memberName: member.name,
                    currentLoad,
                    maxCapacity,
                    taskCount,
                    priorityTasks,
                    overdueTasks,
                    estimatedHours,
                    stressLevel,
                    efficiency,
                    recommendations
                }
            })

            setWorkloadData(data)
        }

        generateMockData()
    }, [teamMembers])

    const analyzeWorkload = async () => {
        setIsAnalyzing(true)
        try {
            // Simulate AI analysis
            await new Promise(resolve => setTimeout(resolve, 2000))

            const newInsights = [
                "Ahmed is at 85% capacity - consider redistributing 2 tasks",
                "Nada's efficiency drops 30% when overloaded - reduce workload",
                "Omar has optimal workload distribution - use as benchmark",
                "Farouk shows stress correlation with task count - delegate priority tasks",
                "Team average efficiency: 72% (target: 80%)"
            ]

            setInsights(newInsights)
        } catch (error) {
            console.error('Analysis failed:', error)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const getLoadColor = (load: number) => {
        if (load >= 80) return 'text-red-400'
        if (load >= 60) return 'text-yellow-400'
        return 'text-green-400'
    }

    const getLoadBarColor = (load: number) => {
        if (load >= 80) return 'bg-red-500'
        if (load >= 60) return 'bg-yellow-500'
        return 'bg-green-500'
    }

    const getEfficiencyColor = (efficiency: number) => {
        if (efficiency >= 80) return 'text-green-400'
        if (efficiency >= 60) return 'text-yellow-400'
        return 'text-red-400'
    }

    const getTeamAverageLoad = () => {
        if (workloadData.length === 0) return 0
        return workloadData.reduce((sum, d) => sum + d.currentLoad, 0) / workloadData.length
    }

    const getOverloadedMembers = () => {
        return workloadData.filter(d => d.currentLoad > 80)
    }

    const getUnderutilizedMembers = () => {
        return workloadData.filter(d => d.currentLoad < 50)
    }

    const suggestRedistribution = () => {
        const overloaded = getOverloadedMembers()
        const underutilized = getUnderutilizedMembers()

        if (overloaded.length > 0 && underutilized.length > 0) {
            setShowRedistribution(true)
        }
    }

    return (
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Scale className="h-5 w-5 text-orange-400" />
                        <span className="text-white">Workload Balancer</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            size="sm"
                            onClick={analyzeWorkload}
                            disabled={isAnalyzing}
                            className="bg-orange-600 hover:bg-orange-700"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                        </Button>
                        <Button
                            size="sm"
                            onClick={suggestRedistribution}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Redistribute
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Avg Load</p>
                                <p className="text-2xl font-bold text-white">{getTeamAverageLoad().toFixed(0)}%</p>
                            </div>
                            <Scale className="h-8 w-8 text-orange-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Overloaded</p>
                                <p className="text-2xl font-bold text-white">{getOverloadedMembers().length}</p>
                            </div>
                            <AlertTriangle className="h-8 w-8 text-red-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Underutilized</p>
                                <p className="text-2xl font-bold text-white">{getUnderutilizedMembers().length}</p>
                            </div>
                            <TrendingDown className="h-8 w-8 text-blue-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Efficiency</p>
                                <p className="text-2xl font-bold text-white">72%</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-400" />
                        </div>
                    </div>
                </div>

                {/* AI Insights */}
                {insights.length > 0 && (
                    <Alert className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30">
                        <BarChart3 className="h-4 w-4 text-orange-400" />
                        <AlertDescription className="text-orange-200">
                            <div className="space-y-2">
                                <p className="font-medium">AI Workload Insights:</p>
                                <ul className="space-y-1 text-sm">
                                    {insights.map((insight, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                            <span className="text-orange-400">•</span>
                                            <span>{insight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Workload Redistribution */}
                {showRedistribution && (
                    <Alert className="bg-gradient-to-r from-blue-500/20 to-green-500/20 border-blue-500/30">
                        <ArrowRight className="h-4 w-4 text-blue-400" />
                        <AlertDescription className="text-blue-200">
                            <div className="space-y-4">
                                <div>
                                    <p className="font-medium mb-2">Suggested Workload Redistribution:</p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                                            <span>Move 2 tasks from Ahmed to Omar</span>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Apply
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                                            <span>Delegate 1 priority task from Nada to Farouk</span>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Apply
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                                            <span>Extend deadlines for 3 overdue tasks</span>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Apply
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button onClick={() => setShowRedistribution(false)} className="bg-blue-600 hover:bg-blue-700">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Apply All
                                    </Button>
                                    <Button
                                        onClick={() => setShowRedistribution(false)}
                                        variant="outline"
                                    >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Member Workload Cards */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Member Workload Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {workloadData.map(member => (
                            <div key={member.memberId} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${getLoadBarColor(member.currentLoad)}`} />
                                        <div>
                                            <p className="font-medium text-white">{member.memberName}</p>
                                            <p className="text-sm text-gray-400">{member.taskCount} tasks</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className={getLoadColor(member.currentLoad)}>
                                        {member.currentLoad}% load
                                    </Badge>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Priority Tasks:</span>
                                        <span className="text-white">{member.priorityTasks}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Overdue:</span>
                                        <span className="text-red-400">{member.overdueTasks}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Est. Hours:</span>
                                        <span className="text-white">{member.estimatedHours}h</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Efficiency:</span>
                                        <span className={getEfficiencyColor(member.efficiency)}>{member.efficiency}%</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Stress Level:</span>
                                        <span className="text-white">{member.stressLevel}%</span>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <Progress value={member.currentLoad} className="h-2" />
                                </div>

                                {member.recommendations.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-xs text-gray-400 font-medium mb-2">AI Recommendations:</p>
                                        <div className="space-y-1">
                                            {member.recommendations.slice(0, 2).map((rec, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <Zap className="h-3 w-3 text-yellow-500" />
                                                    <span className="text-xs text-gray-300">{rec}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Workload Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">Load Distribution</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p>• Optimal load: 60-80% capacity</p>
                            <p>• Overload threshold: 85% capacity</p>
                            <p>• Underutilization: below 50% capacity</p>
                            <p>• Stress correlation: load &gt; 80% = +40% stress</p>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">Efficiency Factors</h4>
                        <div className="space-y-2">
                            {['Task complexity affects efficiency', 'Deadline pressure reduces quality', 'Context switching costs 15min', 'Breaks improve focus by 25%'].map((factor, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Target className="h-3 w-3 text-blue-500" />
                                    <span className="text-sm text-white">{factor}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">AI Capabilities</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Load pattern analysis</li>
                            <li>• Efficiency correlation</li>
                            <li>• Stress prediction</li>
                            <li>• Task redistribution</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Balancing Features</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Real-time load monitoring</li>
                            <li>• Automatic redistribution</li>
                            <li>• Priority task management</li>
                            <li>• Efficiency optimization</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 