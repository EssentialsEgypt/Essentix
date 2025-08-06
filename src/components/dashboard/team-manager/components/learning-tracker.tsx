"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { 
    BookOpen, 
    Brain, 
    TrendingUp, 
    Target, 
    Clock,
    CheckCircle,
    AlertTriangle,
    Zap,
    RefreshCw,
    Calendar,
    User,
    Star,
    Award,
    Lightbulb
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

interface LearningGoal {
    id: string
    memberId: string
    memberName: string
    skill: string
    category: 'technical' | 'soft' | 'leadership' | 'business'
    targetLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    currentLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    progress: number
    startDate: Date
    targetDate: Date
    status: 'active' | 'completed' | 'paused'
    resources: LearningResource[]
    weeklyHours: number
    totalHours: number
}

interface LearningResource {
    id: string
    title: string
    type: 'course' | 'book' | 'video' | 'article' | 'workshop'
    url: string
    duration: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    recommended: boolean
    completed: boolean
    aiRecommended: boolean
}

interface LearningTrackerProps {
    teamMembers: TeamMember[]
}

export function LearningTracker({ teamMembers }: LearningTrackerProps) {
    const [learningGoals, setLearningGoals] = useState<LearningGoal[]>([])
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedMember, setSelectedMember] = useState<string | null>(null)
    const [showGoalForm, setShowGoalForm] = useState(false)

    // Mock learning data
    const mockLearningGoals: LearningGoal[] = [
        {
            id: "1",
            memberId: "1",
            memberName: "Ahmed",
            skill: "Advanced Analytics",
            category: "technical",
            targetLevel: "advanced",
            currentLevel: "intermediate",
            progress: 65,
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: "active",
            resources: [
                {
                    id: "1",
                    title: "Data Science Fundamentals",
                    type: "course",
                    url: "https://example.com/course1",
                    duration: "8 hours",
                    difficulty: "intermediate",
                    recommended: true,
                    completed: true,
                    aiRecommended: true
                },
                {
                    id: "2",
                    title: "Advanced SQL Techniques",
                    type: "video",
                    url: "https://example.com/video1",
                    duration: "2 hours",
                    difficulty: "advanced",
                    recommended: true,
                    completed: false,
                    aiRecommended: true
                }
            ],
            weeklyHours: 5,
            totalHours: 25
        },
        {
            id: "2",
            memberId: "2",
            memberName: "Nada",
            skill: "Team Leadership",
            category: "leadership",
            targetLevel: "expert",
            currentLevel: "advanced",
            progress: 85,
            startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
            targetDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            status: "active",
            resources: [
                {
                    id: "3",
                    title: "Leadership in Digital Age",
                    type: "book",
                    url: "https://example.com/book1",
                    duration: "6 hours",
                    difficulty: "advanced",
                    recommended: true,
                    completed: true,
                    aiRecommended: true
                }
            ],
            weeklyHours: 3,
            totalHours: 18
        },
        {
            id: "3",
            memberId: "3",
            memberName: "Omar",
            skill: "Project Management",
            category: "business",
            targetLevel: "intermediate",
            currentLevel: "beginner",
            progress: 35,
            startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
            targetDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
            status: "active",
            resources: [
                {
                    id: "4",
                    title: "Agile Project Management",
                    type: "course",
                    url: "https://example.com/course2",
                    duration: "12 hours",
                    difficulty: "intermediate",
                    recommended: true,
                    completed: false,
                    aiRecommended: true
                }
            ],
            weeklyHours: 4,
            totalHours: 12
        }
    ]

    useEffect(() => {
        setLearningGoals(mockLearningGoals)
    }, [])

    const generateLearningRecommendations = async () => {
        setIsGenerating(true)
        
        // Simulate AI generation
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const newGoals = await performAIAnalysis()
        setLearningGoals(prev => [...newGoals, ...prev])
        setIsGenerating(false)
    }

    const performAIAnalysis = async (): Promise<LearningGoal[]> => {
        // Mock AI analysis - in real implementation, this would use OpenAI
        const newGoals: LearningGoal[] = []
        
        teamMembers.forEach(member => {
            const goal = generateLearningGoalForMember(member)
            if (goal) {
                newGoals.push(goal)
            }
        })
        
        return newGoals
    }

    const generateLearningGoalForMember = (member: TeamMember): LearningGoal | null => {
        // Check if member already has active goals
        const existingGoals = learningGoals.filter(g => 
            g.memberId === member.id && g.status === 'active'
        )
        
        if (existingGoals.length >= 3) return null

        const skillGaps = analyzeSkillGaps(member)
        if (skillGaps.length === 0) return null

        const selectedSkill = skillGaps[0]
        const currentLevel = getCurrentSkillLevel(member, selectedSkill)
        const targetLevel = getNextLevel(currentLevel)

        return {
            id: `goal-${Date.now()}-${member.id}`,
            memberId: member.id,
            memberName: member.name,
            skill: selectedSkill,
            category: getSkillCategory(selectedSkill),
            targetLevel,
            currentLevel,
            progress: 0,
            startDate: new Date(),
            targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            status: "active",
            resources: generateResources(selectedSkill, targetLevel),
            weeklyHours: 3,
            totalHours: 0
        }
    }

    const analyzeSkillGaps = (member: TeamMember): string[] => {
        const allSkills = [
            "Advanced Analytics", "Team Leadership", "Project Management", 
            "Digital Marketing", "Data Visualization", "Communication",
            "Strategic Planning", "Customer Service", "Technical Writing"
        ]
        
        return allSkills.filter(skill => 
            !member.skills.includes(skill) && 
            !member.desiredSkills.includes(skill)
        )
    }

    const getCurrentSkillLevel = (member: TeamMember, skill: string): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
        // Mock logic - in real implementation, this would analyze performance data
        const performance = member.completedTasks / (member.openTasks + member.completedTasks)
        if (performance > 0.9) return 'expert'
        if (performance > 0.7) return 'advanced'
        if (performance > 0.5) return 'intermediate'
        return 'beginner'
    }

    const getNextLevel = (currentLevel: string): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
        switch (currentLevel) {
            case 'beginner': return 'intermediate'
            case 'intermediate': return 'advanced'
            case 'advanced': return 'expert'
            default: return 'expert'
        }
    }

    const getSkillCategory = (skill: string): 'technical' | 'soft' | 'leadership' | 'business' => {
        const technicalSkills = ["Advanced Analytics", "Data Visualization", "Technical Writing"]
        const leadershipSkills = ["Team Leadership", "Strategic Planning"]
        const businessSkills = ["Project Management", "Digital Marketing", "Customer Service"]
        
        if (technicalSkills.includes(skill)) return 'technical'
        if (leadershipSkills.includes(skill)) return 'leadership'
        if (businessSkills.includes(skill)) return 'business'
        return 'soft'
    }

    const generateResources = (skill: string, level: string): LearningResource[] => {
        const resources: LearningResource[] = []
        
        // Mock resource generation
        resources.push({
            id: `resource-${Date.now()}-1`,
            title: `${skill} Fundamentals`,
            type: "course",
            url: `https://example.com/${skill.toLowerCase().replace(' ', '-')}`,
            duration: "6 hours",
            difficulty: level as 'beginner' | 'intermediate' | 'advanced',
            recommended: true,
            completed: false,
            aiRecommended: true
        })
        
        return resources
    }

    const updateProgress = async (goalId: string, progress: number) => {
        setLearningGoals(prev => prev.map(goal => 
            goal.id === goalId 
                ? { ...goal, progress, totalHours: goal.totalHours + 1 }
                : goal
        ))
    }

    const completeResource = async (goalId: string, resourceId: string) => {
        setLearningGoals(prev => prev.map(goal => 
            goal.id === goalId 
                ? {
                    ...goal,
                    resources: goal.resources.map(resource => 
                        resource.id === resourceId 
                            ? { ...resource, completed: true }
                            : resource
                    ),
                    progress: Math.min(100, goal.progress + 15)
                }
                : goal
        ))
    }

    const addLearningGoal = async (memberId: string, skill: string, targetLevel: string) => {
        const member = teamMembers.find(m => m.id === memberId)
        if (!member) return

        const newGoal: LearningGoal = {
            id: `custom-goal-${Date.now()}`,
            memberId,
            memberName: member.name,
            skill,
            category: getSkillCategory(skill),
            targetLevel: targetLevel as 'beginner' | 'intermediate' | 'advanced' | 'expert',
            currentLevel: 'beginner',
            progress: 0,
            startDate: new Date(),
            targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            status: "active",
            resources: generateResources(skill, targetLevel),
            weeklyHours: 3,
            totalHours: 0
        }

        setLearningGoals(prev => [newGoal, ...prev])
        setShowGoalForm(false)
        setSelectedMember(null)
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'technical': return 'bg-blue-500 text-white'
            case 'leadership': return 'bg-purple-500 text-white'
            case 'business': return 'bg-green-500 text-white'
            case 'soft': return 'bg-yellow-500 text-black'
            default: return 'bg-gray-500 text-white'
        }
    }

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'expert': return 'text-purple-500'
            case 'advanced': return 'text-blue-500'
            case 'intermediate': return 'text-yellow-500'
            case 'beginner': return 'text-green-500'
            default: return 'text-gray-500'
        }
    }

    const activeGoals = learningGoals.filter(g => g.status === 'active')
    const completedGoals = learningGoals.filter(g => g.status === 'completed')
    const averageProgress = activeGoals.length > 0 
        ? activeGoals.reduce((sum, goal) => sum + goal.progress, 0) / activeGoals.length 
        : 0

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5" />
                        <span>Learning Tracker</span>
                    </div>
                    <Button 
                        onClick={generateLearningRecommendations} 
                        disabled={isGenerating}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        {isGenerating ? (
                            <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Brain className="h-4 w-4 mr-2" />
                                AI Recommendations
                            </>
                        )}
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-purple-400">Active Goals</p>
                                <p className="text-2xl font-bold text-purple-500">{activeGoals.length}</p>
                            </div>
                            <Target className="h-8 w-8 text-purple-500" />
                        </div>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-400">Completed</p>
                                <p className="text-2xl font-bold text-green-500">{completedGoals.length}</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-400">Avg Progress</p>
                                <p className="text-2xl font-bold text-blue-500">{averageProgress.toFixed(0)}%</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-yellow-400">Weekly Hours</p>
                                <p className="text-2xl font-bold text-yellow-500">
                                    {activeGoals.reduce((sum, goal) => sum + goal.weeklyHours, 0)}
                                </p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-500" />
                        </div>
                    </div>
                </div>

                {/* Add Learning Goal */}
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-4 rounded-lg border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-white mb-3">Add Learning Goal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Team Member</label>
                            <select 
                                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
                                value={selectedMember || ""}
                                onChange={(e) => setSelectedMember(e.target.value)}
                                aria-label="Select team member for learning goal"
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
                            <label className="text-sm text-gray-400 mb-2 block">Skill</label>
                            <select 
                                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
                                aria-label="Select skill to learn"
                            >
                                <option value="">Choose a skill...</option>
                                <option value="Advanced Analytics">Advanced Analytics</option>
                                <option value="Team Leadership">Team Leadership</option>
                                <option value="Project Management">Project Management</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Data Visualization">Data Visualization</option>
                                <option value="Communication">Communication</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Target Level</label>
                            <select 
                                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
                                aria-label="Select target skill level"
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>
                    </div>
                    <Button 
                        className="mt-4 bg-purple-600 hover:bg-purple-700"
                        disabled={!selectedMember}
                    >
                        <Target className="h-4 w-4 mr-2" />
                        Add Goal
                    </Button>
                </div>

                {/* Active Learning Goals */}
                {activeGoals.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Active Learning Goals</h3>
                        {activeGoals.map((goal) => (
                            <Alert key={goal.id} className="border-blue-500/20 bg-blue-500/5">
                                <BookOpen className="h-4 w-4 text-blue-500" />
                                <AlertDescription className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-white">{goal.memberName}</p>
                                            <p className="text-sm text-gray-400">{goal.skill}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Badge className={getCategoryColor(goal.category)}>
                                                {goal.category}
                                            </Badge>
                                            <Badge variant="outline" className={getLevelColor(goal.targetLevel)}>
                                                {goal.targetLevel}
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Progress</span>
                                            <span className="text-white">{goal.progress}%</span>
                                        </div>
                                        <Progress value={goal.progress} className="h-2" />
                                        <div className="flex justify-between text-xs text-gray-400">
                                            <span>{goal.currentLevel} → {goal.targetLevel}</span>
                                            <span>{goal.weeklyHours}h/week</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-400 font-medium">Resources:</p>
                                        <div className="space-y-2">
                                            {goal.resources.map((resource) => (
                                                <div key={resource.id} className="flex items-center justify-between bg-gray-800/50 p-2 rounded">
                                                    <div className="flex items-center space-x-2">
                                                        <div className={`w-2 h-2 rounded-full ${resource.completed ? 'bg-green-500' : 'bg-gray-500'}`} />
                                                        <span className="text-sm text-white">{resource.title}</span>
                                                        {resource.aiRecommended && (
                                                            <Brain className="h-3 w-3 text-purple-500" />
                                                        )}
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Badge variant="outline" className="text-xs">
                                                            {resource.type}
                                                        </Badge>
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline"
                                                            onClick={() => completeResource(goal.id, resource.id)}
                                                            disabled={resource.completed}
                                                            className="text-xs"
                                                        >
                                                            {resource.completed ? 'Completed' : 'Mark Complete'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <Button 
                                            size="sm" 
                                            onClick={() => updateProgress(goal.id, Math.min(100, goal.progress + 10))}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            <TrendingUp className="h-4 w-4 mr-1" />
                                            Update Progress
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant="outline"
                                            className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
                                        >
                                            <Lightbulb className="h-4 w-4 mr-1" />
                                            Get Resources
                                        </Button>
                                    </div>
                                </AlertDescription>
                            </Alert>
                        ))}
                    </div>
                )}

                {/* Learning Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">Top Skills in Demand</h4>
                        <div className="space-y-2">
                            {['Advanced Analytics', 'Team Leadership', 'Project Management', 'Digital Marketing'].map((skill, index) => (
                                <div key={skill} className="flex items-center justify-between">
                                    <span className="text-sm text-white">{skill}</span>
                                    <Badge variant="outline" className="text-xs">
                                        {85 - index * 10}% demand
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-3">Learning Insights</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p>• 78% of team members have active learning goals</p>
                            <p>• Average completion time: 6.2 weeks</p>
                            <p>• Most popular category: Technical skills</p>
                            <p>• AI recommendations: 94% accuracy</p>
                        </div>
                    </div>
                </div>

                {/* AI Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">AI Capabilities</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Skill gap analysis</li>
                            <li>• Personalized recommendations</li>
                            <li>• Resource curation</li>
                            <li>• Progress tracking</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Learning Features</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Goal setting & tracking</li>
                            <li>• Resource management</li>
                            <li>• Progress visualization</li>
                            <li>• Team skill mapping</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 