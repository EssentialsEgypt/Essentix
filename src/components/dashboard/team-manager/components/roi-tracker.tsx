"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    DollarSign, TrendingUp, TrendingDown,
    Users, Calendar, BarChart3, Zap, Target, RefreshCw,
    CheckCircle, XCircle, Plus, Settings, Calculator, Award
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

interface ROIData {
    memberId: string
    memberName: string
    salary: number
    toolCost: number
    totalCost: number
    revenueGenerated: number
    roi: number
    roiTrend: 'up' | 'down' | 'stable'
    efficiency: number
    valuePerHour: number
    recommendations: string[]
}

interface ROITrackerProps {
    teamMembers: TeamMember[]
}

export function ROITracker({ teamMembers }: ROITrackerProps) {
    const [roiData, setRoiData] = useState<ROIData[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [insights, setInsights] = useState<string[]>([])
    const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month')

    // Generate mock ROI data
    useEffect(() => {
        const generateMockData = () => {
            const data: ROIData[] = teamMembers.map(member => {
                const salary = member.salary
                const toolCost = member.toolCost
                const totalCost = salary + toolCost
                const revenueGenerated = member.revenueImpact
                const roi = revenueGenerated / totalCost
                const efficiency = Math.floor(Math.random() * 30) + 70
                const valuePerHour = revenueGenerated / (member.timeSpent * 4) // Assuming 4 weeks

                const roiTrend = roi > 5 ? 'up' : roi > 3 ? 'stable' : 'down'

                const recommendations = []
                if (roi < 3) {
                    recommendations.push('Increase revenue generation by 25%')
                    recommendations.push('Optimize tool usage to reduce costs')
                }
                if (efficiency < 75) {
                    recommendations.push('Improve time management skills')
                    recommendations.push('Focus on high-value tasks')
                }
                if (valuePerHour < 100) {
                    recommendations.push('Delegate low-value tasks')
                    recommendations.push('Invest in skill development')
                }

                return {
                    memberId: member.id,
                    memberName: member.name,
                    salary,
                    toolCost,
                    totalCost,
                    revenueGenerated,
                    roi,
                    roiTrend,
                    efficiency,
                    valuePerHour,
                    recommendations
                }
            })

            setRoiData(data)
        }

        generateMockData()
    }, [teamMembers])

    const analyzeROI = async () => {
        setIsAnalyzing(true)
        try {
            // Simulate AI analysis
            await new Promise(resolve => setTimeout(resolve, 2000))

            const newInsights = [
                "Ahmed's ROI: 6.5x - highest in team (target: 5x)",
                "Nada's efficiency correlates with 2.3x ROI improvement",
                "Omar generates $2,200/hour value - optimize workload",
                "Farouk needs ROI optimization - current 2.1x below target",
                "Team average ROI: 4.2x (industry benchmark: 3.5x)"
            ]

            setInsights(newInsights)
        } catch (error) {
            console.error('Analysis failed:', error)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const getROIColor = (roi: number) => {
        if (roi >= 5) return 'text-green-400'
        if (roi >= 3) return 'text-yellow-400'
        return 'text-red-400'
    }

    const getROIBarColor = (roi: number) => {
        if (roi >= 5) return 'bg-green-500'
        if (roi >= 3) return 'bg-yellow-500'
        return 'bg-red-500'
    }

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />
            case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />
            default: return <TrendingUp className="h-4 w-4 text-yellow-400" />
        }
    }

    const getTeamAverageROI = () => {
        if (roiData.length === 0) return 0
        return roiData.reduce((sum, d) => sum + d.roi, 0) / roiData.length
    }

    const getTotalTeamValue = () => {
        return roiData.reduce((sum, d) => sum + d.revenueGenerated, 0)
    }

    const getTotalTeamCost = () => {
        return roiData.reduce((sum, d) => sum + d.totalCost, 0)
    }

    const getTopPerformers = () => {
        return roiData.filter(d => d.roi >= 5).length
    }

    return (
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-400" />
                        <span className="text-white">ROI Tracker</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            size="sm"
                            onClick={analyzeROI}
                            disabled={isAnalyzing}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                        </Button>
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value as 'month' | 'quarter' | 'year')}
                            className="bg-gray-800 text-white text-sm rounded px-2 py-1 border border-gray-600"
                            aria-label="Select ROI analysis period"
                        >
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
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
                                <p className="text-sm text-gray-400">Team ROI</p>
                                <p className="text-2xl font-bold text-white">{getTeamAverageROI().toFixed(1)}x</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Total Value</p>
                                <p className="text-2xl font-bold text-white">${(getTotalTeamValue() / 1000).toFixed(0)}k</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-blue-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Top Performers</p>
                                <p className="text-2xl font-bold text-white">{getTopPerformers()}</p>
                            </div>
                            <Award className="h-8 w-8 text-yellow-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Avg Value/Hour</p>
                                <p className="text-2xl font-bold text-white">$1,250</p>
                            </div>
                            <Calculator className="h-8 w-8 text-purple-400" />
                        </div>
                    </div>
                </div>

                {/* AI Insights */}
                {insights.length > 0 && (
                    <Alert className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30">
                        <BarChart3 className="h-4 w-4 text-green-400" />
                        <AlertDescription className="text-green-200">
                            <div className="space-y-2">
                                <p className="font-medium">AI ROI Insights:</p>
                                <ul className="space-y-1 text-sm">
                                    {insights.map((insight, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                            <span className="text-green-400">•</span>
                                            <span>{insight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Member ROI Cards */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Member ROI Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {roiData.map(member => (
                            <div key={member.memberId} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${getROIBarColor(member.roi)}`} />
                                        <div>
                                            <p className="font-medium text-white">{member.memberName}</p>
                                            <p className="text-sm text-gray-400">{member.roi.toFixed(1)}x ROI</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {getTrendIcon(member.roiTrend)}
                                        <Badge variant="outline" className={getROIColor(member.roi)}>
                                            {member.roi.toFixed(1)}x
                                        </Badge>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Revenue:</span>
                                        <span className="text-white">${(member.revenueGenerated / 1000).toFixed(0)}k</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Total Cost:</span>
                                        <span className="text-white">${(member.totalCost / 1000).toFixed(0)}k</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Value/Hour:</span>
                                        <span className="text-white">${member.valuePerHour.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Efficiency:</span>
                                        <span className="text-white">{member.efficiency}%</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Salary:</span>
                                        <span className="text-white">${(member.salary / 1000).toFixed(0)}k</span>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <Progress value={Math.min(member.roi * 20, 100)} className="h-2" />
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

                {/* ROI Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">ROI Benchmarks</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p>• Industry average: 3.5x ROI</p>
                            <p>• Top performers: 5x+ ROI</p>
                            <p>• Target efficiency: 80%+</p>
                            <p>• Value/hour target: $1,000+</p>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">Optimization Tips</h4>
                        <div className="space-y-2">
                            {['Focus on high-value tasks', 'Reduce tool costs', 'Improve efficiency', 'Increase revenue generation'].map((tip, index) => (
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
                            <li>• ROI pattern analysis</li>
                            <li>• Cost optimization</li>
                            <li>• Value prediction</li>
                            <li>• Performance correlation</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">ROI Features</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Real-time ROI tracking</li>
                            <li>• Cost vs value analysis</li>
                            <li>• Performance benchmarking</li>
                            <li>• Optimization recommendations</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 