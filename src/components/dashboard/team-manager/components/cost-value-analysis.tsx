"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Calculator, TrendingUp, TrendingDown,
    Users, Calendar, BarChart3, Zap, Target, RefreshCw,
    CheckCircle, XCircle, Plus, Settings, Clock, DollarSign
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

interface TaskData {
    id: string
    memberId: string
    memberName: string
    taskName: string
    taskType: 'campaign' | 'content' | 'analysis' | 'meeting' | 'admin'
    timeSpent: number
    revenueGenerated: number
    costPerHour: number
    valuePerHour: number
    efficiency: number
    priority: 'high' | 'medium' | 'low'
    status: 'completed' | 'in-progress' | 'overdue'
    recommendations: string[]
}

interface CostValueAnalysisProps {
    teamMembers: TeamMember[]
}

export function CostValueAnalysis({ teamMembers }: CostValueAnalysisProps) {
    const [taskData, setTaskData] = useState<TaskData[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [insights, setInsights] = useState<string[]>([])
    const [selectedTaskType, setSelectedTaskType] = useState<string>('all')
    const [selectedMember, setSelectedMember] = useState<string>('all')

    // Generate mock task data
    useEffect(() => {
        const generateMockData = () => {
            const data: TaskData[] = []
            const taskTypes: ('campaign' | 'content' | 'analysis' | 'meeting' | 'admin')[] = ['campaign', 'content', 'analysis', 'meeting', 'admin']
            const priorities: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low']
            const statuses: ('completed' | 'in-progress' | 'overdue')[] = ['completed', 'in-progress', 'overdue']

            teamMembers.forEach(member => {
                for (let i = 0; i < 5; i++) {
                    const taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)]
                    const timeSpent = Math.floor(Math.random() * 8) + 2
                    const revenueGenerated = Math.floor(Math.random() * 5000) + 500
                    const costPerHour = member.salary / (160 * 4) // Assuming 160 hours per month
                    const valuePerHour = revenueGenerated / timeSpent
                    const efficiency = Math.floor(Math.random() * 40) + 60

                    const recommendations = []
                    if (valuePerHour < costPerHour * 2) {
                        recommendations.push('Optimize task efficiency')
                        recommendations.push('Consider automation')
                    }
                    if (timeSpent > 6) {
                        recommendations.push('Break down into smaller tasks')
                        recommendations.push('Delegate subtasks')
                    }
                    if (efficiency < 70) {
                        recommendations.push('Improve focus time')
                        recommendations.push('Reduce context switching')
                    }

                    data.push({
                        id: `${member.id}-task-${i}`,
                        memberId: member.id,
                        memberName: member.name,
                        taskName: `${taskType.charAt(0).toUpperCase() + taskType.slice(1)} Task ${i + 1}`,
                        taskType,
                        timeSpent,
                        revenueGenerated,
                        costPerHour,
                        valuePerHour,
                        efficiency,
                        priority: priorities[Math.floor(Math.random() * priorities.length)],
                        status: statuses[Math.floor(Math.random() * statuses.length)],
                        recommendations
                    })
                }
            })

            setTaskData(data)
        }

        generateMockData()
    }, [teamMembers])

    const analyzeCostValue = async () => {
        setIsAnalyzing(true)
        try {
            // Simulate AI analysis
            await new Promise(resolve => setTimeout(resolve, 2000))

            const newInsights = [
                "Campaign tasks generate 3.2x more value than admin tasks",
                "Ahmed's analysis tasks are 40% more efficient than team average",
                "Nada's content creation has highest value/hour ratio",
                "Meetings consume 25% of time but generate only 15% of value",
                "Automating admin tasks could save 12 hours/week"
            ]

            setInsights(newInsights)
        } catch (error) {
            console.error('Analysis failed:', error)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const getValueColor = (valuePerHour: number, costPerHour: number) => {
        const ratio = valuePerHour / costPerHour
        if (ratio >= 3) return 'text-green-400'
        if (ratio >= 2) return 'text-yellow-400'
        return 'text-red-400'
    }

    const getEfficiencyColor = (efficiency: number) => {
        if (efficiency >= 80) return 'text-green-400'
        if (efficiency >= 60) return 'text-yellow-400'
        return 'text-red-400'
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-400'
            case 'medium': return 'text-yellow-400'
            case 'low': return 'text-green-400'
            default: return 'text-gray-400'
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-400'
            case 'in-progress': return 'text-blue-400'
            case 'overdue': return 'text-red-400'
            default: return 'text-gray-400'
        }
    }

    const getFilteredTasks = () => {
        let filtered = taskData

        if (selectedTaskType !== 'all') {
            filtered = filtered.filter(task => task.taskType === selectedTaskType)
        }

        if (selectedMember !== 'all') {
            filtered = filtered.filter(task => task.memberId === selectedMember)
        }

        return filtered
    }

    const getAverageValuePerHour = () => {
        const filtered = getFilteredTasks()
        if (filtered.length === 0) return 0
        return filtered.reduce((sum, task) => sum + task.valuePerHour, 0) / filtered.length
    }

    const getTotalRevenue = () => {
        const filtered = getFilteredTasks()
        return filtered.reduce((sum, task) => sum + task.revenueGenerated, 0)
    }

    const getTotalTimeSpent = () => {
        const filtered = getFilteredTasks()
        return filtered.reduce((sum, task) => sum + task.timeSpent, 0)
    }

    const getHighValueTasks = () => {
        const filtered = getFilteredTasks()
        return filtered.filter(task => task.valuePerHour > task.costPerHour * 2).length
    }

    return (
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Calculator className="h-5 w-5 text-purple-400" />
                        <span className="text-white">Cost Value Analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            size="sm"
                            onClick={analyzeCostValue}
                            disabled={isAnalyzing}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                        </Button>
                        <select
                            value={selectedTaskType}
                            onChange={(e) => setSelectedTaskType(e.target.value)}
                            className="bg-gray-800 text-white text-sm rounded px-2 py-1 border border-gray-600"
                            aria-label="Select task type filter"
                        >
                            <option value="all">All Tasks</option>
                            <option value="campaign">Campaign</option>
                            <option value="content">Content</option>
                            <option value="analysis">Analysis</option>
                            <option value="meeting">Meeting</option>
                            <option value="admin">Admin</option>
                        </select>
                        <select
                            value={selectedMember}
                            onChange={(e) => setSelectedMember(e.target.value)}
                            className="bg-gray-800 text-white text-sm rounded px-2 py-1 border border-gray-600"
                            aria-label="Select team member filter"
                        >
                            <option value="all">All Members</option>
                            {teamMembers.map(member => (
                                <option key={member.id} value={member.id}>{member.name}</option>
                            ))}
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
                                <p className="text-sm text-gray-400">Avg Value/Hour</p>
                                <p className="text-2xl font-bold text-white">${getAverageValuePerHour().toFixed(0)}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Total Revenue</p>
                                <p className="text-2xl font-bold text-white">${(getTotalRevenue() / 1000).toFixed(0)}k</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-blue-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Time Spent</p>
                                <p className="text-2xl font-bold text-white">{getTotalTimeSpent()}h</p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">High Value Tasks</p>
                                <p className="text-2xl font-bold text-white">{getHighValueTasks()}</p>
                            </div>
                            <Target className="h-8 w-8 text-purple-400" />
                        </div>
                    </div>
                </div>

                {/* AI Insights */}
                {insights.length > 0 && (
                    <Alert className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30">
                        <BarChart3 className="h-4 w-4 text-purple-400" />
                        <AlertDescription className="text-purple-200">
                            <div className="space-y-2">
                                <p className="font-medium">AI Cost-Value Insights:</p>
                                <ul className="space-y-1 text-sm">
                                    {insights.map((insight, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                            <span className="text-purple-400">•</span>
                                            <span>{insight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Task Analysis Cards */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Task Cost-Value Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getFilteredTasks().map(task => (
                            <div key={task.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${getValueColor(task.valuePerHour, task.costPerHour).replace('text-', 'bg-')}`} />
                                        <div>
                                            <p className="font-medium text-white">{task.taskName}</p>
                                            <p className="text-sm text-gray-400">{task.memberName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                            {task.priority}
                                        </Badge>
                                        <Badge variant="outline" className={getStatusColor(task.status)}>
                                            {task.status}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Revenue:</span>
                                        <span className="text-white">${task.revenueGenerated.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Time Spent:</span>
                                        <span className="text-white">{task.timeSpent}h</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Value/Hour:</span>
                                        <span className={getValueColor(task.valuePerHour, task.costPerHour)}>
                                            ${task.valuePerHour.toFixed(0)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Cost/Hour:</span>
                                        <span className="text-white">${task.costPerHour.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Efficiency:</span>
                                        <span className={getEfficiencyColor(task.efficiency)}>{task.efficiency}%</span>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <Progress value={task.efficiency} className="h-2" />
                                </div>

                                {task.recommendations.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-xs text-gray-400 font-medium mb-2">AI Recommendations:</p>
                                        <div className="space-y-1">
                                            {task.recommendations.slice(0, 2).map((rec, index) => (
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

                {/* Cost-Value Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">Value Benchmarks</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p>• High value: $200+/hour</p>
                            <p>• Medium value: $100-200/hour</p>
                            <p>• Low value: &lt;$100/hour</p>
                            <p>• Target efficiency: 80%+</p>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">Optimization Tips</h4>
                        <div className="space-y-2">
                            {['Automate low-value tasks', 'Focus on high-revenue activities', 'Reduce meeting time', 'Improve task efficiency'].map((tip, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Target className="h-3 w-3 text-blue-500" />
                                    <span className="text-sm text-white">{tip}</span>
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
                            <li>• Value pattern analysis</li>
                            <li>• Cost optimization</li>
                            <li>• Efficiency correlation</li>
                            <li>• Task prioritization</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Analysis Features</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Real-time cost tracking</li>
                            <li>• Value per hour calculation</li>
                            <li>• Task efficiency metrics</li>
                            <li>• ROI optimization</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 