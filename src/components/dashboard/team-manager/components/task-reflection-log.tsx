"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import {
    FileText,
    Brain,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertTriangle,
    Zap,
    RefreshCw,
    Calendar,
    User,
    Star,
    Award,
    Lightbulb,
    MessageSquare
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

interface ReflectionLog {
    id: string
    memberId: string
    memberName: string
    taskName: string
    taskType: 'campaign' | 'project' | 'meeting' | 'analysis' | 'creative'
    completedAt: Date
    reflectionDate: Date
    whatWentWell: string
    whatCouldImprove: string
    lessonsLearned: string
    aiInsights: string
    teamLearnings: string[]
    impact: 'high' | 'medium' | 'low'
    timeSpent: number
    satisfaction: number
    status: 'draft' | 'submitted' | 'reviewed' | 'shared'
}

interface ReflectionLogProps {
    teamMembers: TeamMember[]
}

export function ReflectionLog({ teamMembers }: ReflectionLogProps) {
    const [reflections, setReflections] = useState<ReflectionLog[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [selectedMember, setSelectedMember] = useState<string | null>(null)
    const [showReflectionForm, setShowReflectionForm] = useState(false)
    const [currentReflection, setCurrentReflection] = useState({
        taskName: "",
        whatWentWell: "",
        whatCouldImprove: "",
        lessonsLearned: ""
    })

    // Mock reflection data
    const mockReflections: ReflectionLog[] = [
        {
            id: "1",
            memberId: "1",
            memberName: "Ahmed",
            taskName: "Facebook Ad Campaign - Summer Collection",
            taskType: "campaign",
            completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            reflectionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            whatWentWell: "Campaign exceeded KPIs by 25%. Creative assets performed exceptionally well. Audience targeting was precise.",
            whatCouldImprove: "Could have tested more ad variations. Budget allocation could be optimized further.",
            lessonsLearned: "Video content outperforms static images by 3x. Early morning posts get 40% more engagement.",
            aiInsights: "High-performing campaign with strong ROI. Key success factors: creative quality and precise targeting. Areas for improvement: A/B testing and budget optimization.",
            teamLearnings: [
                "Video content drives 3x higher engagement",
                "Early morning posting increases reach by 40%",
                "Precise audience targeting improves conversion by 25%"
            ],
            impact: "high",
            timeSpent: 12,
            satisfaction: 8,
            status: "shared"
        },
        {
            id: "2",
            memberId: "2",
            memberName: "Nada",
            taskName: "Customer Service Process Optimization",
            taskType: "project",
            completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            reflectionDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            whatWentWell: "Successfully reduced response time by 60%. Customer satisfaction increased by 35%.",
            whatCouldImprove: "Need better documentation of processes. Training could be more comprehensive.",
            lessonsLearned: "Automated responses work well for common queries. Personal touch still crucial for complex issues.",
            aiInsights: "Excellent process improvement with measurable results. Automation balanced with personalization is key.",
            teamLearnings: [
                "Automation reduces response time by 60%",
                "Personal touch crucial for complex issues",
                "Process documentation improves efficiency"
            ],
            impact: "high",
            timeSpent: 20,
            satisfaction: 9,
            status: "reviewed"
        },
        {
            id: "3",
            memberId: "3",
            memberName: "Omar",
            taskName: "Monthly Analytics Report",
            taskType: "analysis",
            completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            reflectionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            whatWentWell: "Report was comprehensive and well-received. Data visualization was clear and actionable.",
            whatCouldImprove: "Could include more predictive analytics. Report format could be more interactive.",
            lessonsLearned: "Visual data presentation increases stakeholder engagement. Regular reporting builds trust.",
            aiInsights: "Good analytical work with clear communication. Opportunity to add predictive insights and interactive elements.",
            teamLearnings: [
                "Visual data presentation increases engagement",
                "Regular reporting builds stakeholder trust",
                "Predictive analytics add significant value"
            ],
            impact: "medium",
            timeSpent: 8,
            satisfaction: 7,
            status: "submitted"
        }
    ]

    useEffect(() => {
        setReflections(mockReflections)
    }, [])

    const analyzeReflections = async () => {
        setIsAnalyzing(true)

        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 2000))

        const newInsights = await performAIAnalysis()
        setReflections(prev => prev.map(reflection => {
            const insight = newInsights.find(i => i.reflectionId === reflection.id)
            return insight ? { ...reflection, aiInsights: insight.insights, teamLearnings: insight.learnings } : reflection
        }))
        setIsAnalyzing(false)
    }

    const performAIAnalysis = async (): Promise<{ reflectionId: string, insights: string, learnings: string[] }[]> => {
        // Mock AI analysis - in real implementation, this would use OpenAI
        return reflections.map(reflection => ({
            reflectionId: reflection.id,
            insights: generateAIInsights(reflection),
            learnings: generateTeamLearnings(reflection)
        }))
    }

    const generateAIInsights = (reflection: ReflectionLog): string => {
        const satisfaction = reflection.satisfaction
        const impact = reflection.impact

        if (satisfaction >= 8 && impact === 'high') {
            return "Exceptional performance with high impact. Key success factors identified and ready for replication."
        } else if (satisfaction >= 6) {
            return "Good performance with room for improvement. Clear areas for optimization identified."
        } else {
            return "Performance needs attention. Focus on process improvement and skill development."
        }
    }

    const generateTeamLearnings = (reflection: ReflectionLog): string[] => {
        const learnings = []

        if (reflection.taskType === 'campaign') {
            learnings.push("Creative quality drives campaign performance")
            learnings.push("Precise targeting improves conversion rates")
        } else if (reflection.taskType === 'project') {
            learnings.push("Process optimization yields measurable results")
            learnings.push("Documentation improves team efficiency")
        } else if (reflection.taskType === 'analysis') {
            learnings.push("Visual data presentation increases engagement")
            learnings.push("Regular reporting builds stakeholder trust")
        }

        return learnings
    }

    const submitReflection = async () => {
        if (!selectedMember || !currentReflection.taskName.trim()) return

        const member = teamMembers.find(m => m.id === selectedMember)
        if (!member) return

        const newReflection: ReflectionLog = {
            id: `reflection-${Date.now()}`,
            memberId: selectedMember,
            memberName: member.name,
            taskName: currentReflection.taskName,
            taskType: "campaign",
            completedAt: new Date(),
            reflectionDate: new Date(),
            whatWentWell: currentReflection.whatWentWell,
            whatCouldImprove: currentReflection.whatCouldImprove,
            lessonsLearned: currentReflection.lessonsLearned,
            aiInsights: "AI analysis pending...",
            teamLearnings: [],
            impact: "medium",
            timeSpent: 0,
            satisfaction: 7,
            status: "draft"
        }

        setReflections(prev => [newReflection, ...prev])
        setCurrentReflection({
            taskName: "",
            whatWentWell: "",
            whatCouldImprove: "",
            lessonsLearned: ""
        })
        setShowReflectionForm(false)
        setSelectedMember(null)
    }

    const shareReflection = async (reflectionId: string) => {
        setReflections(prev => prev.map(reflection =>
            reflection.id === reflectionId
                ? { ...reflection, status: 'shared' as const }
                : reflection
        ))
    }

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'high': return 'bg-green-500 text-white'
            case 'medium': return 'bg-yellow-500 text-black'
            case 'low': return 'bg-red-500 text-white'
            default: return 'bg-gray-500 text-white'
        }
    }

    const getTaskTypeColor = (type: string) => {
        switch (type) {
            case 'campaign': return 'bg-blue-500 text-white'
            case 'project': return 'bg-purple-500 text-white'
            case 'analysis': return 'bg-green-500 text-white'
            case 'meeting': return 'bg-orange-500 text-white'
            case 'creative': return 'bg-pink-500 text-white'
            default: return 'bg-gray-500 text-white'
        }
    }

    const getSatisfactionColor = (satisfaction: number) => {
        if (satisfaction >= 8) return 'text-green-500'
        if (satisfaction >= 6) return 'text-yellow-500'
        return 'text-red-500'
    }

    const recentReflections = reflections.filter(r => r.status === 'shared' || r.status === 'reviewed')
    const pendingReflections = reflections.filter(r => r.status === 'draft' || r.status === 'submitted')
    const averageSatisfaction = reflections.length > 0
        ? reflections.reduce((sum, r) => sum + r.satisfaction, 0) / reflections.length
        : 0

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>Task Reflection Log</span>
                    </div>
                    <Button
                        onClick={analyzeReflections}
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
                                <Brain className="h-4 w-4 mr-2" />
                                AI Analysis
                            </>
                        )}
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-400">Total Reflections</p>
                                <p className="text-2xl font-bold text-blue-500">{reflections.length}</p>
                            </div>
                            <FileText className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-400">Shared</p>
                                <p className="text-2xl font-bold text-green-500">{recentReflections.length}</p>
                            </div>
                            <MessageSquare className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-yellow-400">Avg Satisfaction</p>
                                <p className={`text-2xl font-bold ${getSatisfactionColor(averageSatisfaction)}`}>
                                    {averageSatisfaction.toFixed(1)}/10
                                </p>
                            </div>
                            <Star className="h-8 w-8 text-yellow-500" />
                        </div>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-purple-400">Team Learnings</p>
                                <p className="text-2xl font-bold text-purple-500">
                                    {reflections.reduce((sum, r) => sum + r.teamLearnings.length, 0)}
                                </p>
                            </div>
                            <Lightbulb className="h-8 w-8 text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* Add Reflection Form */}
                <div className="bg-gradient-to-r from-blue-500/20 to-green-500/20 p-4 rounded-lg border border-blue-500/20">
                    <h3 className="text-lg font-semibold text-white mb-3">Add Task Reflection</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">Team Member</label>
                                <select
                                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
                                    value={selectedMember || ""}
                                    onChange={(e) => setSelectedMember(e.target.value)}
                                    aria-label="Select team member for reflection"
                                >
                                    <option value="">Choose a member...</option>
                                    {teamMembers.map(member => (
                                        <option key={member.id} value={member.id}>
                                            {member.name} - {member.role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">Task Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
                                    placeholder="Enter task name..."
                                    value={currentReflection.taskName}
                                    onChange={(e) => setCurrentReflection(prev => ({ ...prev, taskName: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">What went well?</label>
                            <Textarea
                                placeholder="Describe what went well in this task..."
                                value={currentReflection.whatWentWell}
                                onChange={(e) => setCurrentReflection(prev => ({ ...prev, whatWentWell: e.target.value }))}
                                className="bg-gray-800 border-gray-600 text-white"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">What could improve?</label>
                            <Textarea
                                placeholder="Describe areas for improvement..."
                                value={currentReflection.whatCouldImprove}
                                onChange={(e) => setCurrentReflection(prev => ({ ...prev, whatCouldImprove: e.target.value }))}
                                className="bg-gray-800 border-gray-600 text-white"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Lessons learned</label>
                            <Textarea
                                placeholder="What lessons did you learn from this task?"
                                value={currentReflection.lessonsLearned}
                                onChange={(e) => setCurrentReflection(prev => ({ ...prev, lessonsLearned: e.target.value }))}
                                className="bg-gray-800 border-gray-600 text-white"
                                rows={3}
                            />
                        </div>

                        <Button
                            onClick={submitReflection}
                            disabled={!selectedMember || !currentReflection.taskName.trim()}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            Submit Reflection
                        </Button>
                    </div>
                </div>

                {/* Recent Reflections */}
                {recentReflections.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Recent Reflections</h3>
                        {recentReflections.map((reflection) => (
                            <Alert key={reflection.id} className="border-blue-500/20 bg-blue-500/5">
                                <FileText className="h-4 w-4 text-blue-500" />
                                <AlertDescription className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-white">{reflection.memberName}</p>
                                            <p className="text-sm text-gray-400">{reflection.taskName}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Badge className={getTaskTypeColor(reflection.taskType)}>
                                                {reflection.taskType}
                                            </Badge>
                                            <Badge className={getImpactColor(reflection.impact)}>
                                                {reflection.impact} impact
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-400 mb-1">What went well:</p>
                                            <p className="text-white">{reflection.whatWentWell}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 mb-1">What could improve:</p>
                                            <p className="text-white">{reflection.whatCouldImprove}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 mb-1">Lessons learned:</p>
                                            <p className="text-white">{reflection.lessonsLearned}</p>
                                        </div>
                                    </div>

                                    <div className="bg-purple-500/10 p-3 rounded border border-purple-500/20">
                                        <p className="text-sm text-purple-400 font-medium">AI Insights:</p>
                                        <p className="text-sm text-white">{reflection.aiInsights}</p>
                                    </div>

                                    {reflection.teamLearnings.length > 0 && (
                                        <div>
                                            <p className="text-sm text-gray-400 font-medium mb-2">Team Learnings:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {reflection.teamLearnings.map((learning, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs bg-green-500/10 text-green-400">
                                                        {learning}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <span>Time: {reflection.timeSpent}h</span>
                                            <span className={`${getSatisfactionColor(reflection.satisfaction)}`}>
                                                Satisfaction: {reflection.satisfaction}/10
                                            </span>
                                        </div>
                                        <Button
                                            size="sm"
                                            onClick={() => shareReflection(reflection.id)}
                                            disabled={reflection.status === 'shared'}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            <MessageSquare className="h-4 w-4 mr-1" />
                                            {reflection.status === 'shared' ? 'Shared' : 'Share'}
                                        </Button>
                                    </div>
                                </AlertDescription>
                            </Alert>
                        ))}
                    </div>
                )}

                {/* Reflection Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">Reflection Insights</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p>• 85% of reflections lead to process improvements</p>
                            <p>• Average satisfaction: 7.8/10</p>
                            <p>• Most common improvement area: Communication</p>
                            <p>• AI analysis accuracy: 92%</p>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">Top Learnings</h4>
                        <div className="space-y-2">
                            {['Video content drives 3x engagement', 'Process documentation improves efficiency', 'Personal touch crucial for complex issues'].map((learning, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Lightbulb className="h-3 w-3 text-yellow-500" />
                                    <span className="text-sm text-white">{learning}</span>
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
                            <li>• Pattern recognition</li>
                            <li>• Insight generation</li>
                            <li>• Learning extraction</li>
                            <li>• Process optimization</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Reflection Features</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Structured reflection prompts</li>
                            <li>• Team learning sharing</li>
                            <li>• Impact assessment</li>
                            <li>• Process improvement tracking</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 