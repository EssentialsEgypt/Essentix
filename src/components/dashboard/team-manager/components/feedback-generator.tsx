"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import {
    MessageSquare,
    Brain,
    Send,
    Clock,
    CheckCircle,
    AlertTriangle,
    Zap,
    RefreshCw,
    Calendar,
    User,
    Star,
    TrendingUp
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

interface FeedbackData {
    id: string
    memberId: string
    memberName: string
    generatedAt: Date
    scheduledFor: Date
    status: 'draft' | 'scheduled' | 'sent' | 'delivered' | 'read'
    feedbackType: 'weekly' | 'performance' | 'improvement' | 'recognition'
    content: string
    aiGenerated: boolean
    strengths: string[]
    areas: string[]
    recommendations: string[]
    tone: 'positive' | 'constructive' | 'neutral'
    priority: 'low' | 'medium' | 'high'
}

interface FeedbackGeneratorProps {
    teamMembers: TeamMember[]
}

export function FeedbackGenerator({ teamMembers }: FeedbackGeneratorProps) {
    const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([])
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedMember, setSelectedMember] = useState<string | null>(null)
    const [customFeedback, setCustomFeedback] = useState("")
    const [showCustomForm, setShowCustomForm] = useState(false)

    // Mock feedback data
    const mockFeedbacks: FeedbackData[] = [
        {
            id: "1",
            memberId: "1",
            memberName: "Ahmed",
            generatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            scheduledFor: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            status: "scheduled",
            feedbackType: "weekly",
            content: "You handled the campaign fast. Next week: improve follow-ups.",
            aiGenerated: true,
            strengths: ["Fast execution", "Good communication", "Team collaboration"],
            areas: ["Follow-up consistency", "Documentation", "Process optimization"],
            recommendations: ["Set up automated follow-up reminders", "Create templates for common responses", "Schedule weekly process reviews"],
            tone: "constructive",
            priority: "medium"
        },
        {
            id: "2",
            memberId: "2",
            memberName: "Nada",
            generatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            status: "draft",
            feedbackType: "recognition",
            content: "Outstanding performance this week! Your attention to detail and proactive approach have significantly improved our campaign results.",
            aiGenerated: true,
            strengths: ["Attention to detail", "Proactive approach", "Results-driven"],
            areas: [],
            recommendations: ["Share best practices with team", "Consider mentoring opportunities", "Continue current excellence"],
            tone: "positive",
            priority: "high"
        },
        {
            id: "3",
            memberId: "3",
            memberName: "Omar",
            generatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            scheduledFor: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            status: "scheduled",
            feedbackType: "improvement",
            content: "Great effort on the project. To improve: focus on deadline management and team communication.",
            aiGenerated: true,
            strengths: ["Technical skills", "Problem solving", "Creativity"],
            areas: ["Deadline management", "Team communication", "Time prioritization"],
            recommendations: ["Use project management tools", "Schedule regular check-ins", "Break tasks into smaller milestones"],
            tone: "constructive",
            priority: "high"
        }
    ]

    useEffect(() => {
        setFeedbacks(mockFeedbacks)
    }, [])

    const generateWeeklyFeedback = async () => {
        setIsGenerating(true)

        // Simulate AI generation
        await new Promise(resolve => setTimeout(resolve, 2000))

        const newFeedbacks = await performAIGeneration()
        setFeedbacks(prev => [...newFeedbacks, ...prev])
        setIsGenerating(false)
    }

    const performAIGeneration = async (): Promise<FeedbackData[]> => {
        // Mock AI generation - in real implementation, this would use OpenAI
        const newFeedbacks: FeedbackData[] = []

        teamMembers.forEach(member => {
            const feedback = generateFeedbackForMember(member)
            if (feedback) {
                newFeedbacks.push(feedback)
            }
        })

        return newFeedbacks
    }

    const generateFeedbackForMember = (member: TeamMember): FeedbackData | null => {
        // Check if feedback already exists for this week
        const existingFeedback = feedbacks.find(f =>
            f.memberId === member.id &&
            f.feedbackType === 'weekly' &&
            new Date(f.generatedAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
        )

        if (existingFeedback) return null

        const performance = member.completedTasks / (member.openTasks + member.completedTasks)
        const tone = performance > 0.8 ? 'positive' : performance > 0.6 ? 'constructive' : 'constructive'

        let content = ""
        let strengths: string[] = []
        let areas: string[] = []
        let recommendations: string[] = []

        if (performance > 0.8) {
            content = `Excellent work this week, ${member.name}! Your high completion rate and quality output have been outstanding.`
            strengths = ["High productivity", "Quality work", "Reliability"]
            recommendations = ["Share best practices", "Consider mentoring", "Maintain excellence"]
        } else if (performance > 0.6) {
            content = `Good work this week, ${member.name}. You've made solid progress. Focus on improving follow-ups and communication.`
            strengths = ["Consistent effort", "Good progress", "Team player"]
            areas = ["Follow-up consistency", "Communication", "Process efficiency"]
            recommendations = ["Set up reminders", "Improve documentation", "Regular check-ins"]
        } else {
            content = `Keep pushing forward, ${member.name}. We've identified areas for improvement to help you succeed.`
            strengths = ["Willingness to learn", "Team collaboration", "Adaptability"]
            areas = ["Task prioritization", "Time management", "Deadline adherence"]
            recommendations = ["Use task management tools", "Break down complex tasks", "Schedule regular reviews"]
        }

        return {
            id: `feedback-${Date.now()}-${member.id}`,
            memberId: member.id,
            memberName: member.name,
            generatedAt: new Date(),
            scheduledFor: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            status: "draft",
            feedbackType: "weekly",
            content,
            aiGenerated: true,
            strengths,
            areas,
            recommendations,
            tone,
            priority: performance > 0.8 ? 'high' : performance > 0.6 ? 'medium' : 'high'
        }
    }

    const sendFeedback = async (feedbackId: string) => {
        setFeedbacks(prev => prev.map(feedback =>
            feedback.id === feedbackId
                ? { ...feedback, status: 'sent' as const }
                : feedback
        ))

        // Simulate delivery
        setTimeout(() => {
            setFeedbacks(prev => prev.map(feedback =>
                feedback.id === feedbackId
                    ? { ...feedback, status: 'delivered' as const }
                    : feedback
            ))
        }, 1000)
    }

    const scheduleFeedback = async (feedbackId: string, scheduledFor: Date) => {
        setFeedbacks(prev => prev.map(feedback =>
            feedback.id === feedbackId
                ? { ...feedback, status: 'scheduled' as const, scheduledFor }
                : feedback
        ))
    }

    const editFeedback = async (feedbackId: string, content: string) => {
        setFeedbacks(prev => prev.map(feedback =>
            feedback.id === feedbackId
                ? { ...feedback, content, aiGenerated: false }
                : feedback
        ))
    }

    const submitCustomFeedback = async () => {
        if (!selectedMember || !customFeedback.trim()) return

        const member = teamMembers.find(m => m.id === selectedMember)
        if (!member) return

        const newFeedback: FeedbackData = {
            id: `custom-${Date.now()}`,
            memberId: selectedMember,
            memberName: member.name,
            generatedAt: new Date(),
            scheduledFor: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            status: "draft",
            feedbackType: "performance",
            content: customFeedback,
            aiGenerated: false,
            strengths: [],
            areas: [],
            recommendations: [],
            tone: "constructive",
            priority: "medium"
        }

        setFeedbacks(prev => [newFeedback, ...prev])
        setCustomFeedback("")
        setShowCustomForm(false)
        setSelectedMember(null)
    }

    const getToneColor = (tone: string) => {
        switch (tone) {
            case 'positive': return 'text-green-500'
            case 'constructive': return 'text-yellow-500'
            case 'neutral': return 'text-gray-500'
            default: return 'text-gray-500'
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-500 text-white'
            case 'medium': return 'bg-yellow-500 text-black'
            case 'low': return 'bg-green-500 text-white'
            default: return 'bg-gray-500 text-white'
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'sent': return 'text-blue-500'
            case 'delivered': return 'text-green-500'
            case 'read': return 'text-purple-500'
            case 'scheduled': return 'text-yellow-500'
            case 'draft': return 'text-gray-500'
            default: return 'text-gray-500'
        }
    }

    const pendingFeedbacks = feedbacks.filter(f => f.status === 'draft' || f.status === 'scheduled')
    const sentFeedbacks = feedbacks.filter(f => f.status === 'sent' || f.status === 'delivered')

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5" />
                        <span>AI Feedback Generator</span>
                    </div>
                    <Button
                        onClick={generateWeeklyFeedback}
                        disabled={isGenerating}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {isGenerating ? (
                            <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Brain className="h-4 w-4 mr-2" />
                                Generate Weekly
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
                                <p className="text-sm text-blue-400">Pending</p>
                                <p className="text-2xl font-bold text-blue-500">{pendingFeedbacks.length}</p>
                            </div>
                            <Clock className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-400">Sent</p>
                                <p className="text-2xl font-bold text-green-500">{sentFeedbacks.length}</p>
                            </div>
                            <Send className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-purple-400">AI Generated</p>
                                <p className="text-2xl font-bold text-purple-500">
                                    {feedbacks.filter(f => f.aiGenerated).length}
                                </p>
                            </div>
                            <Brain className="h-8 w-8 text-purple-500" />
                        </div>
                    </div>
                    <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-yellow-400">Avg Response</p>
                                <p className="text-2xl font-bold text-yellow-500">2.1h</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-yellow-500" />
                        </div>
                    </div>
                </div>

                {/* Custom Feedback Form */}
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4 rounded-lg border border-green-500/20">
                    <h3 className="text-lg font-semibold text-white mb-3">Custom Feedback</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">Select Team Member</label>
                                <select
                                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
                                    value={selectedMember || ""}
                                    onChange={(e) => setSelectedMember(e.target.value)}
                                    aria-label="Select team member for feedback"
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
                                <label className="text-sm text-gray-400 mb-2 block">Feedback Type</label>
                                <select
                                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
                                    aria-label="Select feedback type"
                                >
                                    <option value="performance">Performance</option>
                                    <option value="recognition">Recognition</option>
                                    <option value="improvement">Improvement</option>
                                    <option value="weekly">Weekly</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Feedback Content</label>
                            <Textarea
                                placeholder="Write your feedback here..."
                                value={customFeedback}
                                onChange={(e) => setCustomFeedback(e.target.value)}
                                className="bg-gray-800 border-gray-600 text-white"
                                rows={4}
                            />
                        </div>
                        <Button
                            onClick={submitCustomFeedback}
                            disabled={!selectedMember || !customFeedback.trim()}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <Send className="h-4 w-4 mr-2" />
                            Send Feedback
                        </Button>
                    </div>
                </div>

                {/* Pending Feedbacks */}
                {pendingFeedbacks.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Pending Feedbacks</h3>
                        {pendingFeedbacks.map((feedback) => (
                            <Alert key={feedback.id} className="border-blue-500/20 bg-blue-500/5">
                                <MessageSquare className="h-4 w-4 text-blue-500" />
                                <AlertDescription className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-white">{feedback.memberName}</p>
                                            <p className="text-sm text-gray-400">{feedback.feedbackType}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Badge className={getPriorityColor(feedback.priority)}>
                                                {feedback.priority}
                                            </Badge>
                                            <Badge variant="outline" className={getToneColor(feedback.tone)}>
                                                {feedback.tone}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="bg-gray-800/50 p-3 rounded border border-gray-600">
                                        <p className="text-sm text-white">{feedback.content}</p>
                                    </div>

                                    {feedback.aiGenerated && (
                                        <div className="space-y-2">
                                            {feedback.strengths.length > 0 && (
                                                <div>
                                                    <p className="text-sm text-green-400 font-medium">Strengths:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {feedback.strengths.map((strength, index) => (
                                                            <Badge key={index} variant="outline" className="text-xs bg-green-500/10 text-green-400">
                                                                {strength}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {feedback.areas.length > 0 && (
                                                <div>
                                                    <p className="text-sm text-yellow-400 font-medium">Areas for Improvement:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {feedback.areas.map((area, index) => (
                                                            <Badge key={index} variant="outline" className="text-xs bg-yellow-500/10 text-yellow-400">
                                                                {area}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {feedback.recommendations.length > 0 && (
                                                <div>
                                                    <p className="text-sm text-blue-400 font-medium">Recommendations:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {feedback.recommendations.map((rec, index) => (
                                                            <Badge key={index} variant="outline" className="text-xs bg-blue-500/10 text-blue-400">
                                                                {rec}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            onClick={() => sendFeedback(feedback.id)}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            <Send className="h-4 w-4 mr-1" />
                                            Send Now
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => scheduleFeedback(feedback.id, new Date(Date.now() + 24 * 60 * 60 * 1000))}
                                            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                                        >
                                            <Calendar className="h-4 w-4 mr-1" />
                                            Schedule
                                        </Button>
                                    </div>
                                </AlertDescription>
                            </Alert>
                        ))}
                    </div>
                )}

                {/* Recent Sent Feedbacks */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Recent Feedbacks</h3>
                    <div className="space-y-3">
                        {sentFeedbacks.slice(0, 5).map((feedback) => (
                            <div key={feedback.id} className="bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <User className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <p className="font-medium text-white">{feedback.memberName}</p>
                                            <p className="text-sm text-gray-400">
                                                {feedback.generatedAt.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getStatusColor(feedback.status)}>
                                            {feedback.status}
                                        </Badge>
                                        {feedback.aiGenerated && (
                                            <Brain className="h-4 w-4 text-purple-500" />
                                        )}
                                    </div>
                                </div>

                                <p className="text-sm text-gray-300 mb-3">&quot;{feedback.content}&quot;</p>

                                <div className="flex items-center justify-between text-xs text-gray-400">
                                    <span>{feedback.feedbackType}</span>
                                    <span>{feedback.tone} tone</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Automated Features</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Weekly feedback generation</li>
                            <li>• Performance analysis</li>
                            <li>• Tone optimization</li>
                            <li>• Smart scheduling</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">AI Capabilities</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Personalized content</li>
                            <li>• Context-aware feedback</li>
                            <li>• Performance tracking</li>
                            <li>• Improvement suggestions</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 