"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import {
    Users, UserPlus, TrendingUp, Award, Calendar, MessageSquare,
    Activity, Heart, Brain, Shield, Target, Zap, Star, Clock,
    AlertTriangle, CheckCircle, XCircle, Plus, Settings, BarChart3,
    RefreshCw, Eye, EyeOff, Lock, Unlock, Crown, Gift,
    Users2, UserCheck, UserX, UserMinus, UserPlus2, UserCog
} from "lucide-react"

// Import all sub-modules
import { TeamMembersDirectory } from "./components/team-members-directory"
import { PerformanceTracker } from "./components/performance-tracker"
import { RewardBonusEngine } from "./components/reward-bonus-engine"
import { MeetingManager } from "./components/meeting-manager"
import { ChatSystem } from "./components/chat-system"
import { AttendanceActivityHeatmap } from "./components/attendance-activity-heatmap"
import { WeeklyMoodCheck } from "./components/weekly-mood-check"
import { WorkloadBalancer } from "./components/workload-balancer"
import { ConflictRadar } from "./components/conflict-radar"
import { AIMoodStressTracker } from "./components/ai-mood-stress-tracker"
import { FeedbackGenerator } from "./components/feedback-generator"
import { ROITracker } from "./components/roi-tracker"
import { LearningTracker } from "./components/learning-tracker"
import { PrivateVault } from "./components/private-vault"
import { ReflectionLog } from "./components/task-reflection-log"
import { DecisionLogSystem } from "./components/decision-log-system"
import { HighlightsBoard } from "./components/highlights-board"
import { PulsePolls } from "./components/pulse-polls"
import { ProjectInvolvementMatrix } from "./components/project-involvement-matrix"
import { FocusMode } from "./components/focus-mode"
import { DistractionTracker } from "./components/distraction-tracker"
import { RoleMatchingSystem } from "./components/role-matching-system"
import { MotivationDrivers } from "./components/motivation-drivers"
import { MentorshipMatcher } from "./components/mentorship-matcher"
import { LeadershipLens } from "./components/leadership-lens"
import { BurnoutRadar } from "./components/burnout-radar"
import { AnonymousFeedbackEngine } from "./components/anonymous-feedback-engine"
import { CostValueAnalysis } from "./components/cost-value-analysis"
import { AISmartSuggestionsEngine } from "./components/ai-smart-suggestions-engine"
import { AIMicroSprintMode } from "./components/ai-micro-sprint-mode"
import { ExternalSync } from "./components/external-sync"

// Types
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

interface TeamStats {
    totalMembers: number
    activeMembers: number
    averagePerformance: number
    totalROI: number
    averageMood: number
    activeMeetings: number
    pendingTasks: number
    conflictsDetected: number
    burnoutAlerts: number
}

function TeamManager() {
    const [activeTab, setActiveTab] = useState("overview")
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
    const [teamStats, setTeamStats] = useState<TeamStats | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)
    const [focusModeEnabled, setFocusModeEnabled] = useState(false)

    const loadTeamData = async () => {
        setIsLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Mock data for demonstration
            const mockMembers: TeamMember[] = [
                {
                    id: '1',
                    name: 'Ahmed Hassan',
                    role: 'Senior Campaign Manager',
                    status: 'active',
                    avatar: '/avatars/ahmed.jpg',
                    email: 'ahmed@essentials.com',
                    phone: '+20 100 123 4567',
                    joinDate: new Date('2023-01-15'),
                    aiMotivationType: 'Achievement-Driven',
                    strengths: ['Campaign Strategy', 'Client Relations', 'Analytics'],
                    currentStressLevel: 25,
                    lastTasks: ['Campaign A Optimization', 'Client Meeting', 'ROI Analysis'],
                    openTasks: 3,
                    completedTasks: 156,
                    campaignsInvolved: 12,
                    meetingAttendance: 95,
                    responseSpeed: 92,
                    deadlineCompliance: 98,
                    salary: 15000,
                    toolCost: 2000,
                    revenueImpact: 95000,
                    roi: 5.6,
                    mood: 'positive',
                    burnoutRisk: 15,
                    focusMode: false,
                    lastActive: new Date(),
                    timeSpent: 42,
                    skills: ['Facebook Ads', 'Google Ads', 'Analytics'],
                    desiredSkills: ['TikTok Ads', 'Advanced Analytics'],
                    menteeIds: ['2', '3'],
                    permissions: ['admin', 'campaign_manager'],
                    motivationDrivers: ['Recognition', 'Challenge', 'Money']
                },
                {
                    id: '2',
                    name: 'Nada El-Sayed',
                    role: 'Content Creator',
                    status: 'focus',
                    avatar: '/avatars/nada.jpg',
                    email: 'nada@essentials.com',
                    phone: '+20 100 123 4568',
                    joinDate: new Date('2023-03-20'),
                    aiMotivationType: 'Creative-Expression',
                    strengths: ['Content Creation', 'Visual Design', 'Trend Analysis'],
                    currentStressLevel: 35,
                    lastTasks: ['Instagram Reel', 'Brand Guidelines', 'Content Calendar'],
                    openTasks: 5,
                    completedTasks: 89,
                    campaignsInvolved: 8,
                    meetingAttendance: 88,
                    responseSpeed: 85,
                    deadlineCompliance: 92,
                    salary: 12000,
                    toolCost: 1500,
                    revenueImpact: 65000,
                    roi: 4.8,
                    mood: 'neutral',
                    burnoutRisk: 25,
                    focusMode: true,
                    lastActive: new Date(),
                    timeSpent: 38,
                    skills: ['Adobe Creative Suite', 'Social Media', 'Copywriting'],
                    desiredSkills: ['Video Editing', 'Motion Graphics'],
                    mentorId: '1',
                    menteeIds: [],
                    permissions: ['content_creator'],
                    motivationDrivers: ['Autonomy', 'Recognition', 'Challenge']
                },
                {
                    id: '3',
                    name: 'Omar Khalil',
                    role: 'Data Analyst',
                    status: 'active',
                    avatar: '/avatars/omar.jpg',
                    email: 'omar@essentials.com',
                    phone: '+20 100 123 4569',
                    joinDate: new Date('2023-02-10'),
                    aiMotivationType: 'Problem-Solver',
                    strengths: ['Data Analysis', 'Reporting', 'Automation'],
                    currentStressLevel: 20,
                    lastTasks: ['Monthly Report', 'KPI Dashboard', 'Data Cleanup'],
                    openTasks: 2,
                    completedTasks: 234,
                    campaignsInvolved: 15,
                    meetingAttendance: 98,
                    responseSpeed: 96,
                    deadlineCompliance: 99,
                    salary: 14000,
                    toolCost: 1800,
                    revenueImpact: 110000,
                    roi: 6.2,
                    mood: 'positive',
                    burnoutRisk: 10,
                    focusMode: false,
                    lastActive: new Date(),
                    timeSpent: 45,
                    skills: ['SQL', 'Python', 'Tableau', 'Excel'],
                    desiredSkills: ['Machine Learning', 'Advanced SQL'],
                    mentorId: '1',
                    menteeIds: [],
                    permissions: ['data_analyst'],
                    motivationDrivers: ['Challenge', 'Autonomy', 'Money']
                },
                {
                    id: '4',
                    name: 'Farouk Ali',
                    role: 'Junior Campaign Manager',
                    status: 'away',
                    avatar: '/avatars/farouk.jpg',
                    email: 'farouk@essentials.com',
                    phone: '+20 100 123 4570',
                    joinDate: new Date('2023-06-01'),
                    aiMotivationType: 'Growth-Seeker',
                    strengths: ['Quick Learning', 'Team Collaboration', 'Execution'],
                    currentStressLevel: 45,
                    lastTasks: ['Campaign Setup', 'Ad Copy Testing', 'Performance Review'],
                    openTasks: 7,
                    completedTasks: 67,
                    campaignsInvolved: 6,
                    meetingAttendance: 82,
                    responseSpeed: 78,
                    deadlineCompliance: 85,
                    salary: 9000,
                    toolCost: 1200,
                    revenueImpact: 35000,
                    roi: 3.2,
                    mood: 'negative',
                    burnoutRisk: 40,
                    focusMode: false,
                    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
                    timeSpent: 35,
                    skills: ['Facebook Ads', 'Basic Analytics', 'Client Communication'],
                    desiredSkills: ['Advanced Analytics', 'Campaign Strategy'],
                    mentorId: '1',
                    menteeIds: [],
                    permissions: ['junior_campaign_manager'],
                    motivationDrivers: ['Growth', 'Recognition', 'Money']
                }
            ]

            const mockStats: TeamStats = {
                totalMembers: 4,
                activeMembers: 3,
                averagePerformance: 89.5,
                totalROI: 4.95,
                averageMood: 75,
                activeMeetings: 2,
                pendingTasks: 17,
                conflictsDetected: 1,
                burnoutAlerts: 2
            }

            setTeamMembers(mockMembers)
            setTeamStats(mockStats)
        } catch (error) {
            console.error('Failed to load team data:', error)
            setLoadError('Failed to load team data. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Load team data
    useEffect(() => {
        loadTeamData()
    }, [])

    const handleRefresh = () => {
        loadTeamData()
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="flex items-center space-x-3 p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/20">
                    <RefreshCw className="h-6 w-6 animate-spin text-pink-400" />
                    <span className="text-white font-semibold">Loading Team Manager...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/20">
                <div>
                    <h1 className="text-3xl font-bold text-white">🧠 TEAM MANAGER - UNIQUE CONTENT</h1>
                    <p className="text-gray-300">AI-Powered Team Management & Performance Tracking</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={handleRefresh} size="sm" variant="default" className="transition-all duration-200">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                    <Button size="sm" variant="outline" className="transition-all duration-200">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Member
                    </Button>
                </div>
            </div>

            {/* Error Alert */}
            {loadError && (
                <Alert className="bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/30 backdrop-blur-xl">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <AlertDescription className="text-red-200">
                        {loadError}
                    </AlertDescription>
                </Alert>
            )}

            {/* Team Stats Overview */}
            {teamStats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="relative hover:scale-105 transition-all duration-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-300">Team Members</p>
                                    <p className="text-2xl font-bold text-white">{teamStats.totalMembers}</p>
                                    <p className="text-sm text-green-400">{teamStats.activeMembers} active</p>
                                </div>
                                <Users className="h-8 w-8 text-blue-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative hover:scale-105 transition-all duration-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-300">Avg Performance</p>
                                    <p className="text-2xl font-bold text-white">{teamStats.averagePerformance}%</p>
                                    <Progress value={teamStats.averagePerformance} className="mt-2" />
                                </div>
                                <TrendingUp className="h-8 w-8 text-green-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative hover:scale-105 transition-all duration-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-300">Team ROI</p>
                                    <p className="text-2xl font-bold text-white">{teamStats.totalROI}x</p>
                                    <p className="text-sm text-green-400">+0.3x this week</p>
                                </div>
                                <Award className="h-8 w-8 text-yellow-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative hover:scale-105 transition-all duration-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-300">Team Mood</p>
                                    <p className="text-2xl font-bold text-white">{teamStats.averageMood}%</p>
                                    <p className="text-sm text-blue-400">Positive trend</p>
                                </div>
                                <Heart className="h-8 w-8 text-pink-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 p-1 rounded-xl">
                    <TabsTrigger value="overview" className="transition-all duration-200">Overview</TabsTrigger>
                    <TabsTrigger value="members" className="transition-all duration-200">Team Members</TabsTrigger>
                    <TabsTrigger value="performance" className="transition-all duration-200">Performance</TabsTrigger>
                    <TabsTrigger value="rewards" className="transition-all duration-200">Rewards</TabsTrigger>
                    <TabsTrigger value="meetings" className="transition-all duration-200">Meetings</TabsTrigger>
                    <TabsTrigger value="chat" className="transition-all duration-200">Team Chat</TabsTrigger>
                    <TabsTrigger value="analytics" className="transition-all duration-200">Analytics</TabsTrigger>
                    <TabsTrigger value="ai" className="transition-all duration-200">AI Tools</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                        <h2 className="text-2xl font-bold text-white mb-4">🎯 TEAM MANAGER OVERVIEW</h2>
                        <p className="text-gray-300 mb-4">This is the unique Team Manager interface - NOT the AI Business Dashboard!</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5" />
                                    <span>Team Quick Actions</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full justify-start" variant="outline">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Schedule Team Meeting
                                </Button>
                                <Button className="w-full justify-start" variant="outline">
                                    <Award className="h-4 w-4 mr-2" />
                                    Give Recognition
                                </Button>
                                <Button className="w-full justify-start" variant="outline">
                                    <Brain className="h-4 w-4 mr-2" />
                                    Generate AI Insights
                                </Button>
                                <Button className="w-full justify-start" variant="outline">
                                    <Users2 className="h-4 w-4 mr-2" />
                                    Add New Member
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Alerts & Notifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <AlertTriangle className="h-5 w-5" />
                                    <span>Alerts & Notifications</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                                    <div>
                                        <p className="text-sm font-medium text-red-400">Burnout Risk</p>
                                        <p className="text-xs text-gray-400">Farouk shows high stress levels</p>
                                    </div>
                                    <Badge variant="destructive">High</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                    <div>
                                        <p className="text-sm font-medium text-yellow-400">Meeting Reminder</p>
                                        <p className="text-xs text-gray-400">Weekly sync in 30 minutes</p>
                                    </div>
                                    <Badge variant="secondary">Medium</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                                    <div>
                                        <p className="text-sm font-medium text-green-400">Achievement</p>
                                        <p className="text-xs text-gray-400">Ahmed completed 5 tasks today</p>
                                    </div>
                                    <Badge variant="default">Low</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Members Tab */}
                <TabsContent value="members" className="space-y-4">
                    <TeamMembersDirectory teamMembers={teamMembers} />
                </TabsContent>

                {/* Performance Tab */}
                <TabsContent value="performance" className="space-y-4">
                    <PerformanceTracker teamMembers={teamMembers} />
                </TabsContent>

                {/* Rewards Tab */}
                <TabsContent value="rewards" className="space-y-4">
                    <RewardBonusEngine teamMembers={teamMembers} />
                </TabsContent>

                {/* Meetings Tab */}
                <TabsContent value="meetings" className="space-y-4">
                    <MeetingManager teamMembers={teamMembers} />
                </TabsContent>

                {/* Chat Tab */}
                <TabsContent value="chat" className="space-y-4">
                    <ChatSystem teamMembers={teamMembers} />
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <AttendanceActivityHeatmap teamMembers={teamMembers} />
                        <WeeklyMoodCheck teamMembers={teamMembers} />
                        <WorkloadBalancer teamMembers={teamMembers} />
                        <ROITracker teamMembers={teamMembers} />
                        <CostValueAnalysis teamMembers={teamMembers} />
                        <ProjectInvolvementMatrix teamMembers={teamMembers} />
                    </div>
                </TabsContent>

                {/* AI Tools Tab */}
                <TabsContent value="ai" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <ConflictRadar teamMembers={teamMembers} />
                        <AIMoodStressTracker teamMembers={teamMembers} />
                        <FeedbackGenerator teamMembers={teamMembers} />
                        <LearningTracker teamMembers={teamMembers} />
                        <ReflectionLog teamMembers={teamMembers} />
                        <DecisionLogSystem teamMembers={teamMembers} />
                        <HighlightsBoard teamMembers={teamMembers} />
                        <PulsePolls teamMembers={teamMembers} />
                        <FocusMode teamMembers={teamMembers} />
                        <DistractionTracker teamMembers={teamMembers} />
                        <RoleMatchingSystem teamMembers={teamMembers} />
                        <MotivationDrivers teamMembers={teamMembers} />
                        <MentorshipMatcher teamMembers={teamMembers} />
                        <LeadershipLens teamMembers={teamMembers} />
                        <BurnoutRadar teamMembers={teamMembers} />
                        <AnonymousFeedbackEngine teamMembers={teamMembers} />
                        <AISmartSuggestionsEngine teamMembers={teamMembers} />
                        <AIMicroSprintMode teamMembers={teamMembers} />
                        <PrivateVault teamMembers={teamMembers} />
                        <ExternalSync teamMembers={teamMembers} />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export { TeamManager } 