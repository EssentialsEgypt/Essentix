"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import {
    Eye,
    Target,
    Zap,
    TrendingUp,
    AlertTriangle,
    Copy,
    Users,
    DollarSign,
    BarChart3,
    Clock,
    ArrowUpRight,
    Brain,
    Shield,
    Sword,
    Crown,
    Activity,
    Sparkles,
    Target as TargetIcon,
    TrendingDown,
    AlertCircle,
    CheckCircle,
    XCircle,
    Play,
    Pause,
    RotateCcw,
    Settings
} from 'lucide-react'

interface Competitor {
    id: string
    name: string
    handle: string
    platform: 'instagram' | 'facebook' | 'tiktok' | 'youtube'
    activity: number
    threatLevel: 'low' | 'medium' | 'high' | 'critical'
    lastActivity: string
    followers: number
    engagement: number
    adSpend: number
    contentCount: number
}

interface IntelAlert {
    id: string
    type: 'content' | 'ad' | 'pricing' | 'launch' | 'trend'
    competitor: string
    message: string
    severity: 'info' | 'warning' | 'critical'
    timestamp: string
    actionRequired: boolean
}

interface RageAction {
    id: string
    type: 'counter-post' | 'ad-clone' | 'funnel-attack' | 'pricing-strike'
    competitor: string
    generatedContent: string
    status: 'pending' | 'ready' | 'executed'
    timestamp: string
    aiScore: number
}

export default function RageIntel() {
    const [competitors, setCompetitors] = useState<Competitor[]>([])
    const [alerts, setAlerts] = useState<IntelAlert[]>([])
    const [rageActions, setRageActions] = useState<RageAction[]>([])
    const [isScanning, setIsScanning] = useState(false)
    const [scanProgress, setScanProgress] = useState(0)
    const [selectedCompetitor, setSelectedCompetitor] = useState<string>('')
    const [newCompetitorHandle, setNewCompetitorHandle] = useState('')

    // Mock data for demonstration
    useEffect(() => {
        setCompetitors([
            {
                id: '1',
                name: 'GrowthGuru',
                handle: '@growthguru',
                platform: 'instagram',
                activity: 85,
                threatLevel: 'high',
                lastActivity: '2 minutes ago',
                followers: 125000,
                engagement: 4.2,
                adSpend: 15000,
                contentCount: 47
            },
            {
                id: '2',
                name: 'ProfitPulse',
                handle: '@profitpulse',
                platform: 'facebook',
                activity: 92,
                threatLevel: 'critical',
                lastActivity: '5 minutes ago',
                followers: 89000,
                engagement: 5.8,
                adSpend: 22000,
                contentCount: 23
            },
            {
                id: '3',
                name: 'ScaleMaster',
                handle: '@scalemaster',
                platform: 'tiktok',
                activity: 67,
                threatLevel: 'medium',
                lastActivity: '15 minutes ago',
                followers: 210000,
                engagement: 3.9,
                adSpend: 8500,
                contentCount: 31
            }
        ])

        setAlerts([
            {
                id: '1',
                type: 'content',
                competitor: 'GrowthGuru',
                message: 'Just posted a flash sale with emoji-heavy CTAs. AI suggests counter-post with scarcity angle.',
                severity: 'warning',
                timestamp: '2 minutes ago',
                actionRequired: true
            },
            {
                id: '2',
                type: 'ad',
                competitor: 'ProfitPulse',
                message: 'Spotted new Meta ad targeting your audience. Clone + Improve available.',
                severity: 'critical',
                timestamp: '5 minutes ago',
                actionRequired: true
            },
            {
                id: '3',
                type: 'pricing',
                competitor: 'ScaleMaster',
                message: 'Dropped pricing by 20%. Activate RageDrop counter-offer.',
                severity: 'warning',
                timestamp: '15 minutes ago',
                actionRequired: false
            }
        ])

        setRageActions([
            {
                id: '1',
                type: 'counter-post',
                competitor: 'GrowthGuru',
                generatedContent: "🔥 FLASH SALE: 24 Hours Only! Don&apos;t let @growthguru steal your customers. Our proven system generates 3x more leads. Limited spots available. DM &quot;RAGE&quot; to claim your spot! 💪",
                status: 'ready',
                timestamp: '2 minutes ago',
                aiScore: 94
            },
            {
                id: '2',
                type: 'ad-clone',
                competitor: 'ProfitPulse',
                generatedContent: 'High-converting ad script targeting their audience with 40% stronger hook and urgency triggers.',
                status: 'pending',
                timestamp: '5 minutes ago',
                aiScore: 87
            }
        ])
    }, [])

    const startIntelScan = async () => {
        setIsScanning(true)
        setScanProgress(0)

        // Simulate scanning process
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 200))
            setScanProgress(i)
        }

        setIsScanning(false)
        // Add new alerts after scan
        setAlerts(prev => [...prev, {
            id: Date.now().toString(),
            type: 'trend',
            competitor: 'New Detection',
            message: 'AI detected trending hashtag #ScaleFast. Generate trend-hijacking content now.',
            severity: 'info',
            timestamp: 'Just now',
            actionRequired: true
        }])
    }

    const generateRageAction = (type: RageAction['type'], competitor: string) => {
        const newAction: RageAction = {
            id: Date.now().toString(),
            type,
            competitor,
            generatedContent: `AI-generated ${type} targeting ${competitor} with optimized conversion triggers.`,
            status: 'ready',
            timestamp: 'Just now',
            aiScore: Math.floor(Math.random() * 20) + 80
        }
        setRageActions(prev => [newAction, ...prev])
    }

    const getThreatLevelColor = (level: Competitor['threatLevel']) => {
        switch (level) {
            case 'low': return 'bg-green-500'
            case 'medium': return 'bg-yellow-500'
            case 'high': return 'bg-orange-500'
            case 'critical': return 'bg-red-500'
            default: return 'bg-gray-500'
        }
    }

    const getSeverityColor = (severity: IntelAlert['severity']) => {
        switch (severity) {
            case 'info': return 'border-blue-500 bg-blue-50'
            case 'warning': return 'border-yellow-500 bg-yellow-50'
            case 'critical': return 'border-red-500 bg-red-50'
            default: return 'border-gray-500 bg-gray-50'
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        RageIntel™
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        AI-Powered Competitor Intelligence & Attack System
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        onClick={startIntelScan}
                        disabled={isScanning}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {isScanning ? (
                            <>
                                <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                                Scanning...
                            </>
                        ) : (
                            <>
                                <Eye className="w-4 h-4 mr-2" />
                                Start Intel Scan
                            </>
                        )}
                    </Button>
                    <Button variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                    </Button>
                </div>
            </div>

            {/* Scan Progress */}
            {isScanning && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">AI Scanning Competitors...</span>
                            <span className="text-sm text-gray-500">{scanProgress}%</span>
                        </div>
                        <Progress value={scanProgress} className="w-full" />
                    </CardContent>
                </Card>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Threats</p>
                                <p className="text-2xl font-bold text-red-600">{competitors.filter(c => c.threatLevel === 'critical').length}</p>
                            </div>
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Rage Actions</p>
                                <p className="text-2xl font-bold text-blue-600">{rageActions.length}</p>
                            </div>
                            <Sword className="w-8 h-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">AI Score</p>
                                <p className="text-2xl font-bold text-green-600">94%</p>
                            </div>
                            <Brain className="w-8 h-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Market Share</p>
                                <p className="text-2xl font-bold text-purple-600">+23%</p>
                            </div>
                            <Crown className="w-8 h-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="competitors" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="competitors">Competitors</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                    <TabsTrigger value="actions">Rage Actions</TabsTrigger>
                    <TabsTrigger value="intel">Intel Map</TabsTrigger>
                    <TabsTrigger value="tools">AI Tools</TabsTrigger>
                </TabsList>

                {/* Competitors Tab */}
                <TabsContent value="competitors" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Competitor Intelligence
                            </CardTitle>
                            <CardDescription>
                                Real-time tracking of competitor activity and threat assessment
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {competitors.map((competitor) => (
                                    <div key={competitor.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${getThreatLevelColor(competitor.threatLevel)}`} />
                                                <div>
                                                    <h3 className="font-semibold">{competitor.name}</h3>
                                                    <p className="text-sm text-gray-500">{competitor.handle}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <p className="text-sm font-medium">{competitor.followers.toLocaleString()} followers</p>
                                                    <p className="text-xs text-gray-500">{competitor.engagement}% engagement</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium">${competitor.adSpend.toLocaleString()}</p>
                                                    <p className="text-xs text-gray-500">ad spend</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline" onClick={() => generateRageAction('counter-post', competitor.name)}>
                                                        <Copy className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="outline" onClick={() => generateRageAction('ad-clone', competitor.name)}>
                                                        <Target className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                                            <span>Last activity: {competitor.lastActivity}</span>
                                            <span>{competitor.contentCount} posts this week</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Alerts Tab */}
                <TabsContent value="alerts" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                Intel Alerts
                            </CardTitle>
                            <CardDescription>
                                AI-powered alerts for competitor movements and opportunities
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {alerts.map((alert) => (
                                    <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                                        <AlertCircle className="w-4 h-4" />
                                        <AlertDescription>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">{alert.competitor}</p>
                                                    <p className="text-sm">{alert.message}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                                                </div>
                                                {alert.actionRequired && (
                                                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                                        <Zap className="w-4 h-4 mr-1" />
                                                        Act Now
                                                    </Button>
                                                )}
                                            </div>
                                        </AlertDescription>
                                    </Alert>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Rage Actions Tab */}
                <TabsContent value="actions" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sword className="w-5 h-5" />
                                Rage Actions
                            </CardTitle>
                            <CardDescription>
                                AI-generated counter-strategies and attack content
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {rageActions.map((action) => (
                                    <div key={action.id} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline">{action.type}</Badge>
                                                <span className="text-sm font-medium">{action.competitor}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-500">AI Score: {action.aiScore}%</span>
                                                <Badge className={action.status === 'ready' ? 'bg-green-500' : 'bg-yellow-500'}>
                                                    {action.status}
                                                </Badge>
                                            </div>
                                        </div>
                                        <p className="text-sm mb-3">{action.generatedContent}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{action.timestamp}</span>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">
                                                    <Copy className="w-4 h-4 mr-1" />
                                                    Copy
                                                </Button>
                                                <Button size="sm" variant="outline">
                                                    <Play className="w-4 h-4 mr-1" />
                                                    Execute
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Intel Map Tab */}
                <TabsContent value="intel" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                RageGraph - Visual Attack Map
                            </CardTitle>
                            <CardDescription>
                                Visualize market positioning and AI-recommended attack vectors
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <Activity className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                                    <p className="text-gray-500">Interactive competitor map visualization</p>
                                    <p className="text-sm text-gray-400">Shows market positioning, activity levels, and attack opportunities</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* AI Tools Tab */}
                <TabsContent value="tools" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Copy className="w-5 h-5" />
                                    Content DNA Breakdown
                                </CardTitle>
                                <CardDescription>
                                    Analyze competitor content patterns and generate counter-strategies
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Input placeholder="Enter competitor handle" />
                                    <Button className="w-full">
                                        <Brain className="w-4 h-4 mr-2" />
                                        Analyze Content DNA
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="w-5 h-5" />
                                    Ad Rage Mirror™
                                </CardTitle>
                                <CardDescription>
                                    Clone and improve competitor ads automatically
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Input placeholder="Enter ad URL or competitor" />
                                    <Button className="w-full">
                                        <Zap className="w-4 h-4 mr-2" />
                                        Clone + Improve
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="w-5 h-5" />
                                    Pricing Recon AI
                                </CardTitle>
                                <CardDescription>
                                    Track competitor pricing changes and generate counter-offers
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Input placeholder="Enter competitor website" />
                                    <Button className="w-full">
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        Monitor Pricing
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    Audience Switchblade
                                </CardTitle>
                                <CardDescription>
                                    Hijack competitor audiences with targeted content
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Input placeholder="Enter competitor handles" />
                                    <Button className="w-full">
                                        <Shield className="w-4 h-4 mr-2" />
                                        Generate Audience Scripts
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
} 