"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
    User, Mail, Phone, Calendar, Brain, Target, Activity,
    TrendingUp, TrendingDown, Clock, Star, Heart, AlertTriangle,
    MessageSquare, Video, Mail as MailIcon, Settings, Crown,
    Users, Award, Zap, Eye, EyeOff, Lock, Unlock, CheckCircle
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

interface TeamMembersDirectoryProps {
    teamMembers: TeamMember[]
}

export function TeamMembersDirectory({ teamMembers }: TeamMembersDirectoryProps) {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [filterStatus, setFilterStatus] = useState<string>('all')

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-600 bg-green-100'
            case 'away': return 'text-yellow-600 bg-yellow-100'
            case 'offline': return 'text-gray-600 bg-gray-100'
            case 'focus': return 'text-purple-600 bg-purple-100'
            default: return 'text-gray-600 bg-gray-100'
        }
    }

    const getMoodColor = (mood: string) => {
        switch (mood) {
            case 'positive': return 'text-green-600 bg-green-100'
            case 'neutral': return 'text-yellow-600 bg-yellow-100'
            case 'negative': return 'text-red-600 bg-red-100'
            default: return 'text-gray-600 bg-gray-100'
        }
    }

    const getBurnoutRiskColor = (risk: number) => {
        if (risk < 20) return 'text-green-600 bg-green-100'
        if (risk < 40) return 'text-yellow-600 bg-yellow-100'
        return 'text-red-600 bg-red-100'
    }

    const getBurnoutRiskLevel = (risk: number) => {
        if (risk < 20) return 'Low'
        if (risk < 40) return 'Medium'
        return 'High'
    }

    const filteredMembers = teamMembers.filter(member => {
        if (filterStatus === 'all') return true
        return member.status === filterStatus
    })

    const MemberProfileDialog = ({ member }: { member: TeamMember }) => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-bold">{member.name}</h2>
                            <p className="text-gray-500">{member.role}</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{member.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{member.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">Joined {member.joinDate.toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Brain className="h-4 w-4 text-blue-400" />
                                <span className="text-sm font-medium">AI Motivation: {member.aiMotivationType}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Target className="h-4 w-4 text-green-400" />
                                <span className="text-sm font-medium">ROI: {member.roi}x</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Activity className="h-4 w-4 text-purple-400" />
                                <span className="text-sm font-medium">Time Spent: {member.timeSpent}h/week</span>
                            </div>
                        </div>
                    </div>

                    {/* Strengths */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Strengths</h3>
                        <div className="flex flex-wrap gap-2">
                            {member.strengths.map((strength, index) => (
                                <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                                    {strength}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Current Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {member.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Desired Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {member.desiredSkills.map((skill, index) => (
                                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Motivation Drivers */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Motivation Drivers</h3>
                        <div className="flex flex-wrap gap-2">
                            {member.motivationDrivers.map((driver, index) => (
                                <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700">
                                    {driver}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Recent Tasks */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Recent Tasks</h3>
                        <div className="space-y-2">
                            {member.lastTasks.map((task, index) => (
                                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">{task}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Performance Metrics</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm">Response Speed</span>
                                    <span className="text-sm font-medium">{member.responseSpeed}%</span>
                                </div>
                                <Progress value={member.responseSpeed} className="h-2" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm">Deadline Compliance</span>
                                    <span className="text-sm font-medium">{member.deadlineCompliance}%</span>
                                </div>
                                <Progress value={member.deadlineCompliance} className="h-2" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm">Meeting Attendance</span>
                                    <span className="text-sm font-medium">{member.meetingAttendance}%</span>
                                </div>
                                <Progress value={member.meetingAttendance} className="h-2" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm">Stress Level</span>
                                    <span className="text-sm font-medium">{member.currentStressLevel}%</span>
                                </div>
                                <Progress value={member.currentStressLevel} className="h-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Team Members Directory</h2>
                    <p className="text-gray-300">Manage and view all team members</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                    >
                        <div className="grid grid-cols-2 gap-1 h-4 w-4">
                            <div className="bg-current rounded-sm" />
                            <div className="bg-current rounded-sm" />
                            <div className="bg-current rounded-sm" />
                            <div className="bg-current rounded-sm" />
                        </div>
                    </Button>
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                    >
                        <div className="space-y-1 h-4 w-4">
                            <div className="bg-current rounded-sm h-1" />
                            <div className="bg-current rounded-sm h-1" />
                            <div className="bg-current rounded-sm h-1" />
                        </div>
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
                <Badge
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFilterStatus('all')}
                >
                    All ({teamMembers.length})
                </Badge>
                <Badge
                    variant={filterStatus === 'active' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFilterStatus('active')}
                >
                    Active ({teamMembers.filter(m => m.status === 'active').length})
                </Badge>
                <Badge
                    variant={filterStatus === 'focus' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFilterStatus('focus')}
                >
                    Focus ({teamMembers.filter(m => m.status === 'focus').length})
                </Badge>
                <Badge
                    variant={filterStatus === 'away' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFilterStatus('away')}
                >
                    Away ({teamMembers.filter(m => m.status === 'away').length})
                </Badge>
            </div>

            {/* Members Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMembers.map((member) => (
                        <Card key={member.id} className="relative hover:shadow-lg transition-all duration-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={member.avatar} />
                                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold text-lg">{member.name}</h3>
                                            <p className="text-sm text-gray-500">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end space-y-1">
                                        <Badge className={getStatusColor(member.status)}>
                                            {member.status}
                                        </Badge>
                                        {member.focusMode && (
                                            <Badge variant="outline" className="text-purple-600 border-purple-600">
                                                <Target className="h-3 w-3 mr-1" />
                                                Focus
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* AI Motivation & ROI */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Brain className="h-4 w-4 text-blue-400" />
                                        <span className="text-sm font-medium">{member.aiMotivationType}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <TrendingUp className="h-4 w-4 text-green-400" />
                                        <span className="text-sm font-medium">{member.roi}x ROI</span>
                                    </div>
                                </div>

                                {/* Performance Metrics */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">Tasks</p>
                                        <p className="text-lg font-bold text-white">{member.completedTasks}</p>
                                        <p className="text-xs text-gray-400">{member.openTasks} open</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">Campaigns</p>
                                        <p className="text-lg font-bold text-white">{member.campaignsInvolved}</p>
                                        <p className="text-xs text-gray-400">involved</p>
                                    </div>
                                </div>

                                {/* Stress Level & Mood */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Stress Level</span>
                                        <span className="text-xs font-medium">{member.currentStressLevel}%</span>
                                    </div>
                                    <Progress value={member.currentStressLevel} className="h-2" />
                                    <div className="flex items-center justify-between">
                                        <Badge className={getMoodColor(member.mood)}>
                                            <Heart className="h-3 w-3 mr-1" />
                                            {member.mood}
                                        </Badge>
                                        <Badge className={getBurnoutRiskColor(member.burnoutRisk)}>
                                            <AlertTriangle className="h-3 w-3 mr-1" />
                                            {getBurnoutRiskLevel(member.burnoutRisk)}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Recent Tasks */}
                                <div>
                                    <p className="text-xs text-gray-500 mb-2">Recent Tasks</p>
                                    <div className="space-y-1">
                                        {member.lastTasks.slice(0, 2).map((task, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <CheckCircle className="h-3 w-3 text-green-500" />
                                                <span className="text-xs text-gray-600 truncate">{task}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-2">
                                    <MemberProfileDialog member={member} />
                                    <div className="flex items-center space-x-1">
                                        <Button size="sm" variant="ghost">
                                            <MessageSquare className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost">
                                            <Video className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost">
                                            <MailIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredMembers.map((member) => (
                        <Card key={member.id} className="relative hover:shadow-md transition-all duration-200">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={member.avatar} />
                                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold">{member.name}</h3>
                                            <p className="text-sm text-gray-500">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-center">
                                            <p className="text-sm font-medium">{member.completedTasks}</p>
                                            <p className="text-xs text-gray-500">Tasks</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium">{member.roi}x</p>
                                            <p className="text-xs text-gray-500">ROI</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium">{member.currentStressLevel}%</p>
                                            <p className="text-xs text-gray-500">Stress</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getStatusColor(member.status)}>
                                                {member.status}
                                            </Badge>
                                            <MemberProfileDialog member={member} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
} 