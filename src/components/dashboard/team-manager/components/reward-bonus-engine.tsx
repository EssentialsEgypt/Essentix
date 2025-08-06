"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Award, Gift, Star, Crown, TrendingUp, Zap, Brain, Target,
    CheckCircle, XCircle, Plus, Minus, DollarSign, Calendar,
    MessageSquare, Mail, Bell, Users, Trophy, Medal, Sparkles
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

interface RewardSuggestion {
    id: string
    memberId: string
    memberName: string
    type: 'bonus' | 'promotion' | 'shoutout' | 'gift' | 'recognition'
    amount?: number
    reason: string
    aiConfidence: number
    status: 'pending' | 'approved' | 'rejected' | 'sent'
    createdAt: Date
    description: string
    impact: string
}

interface RewardHistory {
    id: string
    memberId: string
    memberName: string
    type: string
    amount: number
    reason: string
    date: Date
    status: 'sent' | 'pending'
}

interface RewardBonusEngineProps {
    teamMembers: TeamMember[]
}

export function RewardBonusEngine({ teamMembers }: RewardBonusEngineProps) {
    const [selectedMember, setSelectedMember] = useState<string | null>(null)
    const [showRewardDialog, setShowRewardDialog] = useState(false)
    const [rewardType, setRewardType] = useState<'bonus' | 'promotion' | 'shoutout' | 'gift' | 'recognition'>('bonus')
    const [rewardAmount, setRewardAmount] = useState<number>(0)
    const [rewardReason, setRewardReason] = useState<string>('')

    // Mock reward suggestions
    const rewardSuggestions: RewardSuggestion[] = [
        {
            id: '1',
            memberId: '1',
            memberName: 'Ahmed Hassan',
            type: 'bonus',
            amount: 500,
            reason: 'Exceptional performance with 98% deadline compliance and 5.6x ROI',
            aiConfidence: 0.95,
            status: 'pending',
            createdAt: new Date(),
            description: 'Ahmed has consistently exceeded expectations with high performance metrics',
            impact: 'Will boost team morale and set performance standards'
        },
        {
            id: '2',
            memberId: '3',
            memberName: 'Omar Khalil',
            type: 'promotion',
            reason: 'Outstanding data analysis skills and 6.2x ROI (highest in team)',
            aiConfidence: 0.92,
            status: 'pending',
            createdAt: new Date(),
            description: 'Omar has demonstrated leadership potential and exceptional technical skills',
            impact: 'Will recognize his contributions and provide growth opportunities'
        },
        {
            id: '3',
            memberId: '2',
            memberName: 'Nada El-Sayed',
            type: 'shoutout',
            reason: 'Creative excellence and focus mode productivity improvement',
            aiConfidence: 0.88,
            status: 'pending',
            createdAt: new Date(),
            description: 'Nada has shown remarkable creativity and productivity improvements',
            impact: 'Will boost team creativity and encourage innovative thinking'
        }
    ]

    // Mock reward history
    const rewardHistory: RewardHistory[] = [
        {
            id: '1',
            memberId: '1',
            memberName: 'Ahmed Hassan',
            type: 'Performance Bonus',
            amount: 300,
            reason: 'Q4 Excellence Award',
            date: new Date('2024-01-10'),
            status: 'sent'
        },
        {
            id: '2',
            memberId: '3',
            memberName: 'Omar Khalil',
            type: 'Recognition',
            amount: 0,
            reason: 'Data Analysis Excellence',
            date: new Date('2024-01-08'),
            status: 'sent'
        },
        {
            id: '3',
            memberId: '2',
            memberName: 'Nada El-Sayed',
            type: 'Creative Bonus',
            amount: 200,
            reason: 'Content Quality Award',
            date: new Date('2024-01-05'),
            status: 'sent'
        }
    ]

    const calculateScore = (member: TeamMember) => {
        const taskScore = (member.completedTasks / (member.completedTasks + member.openTasks)) * 30
        const performanceScore = ((member.meetingAttendance + member.responseSpeed + member.deadlineCompliance) / 3) * 0.4
        const roiScore = Math.min(member.roi * 10, 30)
        const stressBonus = Math.max(0, (50 - member.currentStressLevel) * 0.2)
        
        return Math.round(taskScore + performanceScore + roiScore + stressBonus)
    }

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600 bg-green-100'
        if (score >= 75) return 'text-yellow-600 bg-yellow-100'
        if (score >= 60) return 'text-orange-600 bg-orange-100'
        return 'text-red-600 bg-red-100'
    }

    const getScoreLevel = (score: number) => {
        if (score >= 90) return 'Exceptional'
        if (score >= 75) return 'Excellent'
        if (score >= 60) return 'Good'
        return 'Needs Improvement'
    }

    const getRewardTypeIcon = (type: string) => {
        switch (type) {
            case 'bonus': return <DollarSign className="h-4 w-4" />
            case 'promotion': return <TrendingUp className="h-4 w-4" />
            case 'shoutout': return <Star className="h-4 w-4" />
            case 'gift': return <Gift className="h-4 w-4" />
            case 'recognition': return <Trophy className="h-4 w-4" />
            default: return <Award className="h-4 w-4" />
        }
    }

    const getRewardTypeColor = (type: string) => {
        switch (type) {
            case 'bonus': return 'text-green-600 bg-green-100'
            case 'promotion': return 'text-blue-600 bg-blue-100'
            case 'shoutout': return 'text-yellow-600 bg-yellow-100'
            case 'gift': return 'text-purple-600 bg-purple-100'
            case 'recognition': return 'text-orange-600 bg-orange-100'
            default: return 'text-gray-600 bg-gray-100'
        }
    }

    const handleSendReward = () => {
        // Mock API call to send reward
        console.log('Sending reward:', { selectedMember, rewardType, rewardAmount, rewardReason })
        setShowRewardDialog(false)
        setRewardAmount(0)
        setRewardReason('')
    }

    const RewardDialog = () => (
        <Dialog open={showRewardDialog} onOpenChange={setShowRewardDialog}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        <Gift className="h-5 w-5" />
                        <span>Send Reward</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="member">Team Member</Label>
                        <select
                            id="member"
                            name="member"
                            aria-label="Select team member"
                            className="w-full p-2 border rounded-md"
                            value={selectedMember || ''}
                            onChange={(e) => setSelectedMember(e.target.value)}
                        >
                            <option value="">Select a member</option>
                            {teamMembers.map((member) => (
                                <option key={member.id} value={member.id}>
                                    {member.name} - {member.role}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <Label htmlFor="type">Reward Type</Label>
                        <select
                            id="type"
                            name="type"
                            aria-label="Select reward type"
                            className="w-full p-2 border rounded-md"
                            value={rewardType}
                            onChange={(e) => setRewardType(e.target.value as any)}
                        >
                            <option value="bonus">Bonus</option>
                            <option value="promotion">Promotion</option>
                            <option value="shoutout">Shoutout</option>
                            <option value="gift">Gift</option>
                            <option value="recognition">Recognition</option>
                        </select>
                    </div>

                    {rewardType === 'bonus' && (
                        <div>
                            <Label htmlFor="amount">Amount (EGP)</Label>
                            <Input
                                id="amount"
                                type="number"
                                value={rewardAmount}
                                onChange={(e) => setRewardAmount(Number(e.target.value))}
                                placeholder="Enter amount"
                            />
                        </div>
                    )}

                    <div>
                        <Label htmlFor="reason">Reason</Label>
                        <Textarea
                            id="reason"
                            value={rewardReason}
                            onChange={(e) => setRewardReason(e.target.value)}
                            placeholder="Explain why this reward is being given..."
                            rows={3}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button onClick={handleSendReward} className="flex-1">
                            <Gift className="h-4 w-4 mr-2" />
                            Send Reward
                        </Button>
                        <Button variant="outline" onClick={() => setShowRewardDialog(false)}>
                            Cancel
                        </Button>
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
                    <h2 className="text-2xl font-bold text-white">Reward & Bonus Engine</h2>
                    <p className="text-gray-300">AI-powered reward system for team recognition</p>
                </div>
                <Button onClick={() => setShowRewardDialog(true)} className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                    <Gift className="h-4 w-4 mr-2" />
                    Send Reward
                </Button>
            </div>

            {/* Team Member Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {teamMembers.map((member) => {
                    const score = calculateScore(member)
                    return (
                        <Card key={member.id} className="relative hover:shadow-lg transition-all duration-200">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
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
                                    <Badge className={getScoreColor(score)}>
                                        {score}
                                    </Badge>
                                </div>
                                
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs text-gray-500">Performance Score</span>
                                            <span className="text-xs font-medium">{score}/100</span>
                                        </div>
                                        <Progress value={score} className="h-2" />
                                    </div>
                                    
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">Level</p>
                                        <p className="text-sm font-medium">{getScoreLevel(score)}</p>
                                    </div>

                                    <div className="flex items-center justify-between text-xs">
                                        <span>ROI: {member.roi}x</span>
                                        <span>Tasks: {member.completedTasks}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* AI Reward Suggestions */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Brain className="h-5 w-5" />
                        <span>AI Reward Suggestions</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {rewardSuggestions.length} suggestions
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {rewardSuggestions.map((suggestion) => (
                            <div key={suggestion.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        {getRewardTypeIcon(suggestion.type)}
                                        <Badge className={getRewardTypeColor(suggestion.type)}>
                                            {suggestion.type}
                                        </Badge>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{suggestion.memberName}</h4>
                                        <p className="text-sm text-gray-600">{suggestion.reason}</p>
                                        {suggestion.amount && (
                                            <p className="text-sm font-medium text-green-600">
                                                {suggestion.amount} EGP
                                            </p>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">AI Confidence</p>
                                        <p className="text-sm font-medium">{Math.round(suggestion.aiConfidence * 100)}%</p>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                                            <CheckCircle className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                                            <XCircle className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Rewards */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Trophy className="h-5 w-5" />
                        <span>Recent Rewards</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {rewardHistory.map((reward) => (
                            <div key={reward.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                        <Award className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{reward.memberName}</h4>
                                        <p className="text-sm text-gray-600">{reward.reason}</p>
                                    </div>
                                </div>
                                
                                <div className="text-right">
                                    <p className="text-sm font-medium">{reward.type}</p>
                                    {reward.amount > 0 && (
                                        <p className="text-sm text-green-600 font-medium">{reward.amount} EGP</p>
                                    )}
                                    <p className="text-xs text-gray-500">{reward.date.toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Reward Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                <DollarSign className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Rewards</p>
                                <p className="text-2xl font-bold">12,500 EGP</p>
                                <p className="text-xs text-green-600">+15% this month</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Rewarded Members</p>
                                <p className="text-2xl font-bold">4/4</p>
                                <p className="text-xs text-blue-600">100% coverage</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                <Star className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Avg Score</p>
                                <p className="text-2xl font-bold">87.5</p>
                                <p className="text-xs text-yellow-600">Excellent</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <RewardDialog />
        </div>
    )
} 