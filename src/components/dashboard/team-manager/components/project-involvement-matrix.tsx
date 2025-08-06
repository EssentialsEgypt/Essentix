"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Grid3X3, TrendingUp, TrendingDown,
    Users, Calendar, BarChart3, Zap, Target, RefreshCw,
    CheckCircle, XCircle, Plus, Settings, Activity, Star
} from "lucide-react"
import styles from "./project-involvement-matrix.module.css"

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

interface ProjectData {
    id: string
    name: string
    type: 'campaign' | 'content' | 'analysis' | 'development' | 'marketing'
    status: 'active' | 'completed' | 'paused' | 'planning'
    startDate: Date
    endDate: Date
    budget: number
    revenue: number
    teamMembers: ProjectMember[]
}

interface ProjectMember {
    memberId: string
    memberName: string
    involvement: number // 0-100%
    role: 'lead' | 'contributor' | 'reviewer' | 'support'
    hoursSpent: number
    tasksCompleted: number
    impact: 'high' | 'medium' | 'low'
}

interface ProjectInvolvementMatrixProps {
    teamMembers: TeamMember[]
}

export function ProjectInvolvementMatrix({ teamMembers }: ProjectInvolvementMatrixProps) {
    const [projectData, setProjectData] = useState<ProjectData[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [insights, setInsights] = useState<string[]>([])
    const [selectedProject, setSelectedProject] = useState<string | null>(null)
    const [selectedMember, setSelectedMember] = useState<string | null>(null)

    // Generate mock project data
    useEffect(() => {
        const generateMockData = () => {
            const projects: ProjectData[] = [
                {
                    id: '1',
                    name: 'Summer Campaign 2024',
                    type: 'campaign',
                    status: 'active',
                    startDate: new Date('2024-06-01'),
                    endDate: new Date('2024-08-31'),
                    budget: 50000,
                    revenue: 125000,
                    teamMembers: teamMembers.map(member => ({
                        memberId: member.id,
                        memberName: member.name,
                        involvement: Math.floor(Math.random() * 60) + 20,
                        role: ['lead', 'contributor', 'reviewer', 'support'][Math.floor(Math.random() * 4)] as any,
                        hoursSpent: Math.floor(Math.random() * 40) + 10,
                        tasksCompleted: Math.floor(Math.random() * 15) + 5,
                        impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any
                    }))
                },
                {
                    id: '2',
                    name: 'Brand Redesign',
                    type: 'content',
                    status: 'active',
                    startDate: new Date('2024-05-15'),
                    endDate: new Date('2024-07-15'),
                    budget: 25000,
                    revenue: 75000,
                    teamMembers: teamMembers.map(member => ({
                        memberId: member.id,
                        memberName: member.name,
                        involvement: Math.floor(Math.random() * 60) + 20,
                        role: ['lead', 'contributor', 'reviewer', 'support'][Math.floor(Math.random() * 4)] as any,
                        hoursSpent: Math.floor(Math.random() * 30) + 5,
                        tasksCompleted: Math.floor(Math.random() * 10) + 3,
                        impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any
                    }))
                },
                {
                    id: '3',
                    name: 'Analytics Dashboard',
                    type: 'analysis',
                    status: 'completed',
                    startDate: new Date('2024-04-01'),
                    endDate: new Date('2024-05-01'),
                    budget: 15000,
                    revenue: 45000,
                    teamMembers: teamMembers.map(member => ({
                        memberId: member.id,
                        memberName: member.name,
                        involvement: Math.floor(Math.random() * 60) + 20,
                        role: ['lead', 'contributor', 'reviewer', 'support'][Math.floor(Math.random() * 4)] as any,
                        hoursSpent: Math.floor(Math.random() * 25) + 8,
                        tasksCompleted: Math.floor(Math.random() * 12) + 4,
                        impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any
                    }))
                },
                {
                    id: '4',
                    name: 'Social Media Strategy',
                    type: 'marketing',
                    status: 'planning',
                    startDate: new Date('2024-07-01'),
                    endDate: new Date('2024-09-30'),
                    budget: 30000,
                    revenue: 0,
                    teamMembers: teamMembers.map(member => ({
                        memberId: member.id,
                        memberName: member.name,
                        involvement: Math.floor(Math.random() * 40) + 10,
                        role: ['lead', 'contributor', 'reviewer', 'support'][Math.floor(Math.random() * 4)] as any,
                        hoursSpent: Math.floor(Math.random() * 15) + 2,
                        tasksCompleted: Math.floor(Math.random() * 5) + 1,
                        impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any
                    }))
                }
            ]

            setProjectData(projects)
        }

        generateMockData()
    }, [teamMembers])

    const analyzeInvolvement = async () => {
        setIsAnalyzing(true)
        try {
            // Simulate AI analysis
            await new Promise(resolve => setTimeout(resolve, 2000))

            const newInsights = [
                "Ahmed leads 3 projects - consider workload distribution",
                "Nada shows high impact in content projects - optimize role",
                "Omar's analytics involvement correlates with 2.3x revenue",
                "Farouk underutilized in 2 projects - increase involvement",
                "Cross-project collaboration improves team efficiency by 35%"
            ]

            setInsights(newInsights)
        } catch (error) {
            console.error('Analysis failed:', error)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const getInvolvementColor = (involvement: number) => {
        if (involvement >= 80) return styles.involvementBarHigh
        if (involvement >= 60) return styles.involvementBarMedium
        if (involvement >= 40) return styles.involvementBarLow
        return styles.involvementBarVeryLow
    }

    const getInvolvementWidthClass = (involvement: number) => {
        // Round to nearest 5 for cleaner CSS classes
        const roundedInvolvement = Math.round(involvement / 5) * 5
        const widthClass = `involvementWidth${roundedInvolvement}`
        return styles[widthClass] || styles.involvementWidth50 // fallback to 50% if class doesn't exist
    }

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'high': return 'text-green-400'
            case 'medium': return 'text-yellow-400'
            case 'low': return 'text-red-400'
            default: return 'text-gray-400'
        }
    }

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'lead': return 'text-blue-400'
            case 'contributor': return 'text-green-400'
            case 'reviewer': return 'text-yellow-400'
            case 'support': return 'text-gray-400'
            default: return 'text-gray-400'
        }
    }

    const getProjectStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-400'
            case 'completed': return 'text-blue-400'
            case 'paused': return 'text-yellow-400'
            case 'planning': return 'text-purple-400'
            default: return 'text-gray-400'
        }
    }

    const getMemberInvolvement = (memberId: string) => {
        let totalInvolvement = 0
        let projectCount = 0

        projectData.forEach(project => {
            const member = project.teamMembers.find(m => m.memberId === memberId)
            if (member) {
                totalInvolvement += member.involvement
                projectCount++
            }
        })

        return projectCount > 0 ? totalInvolvement / projectCount : 0
    }

    const getTotalProjectValue = () => {
        return projectData.reduce((sum, project) => sum + project.revenue, 0)
    }

    const getActiveProjects = () => {
        return projectData.filter(project => project.status === 'active').length
    }

    const getAverageInvolvement = () => {
        let totalInvolvement = 0
        let memberCount = 0

        projectData.forEach(project => {
            project.teamMembers.forEach(member => {
                totalInvolvement += member.involvement
                memberCount++
            })
        })

        return memberCount > 0 ? totalInvolvement / memberCount : 0
    }

    return (
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Grid3X3 className="h-5 w-5 text-indigo-400" />
                        <span className="text-white">Project Involvement Matrix</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            size="sm"
                            onClick={analyzeInvolvement}
                            disabled={isAnalyzing}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                        </Button>
                        <select
                            value={selectedProject || 'all'}
                            onChange={(e) => setSelectedProject(e.target.value === 'all' ? null : e.target.value)}
                            className="bg-gray-800 text-white text-sm rounded px-2 py-1 border border-gray-600"
                            aria-label="Select project filter"
                        >
                            <option value="all">All Projects</option>
                            {projectData.map(project => (
                                <option key={project.id} value={project.id}>{project.name}</option>
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
                                <p className="text-sm text-gray-400">Total Value</p>
                                <p className="text-2xl font-bold text-white">${(getTotalProjectValue() / 1000).toFixed(0)}k</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Active Projects</p>
                                <p className="text-2xl font-bold text-white">{getActiveProjects()}</p>
                            </div>
                            <Activity className="h-8 w-8 text-blue-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Avg Involvement</p>
                                <p className="text-2xl font-bold text-white">{getAverageInvolvement().toFixed(0)}%</p>
                            </div>
                            <Users className="h-8 w-8 text-yellow-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Team Members</p>
                                <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
                            </div>
                            <Star className="h-8 w-8 text-purple-400" />
                        </div>
                    </div>
                </div>

                {/* AI Insights */}
                {insights.length > 0 && (
                    <Alert className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-500/30">
                        <BarChart3 className="h-4 w-4 text-indigo-400" />
                        <AlertDescription className="text-indigo-200">
                            <div className="space-y-2">
                                <p className="font-medium">AI Involvement Insights:</p>
                                <ul className="space-y-1 text-sm">
                                    {insights.map((insight, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                            <span className="text-indigo-400">•</span>
                                            <span>{insight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Project Matrix */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Project Involvement Heatmap</h3>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="grid grid-cols-1 gap-4">
                            {projectData.map(project => (
                                <div key={project.id} className="border border-gray-600 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 className="font-medium text-white">{project.name}</h4>
                                            <div className="flex items-center space-x-4 text-sm">
                                                <span className={getProjectStatusColor(project.status)}>
                                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                                </span>
                                                <span className="text-gray-400">{project.type}</span>
                                                <span className="text-gray-400">${(project.budget / 1000).toFixed(0)}k budget</span>
                                                <span className="text-green-400">${(project.revenue / 1000).toFixed(0)}k revenue</span>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className={getProjectStatusColor(project.status)}>
                                            {project.teamMembers.length} members
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                        {project.teamMembers.map(member => (
                                            <div key={member.memberId} className="bg-gray-700/50 p-3 rounded border border-gray-600">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-white">{member.memberName}</span>
                                                    <Badge variant="outline" className={getRoleColor(member.role)}>
                                                        {member.role}
                                                    </Badge>
                                                </div>

                                                <div className="space-y-1 text-xs">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Involvement:</span>
                                                        <span className="text-white">{member.involvement}%</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Hours:</span>
                                                        <span className="text-white">{member.hoursSpent}h</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Tasks:</span>
                                                        <span className="text-white">{member.tasksCompleted}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Impact:</span>
                                                        <span className={getImpactColor(member.impact)}>
                                                            {member.impact.charAt(0).toUpperCase() + member.impact.slice(1)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-2">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex-1 bg-gray-600 rounded-full h-2">
                                                            <div
                                                                className={`${styles.involvementBar} ${getInvolvementColor(member.involvement)} ${getInvolvementWidthClass(member.involvement)}`}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-gray-400">{member.involvement}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Member Overview */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Member Project Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teamMembers.map(member => {
                            const avgInvolvement = getMemberInvolvement(member.id)
                            const memberProjects = projectData.filter(project =>
                                project.teamMembers.some(m => m.memberId === member.id)
                            )
                            const totalHours = memberProjects.reduce((sum, project) => {
                                const memberData = project.teamMembers.find(m => m.memberId === member.id)
                                return sum + (memberData?.hoursSpent || 0)
                            }, 0)

                            return (
                                <div key={member.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-indigo-500/50 transition-all">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <p className="font-medium text-white">{member.name}</p>
                                            <p className="text-sm text-gray-400">{member.role}</p>
                                        </div>
                                        <Badge variant="outline" className={avgInvolvement > 60 ? 'text-green-400' : avgInvolvement > 40 ? 'text-yellow-400' : 'text-red-400'}>
                                            {avgInvolvement.toFixed(0)}% avg
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Projects:</span>
                                            <span className="text-white">{memberProjects.length}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Total Hours:</span>
                                            <span className="text-white">{totalHours}h</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Avg Involvement:</span>
                                            <span className="text-white">{avgInvolvement.toFixed(0)}%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Lead Roles:</span>
                                            <span className="text-white">
                                                {memberProjects.filter(project =>
                                                    project.teamMembers.find(m => m.memberId === member.id)?.role === 'lead'
                                                ).length}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <Progress value={avgInvolvement} className="h-2" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Project Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">Involvement Patterns</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p>• High involvement correlates with 2.1x project success</p>
                            <p>• Cross-project collaboration improves efficiency</p>
                            <p>• Lead roles show 40% higher impact</p>
                            <p>• Optimal involvement: 60-80% per project</p>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">Optimization Tips</h4>
                        <div className="space-y-2">
                            {['Balance workload across projects', 'Assign lead roles strategically', 'Monitor involvement levels', 'Foster cross-project collaboration'].map((tip, index) => (
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
                            <li>• Involvement pattern analysis</li>
                            <li>• Workload optimization</li>
                            <li>• Project success prediction</li>
                            <li>• Role assignment optimization</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Matrix Features</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Real-time involvement tracking</li>
                            <li>• Cross-project visibility</li>
                            <li>• Impact measurement</li>
                            <li>• Resource allocation</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}