"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Heart, Smile, Frown, Meh, TrendingUp, TrendingDown,
    Users, Calendar, BarChart3, Zap, Target, RefreshCw,
    CheckCircle, XCircle, Plus, Settings, MessageSquare
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

interface MoodData {
    memberId: string
    memberName: string
    date: string
    mood: 'positive' | 'neutral' | 'negative'
    stressLevel: number
    energyLevel: number
    satisfaction: number
    notes: string
    aiInsights: string
}

interface WeeklyMoodCheckProps {
    teamMembers: TeamMember[]
}

export function WeeklyMoodCheck({ teamMembers }: WeeklyMoodCheckProps) {
    const [moodData, setMoodData] = useState<MoodData[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [insights, setInsights] = useState<string[]>([])
    const [selectedMember, setSelectedMember] = useState<string | null>(null)
    const [showMoodPrompt, setShowMoodPrompt] = useState(false)
    const [currentMood, setCurrentMood] = useState<'positive' | 'neutral' | 'negative'>('neutral')
    const [moodNotes, setMoodNotes] = useState('')

    // Generate mock mood data
    useEffect(() => {
        const generateMockData = () => {
            const data: MoodData[] = []
            const days = 7

            teamMembers.forEach(member => {
                for (let i = 0; i < days; i++) {
                    const date = new Date()
                    date.setDate(date.getDate() - i)

                    const moods: ('positive' | 'neutral' | 'negative')[] = ['positive', 'neutral', 'negative']
                    const randomMood = moods[Math.floor(Math.random() * moods.length)]

                    data.push({
                        memberId: member.id,
                        memberName: member.name,
                        date: date.toISOString().split('T')[0],
                        mood: randomMood,
                        stressLevel: Math.floor(Math.random() * 40) + 20,
                        energyLevel: Math.floor(Math.random() * 40) + 40,
                        satisfaction: Math.floor(Math.random() * 40) + 50,
                        notes: randomMood === 'positive' ? 'Feeling productive today!' :
                            randomMood === 'neutral' ? 'Standard day at work' : 'Feeling a bit overwhelmed',
                        aiInsights: randomMood === 'positive' ? 'High energy correlates with task completion' :
                            randomMood === 'neutral' ? 'Stable mood, consistent performance' : 'Consider workload reduction'
                    })
                }
            })

            setMoodData(data)
        }

        generateMockData()
    }, [teamMembers])

    const analyzeMood = async () => {
        setIsAnalyzing(true)
        try {
            // Simulate AI analysis
            await new Promise(resolve => setTimeout(resolve, 2000))

            const newInsights = [
                "Team average mood: 7.2/10 (positive trend)",
                "Ahmed's mood improved 15% this week - workload balance working",
                "Nada shows stress correlation with creative tasks",
                "Omar's consistent positive mood boosts team morale",
                "Farouk needs support - stress level 35% above average"
            ]

            setInsights(newInsights)
        } catch (error) {
            console.error('Analysis failed:', error)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const submitMood = async () => {
        if (!selectedMember) return

        const newMoodData: MoodData = {
            memberId: selectedMember,
            memberName: teamMembers.find(m => m.id === selectedMember)?.name || '',
            date: new Date().toISOString().split('T')[0],
            mood: currentMood,
            stressLevel: currentMood === 'positive' ? 25 : currentMood === 'neutral' ? 45 : 65,
            energyLevel: currentMood === 'positive' ? 75 : currentMood === 'neutral' ? 60 : 40,
            satisfaction: currentMood === 'positive' ? 85 : currentMood === 'neutral' ? 70 : 55,
            notes: moodNotes,
            aiInsights: currentMood === 'positive' ? 'Great energy! Consider sharing positive vibes with team' :
                currentMood === 'neutral' ? 'Stable mood detected. Consider setting new challenges' :
                    'Stress detected. Consider taking breaks and delegating tasks'
        }

        setMoodData(prev => [newMoodData, ...prev])
        setShowMoodPrompt(false)
        setSelectedMember(null)
        setCurrentMood('neutral')
        setMoodNotes('')
    }

    const getMoodIcon = (mood: string) => {
        switch (mood) {
            case 'positive': return <Smile className="h-5 w-5 text-green-400" />
            case 'neutral': return <Meh className="h-5 w-5 text-yellow-400" />
            case 'negative': return <Frown className="h-5 w-5 text-red-400" />
            default: return <Meh className="h-5 w-5 text-gray-400" />
        }
    }

    const getMoodColor = (mood: string) => {
        switch (mood) {
            case 'positive': return 'text-green-400'
            case 'neutral': return 'text-yellow-400'
            case 'negative': return 'text-red-400'
            default: return 'text-gray-400'
        }
    }

    const getMemberMoodData = (memberId: string) => {
        return moodData.filter(d => d.memberId === memberId)
    }

    const getAverageMood = (memberId: string) => {
        const memberData = getMemberMoodData(memberId)
        if (memberData.length === 0) return 0

        const moodScores = memberData.map(d => {
            switch (d.mood) {
                case 'positive': return 100
                case 'neutral': return 50
                case 'negative': return 0
                default: return 50
            }
        })

        return moodScores.reduce((sum, score) => sum + score, 0) / moodScores.length
    }

    const getTeamAverageMood = () => {
        const allMoodScores = moodData.map(d => {
            switch (d.mood) {
                case 'positive': return 100
                case 'neutral': return 50
                case 'negative': return 0
                default: return 50
            }
        })

        return allMoodScores.length > 0
            ? allMoodScores.reduce((sum, score) => sum + score, 0) / allMoodScores.length
            : 0
    }

    return (
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Heart className="h-5 w-5 text-pink-400" />
                        <span className="text-white">Weekly Mood Check</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            size="sm"
                            onClick={analyzeMood}
                            disabled={isAnalyzing}
                            className="bg-pink-600 hover:bg-pink-700"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => setShowMoodPrompt(true)}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Check Mood
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
                                <p className="text-sm text-gray-400">Team Mood</p>
                                <p className="text-2xl font-bold text-white">{getTeamAverageMood().toFixed(0)}%</p>
                            </div>
                            <Heart className="h-8 w-8 text-pink-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Positive Members</p>
                                <p className="text-2xl font-bold text-white">
                                    {teamMembers.filter(m => getAverageMood(m.id) > 70).length}/{teamMembers.length}
                                </p>
                            </div>
                            <Smile className="h-8 w-8 text-green-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Stress Alert</p>
                                <p className="text-2xl font-bold text-white">
                                    {teamMembers.filter(m => getAverageMood(m.id) < 40).length}
                                </p>
                            </div>
                            <Frown className="h-8 w-8 text-red-400" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Mood Trend</p>
                                <p className="text-2xl font-bold text-white">↗️ +12%</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-400" />
                        </div>
                    </div>
                </div>

                {/* AI Insights */}
                {insights.length > 0 && (
                    <Alert className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/30">
                        <BarChart3 className="h-4 w-4 text-pink-400" />
                        <AlertDescription className="text-pink-200">
                            <div className="space-y-2">
                                <p className="font-medium">AI Mood Insights:</p>
                                <ul className="space-y-1 text-sm">
                                    {insights.map((insight, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                            <span className="text-pink-400">•</span>
                                            <span>{insight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Mood Check Prompt */}
                {showMoodPrompt && (
                    <Alert className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30">
                        <MessageSquare className="h-4 w-4 text-green-400" />
                        <AlertDescription className="text-green-200">
                            <div className="space-y-4">
                                <div>
                                    <p className="font-medium mb-2">How are you feeling this week?</p>
                                    <div className="flex space-x-4 mb-4">
                                        {[
                                            { value: 'positive', icon: <Smile className="h-6 w-6" />, label: 'Great!' },
                                            { value: 'neutral', icon: <Meh className="h-6 w-6" />, label: 'Okay' },
                                            { value: 'negative', icon: <Frown className="h-6 w-6" />, label: 'Struggling' }
                                        ].map(mood => (
                                            <button
                                                key={mood.value}
                                                onClick={() => setCurrentMood(mood.value as any)}
                                                className={`flex flex-col items-center space-y-1 p-3 rounded-lg border transition-all ${currentMood === mood.value
                                                    ? 'border-green-500 bg-green-500/20'
                                                    : 'border-gray-600 hover:border-gray-500'
                                                    }`}
                                            >
                                                <span className={getMoodColor(mood.value)}>{mood.icon}</span>
                                                <span className="text-sm text-white">{mood.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Additional notes (optional):
                                    </label>
                                    <textarea
                                        value={moodNotes}
                                        onChange={(e) => setMoodNotes(e.target.value)}
                                        className="w-full bg-gray-800 text-white rounded-lg border border-gray-600 p-3 text-sm"
                                        rows={3}
                                        placeholder="How's your week going? Any challenges or wins?"
                                    />
                                </div>

                                <div className="flex space-x-2">
                                    <Button onClick={submitMood} className="bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Submit Mood
                                    </Button>
                                    <Button
                                        onClick={() => setShowMoodPrompt(false)}
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

                {/* Member Mood Cards */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Team Mood Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teamMembers.map(member => {
                            const avgMood = getAverageMood(member.id)
                            const memberMoodData = getMemberMoodData(member.id)
                            const recentMood = memberMoodData[0]?.mood || member.mood

                            return (
                                <div key={member.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-pink-500/50 transition-all">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            {getMoodIcon(recentMood)}
                                            <div>
                                                <p className="font-medium text-white">{member.name}</p>
                                                <p className="text-sm text-gray-400">{member.role}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className={getMoodColor(avgMood)}>
                                            {avgMood.toFixed(0)}% positive
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Recent Mood:</span>
                                            <span className={getMoodColor(recentMood)}>
                                                {recentMood.charAt(0).toUpperCase() + recentMood.slice(1)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Stress Level:</span>
                                            <span className="text-white">{memberMoodData[0]?.stressLevel || member.currentStressLevel}%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Energy:</span>
                                            <span className="text-white">{memberMoodData[0]?.energyLevel || 60}%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Satisfaction:</span>
                                            <span className="text-white">{memberMoodData[0]?.satisfaction || 70}%</span>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <Progress value={avgMood} className="h-2" />
                                    </div>

                                    {memberMoodData[0]?.notes && (
                                        <div className="mt-3 p-2 bg-gray-700/50 rounded text-xs text-gray-300">
                                            &quot;{memberMoodData[0].notes}&quot;
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Mood Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">Mood Trends</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p>• Positive mood correlates with 2.3x task completion</p>
                            <p>• Team morale highest on Wednesdays</p>
                            <p>• Stress peaks on Mondays and Fridays</p>
                            <p>• Creative tasks boost mood by 25%</p>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">AI Recommendations</h4>
                        <div className="space-y-2">
                            {['Schedule team building on low-mood days', 'Recognize positive contributions', 'Offer flexible work hours', 'Provide stress management resources'].map((rec, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Zap className="h-3 w-3 text-yellow-500" />
                                    <span className="text-sm text-white">{rec}</span>
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
                            <li>• Mood pattern analysis</li>
                            <li>• Stress correlation detection</li>
                            <li>• Team morale prediction</li>
                            <li>• Personalized recommendations</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Mood Features</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Weekly mood tracking</li>
                            <li>• Anonymous feedback option</li>
                            <li>• Stress level monitoring</li>
                            <li>• Team morale insights</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 