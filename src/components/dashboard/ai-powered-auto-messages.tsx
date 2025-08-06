"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import ErrorBoundary from "@/components/ui/error-boundary"
import {
    Calendar,
    Clock,
    BarChart3,
    MessageSquare,
    Sparkles,
    Settings,
    History,
    Copy,
    Eye,
    Brain,
    Target,
    Users,
    Zap,
    Mic,
    Globe,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Play,
    Pause,
    Edit,
    Trash2,
    Plus,
    Filter,
    Search
} from "lucide-react"
import {
    aiAutoMessagesService,
    BehaviorTrigger,
    AutoMessageAction,
    MessageSequence,
    CustomerSegment,
    CampaignReaction,
    MessageAnalytics
} from "@/services/ai-auto-messages"

// AI Auto Message Enhancement - Preserves all existing functionality while adding AI features

interface AIAutoMessage extends BehaviorTrigger {
    // Enhanced with AI features
    aiOptimized: boolean
    performanceScore: number
    lastOptimized?: Date
    suggestedImprovements: string[]
}

const mockBehaviorTriggers: AIAutoMessage[] = [
    {
        id: "1",
        userId: "user1",
        triggerType: "shopify",
        triggerCondition: {
            event: "product_view",
            threshold: 3,
            timeWindow: 60,
            segment: "high_intent"
        },
        actions: [
            {
                id: "action1",
                triggerId: "1",
                actionType: "message",
                channel: "whatsapp",
                content: "Hey! I noticed you've been checking out our BAPE Shark Hoodie 👀 We saved it for you!",
                aiGenerated: true,
                tone: "casual",
                segment: "gen_z",
                isActive: true
            }
        ],
        isActive: true,
        lastTriggered: new Date(),
        triggerCount: 45,
        createdAt: new Date(),
        updatedAt: new Date(),
        aiOptimized: true,
        performanceScore: 0.87,
        lastOptimized: new Date(),
        suggestedImprovements: ["Add urgency", "Include size guide link"]
    },
    {
        id: "2",
        userId: "user1",
        triggerType: "ga4",
        triggerCondition: {
            event: "cart_abandon",
            threshold: 1,
            timeWindow: 30,
            segment: "abandoned_cart"
        },
        actions: [
            {
                id: "action2",
                triggerId: "2",
                actionType: "sequence",
                channel: "email",
                content: "Your cart is waiting for you!",
                aiGenerated: true,
                tone: "friendly",
                segment: "abandoned_cart",
                isActive: true
            }
        ],
        isActive: true,
        lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000),
        triggerCount: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
        aiOptimized: true,
        performanceScore: 0.92,
        lastOptimized: new Date(),
        suggestedImprovements: ["Add discount code", "Show similar products"]
    }
]

const mockCustomerSegments: CustomerSegment[] = [
    {
        id: "1",
        userId: "user1",
        segmentName: "Gen Z High Spenders",
        criteria: {
            purchaseHistory: 3,
            engagementLevel: "high",
            preferredChannel: "whatsapp",
            ageGroup: "gen_z"
        },
        tone: "casual",
        messageTemplates: [
            "Yo! 🔥 {product_name} is calling your name!",
            "Don&apos;t sleep on this drop 💯",
            "This is the vibe you've been looking for ✨"
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2",
        userId: "user1",
        segmentName: "VIP Loyalty",
        criteria: {
            purchaseHistory: 10,
            lastPurchase: 7,
            engagementLevel: "high",
            preferredChannel: "email"
        },
        tone: "loyalty",
        messageTemplates: [
            "Exclusive VIP access: {product_name}",
            "As a valued customer, enjoy early access",
            "Special VIP pricing just for you"
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

const mockCampaignReactions: CampaignReaction[] = [
    {
        id: "1",
        userId: "user1",
        campaignId: "campaign1",
        reactionType: "high_ctr_no_sales",
        triggerCondition: {
            ctr: 0.05,
            sales: 0,
            timeWindow: 24
        },
        actions: [
            {
                id: "reaction1",
                triggerId: "1",
                actionType: "message",
                channel: "whatsapp",
                content: "Need help picking the right size? Our team is here to help! 📏",
                aiGenerated: true,
                tone: "friendly",
                isActive: true
            }
        ],
        isActive: true,
        lastTriggered: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export function AIPoweredAutoMessages() {
    const [behaviorTriggers, setBehaviorTriggers] = useState<AIAutoMessage[]>(mockBehaviorTriggers)
    const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>(mockCustomerSegments)
    const [campaignReactions, setCampaignReactions] = useState<CampaignReaction[]>(mockCampaignReactions)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState("triggers")
    const [showCreateTrigger, setShowCreateTrigger] = useState(false)
    const [showCreateSegment, setShowCreateSegment] = useState(false)
    const [selectedTrigger, setSelectedTrigger] = useState<AIAutoMessage | null>(null)

    // AI Auto Message Enhancement - Behavior Trigger Management
    const handleCreateBehaviorTrigger = async (triggerData: Partial<BehaviorTrigger>) => {
        try {
            setLoading(true)
            const newTrigger = await aiAutoMessagesService.createBehaviorTrigger(triggerData)
            setBehaviorTriggers(prev => [...prev, newTrigger as AIAutoMessage])
            toast.success("Behavior trigger created successfully!")
            setShowCreateTrigger(false)
        } catch (error) {
            toast.error("Failed to create behavior trigger")
            setError(error instanceof Error ? error.message : "Unknown error")
        } finally {
            setLoading(false)
        }
    }

    // AI Auto Message Enhancement - AI Message Generation
    const handleGenerateAIMessage = async (triggerId: string, customerId: string) => {
        try {
            setLoading(true)
            const aiMessage = await aiAutoMessagesService.generateAdaptiveMessage({
                customerId,
                segment: "high_intent",
                triggerType: "product_view",
                language: "en"
            })

            // Update the trigger with AI-generated message
            setBehaviorTriggers(prev => prev.map(trigger =>
                trigger.id === triggerId
                    ? {
                        ...trigger,
                        actions: trigger.actions.map(action => ({
                            ...action,
                            content: aiMessage.message,
                            tone: aiMessage.tone as "casual" | "friendly" | "professional" | "loyalty" | "urgent",
                            channel: aiMessage.channel
                        }))
                    }
                    : trigger
            ))

            toast.success("AI message generated successfully!")
        } catch (error) {
            toast.error("Failed to generate AI message")
            setError(error instanceof Error ? error.message : "Unknown error")
        } finally {
            setLoading(false)
        }
    }

    // AI Auto Message Enhancement - Smart Channel Selection
    const handleOptimizeChannel = async (triggerId: string, customerId: string) => {
        try {
            setLoading(true)
            const optimalChannel = await aiAutoMessagesService.selectOptimalChannel({
                customerId,
                messageType: "abandoned_cart",
                previousEngagement: []
            })

            // Update the trigger with optimal channel
            setBehaviorTriggers(prev => prev.map(trigger =>
                trigger.id === triggerId
                    ? {
                        ...trigger,
                        actions: trigger.actions.map(action => ({
                            ...action,
                            channel: optimalChannel.channel
                        }))
                    }
                    : trigger
            ))

            toast.success(`Channel optimized to ${optimalChannel.channel}!`)
        } catch (error) {
            toast.error("Failed to optimize channel")
            setError(error instanceof Error ? error.message : "Unknown error")
        } finally {
            setLoading(false)
        }
    }

    // AI Auto Message Enhancement - Voice Message Generation
    const handleGenerateVoiceMessage = async (actionId: string, customerId: string, message: string) => {
        try {
            setLoading(true)
            const voiceMessage = await aiAutoMessagesService.generateVoiceMessage({
                customerId,
                message,
                language: "en",
                tone: "friendly",
                duration: 15
            })

            toast.success("Voice message generated successfully!")
        } catch (error) {
            toast.error("Failed to generate voice message")
            setError(error instanceof Error ? error.message : "Unknown error")
        } finally {
            setLoading(false)
        }
    }

    // AI Auto Message Enhancement - Message Optimization
    const handleOptimizeMessage = async (messageId: string) => {
        try {
            setLoading(true)
            const optimization = await aiAutoMessagesService.optimizeMessage({
                messageId,
                performanceData: {
                    openRate: 0.25,
                    clickRate: 0.08,
                    conversionRate: 0.03
                }
            })

            toast.success("Message optimized successfully!")
        } catch (error) {
            toast.error("Failed to optimize message")
            setError(error instanceof Error ? error.message : "Unknown error")
        } finally {
            setLoading(false)
        }
    }

    const getPerformanceColor = (score: number) => {
        if (score >= 0.8) return "text-green-600"
        if (score >= 0.6) return "text-yellow-600"
        return "text-red-600"
    }

    const getPerformanceIcon = (score: number) => {
        if (score >= 0.8) return <TrendingUp className="h-4 w-4 text-green-600" />
        if (score >= 0.6) return <AlertTriangle className="h-4 w-4 text-yellow-600" />
        return <AlertTriangle className="h-4 w-4 text-red-600" />
    }

    if (error) return <p className="p-4 text-center text-red-600">Error: {error}</p>

    return (
        <ErrorBoundary fallback={<p className="p-4 text-center text-red-600">Something went wrong.</p>}>
            <div className="space-y-6">
                {/* AI Auto Message Enhancement - Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Brain className="h-8 w-8 text-blue-600" />
                            AI-Powered Auto Messages
                        </h1>
                        <p className="text-muted-foreground">
                            Behavior-triggered messaging with AI tone adaptation and smart channel selection
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={() => setShowCreateTrigger(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Trigger
                        </Button>
                        <Button variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            AI Settings
                        </Button>
                    </div>
                </div>

                {/* AI Auto Message Enhancement - Main Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="triggers">Behavior Triggers</TabsTrigger>
                        <TabsTrigger value="segments">Customer Segments</TabsTrigger>
                        <TabsTrigger value="reactions">Campaign Reactions</TabsTrigger>
                        <TabsTrigger value="analytics">AI Analytics</TabsTrigger>
                    </TabsList>

                    {/* AI Auto Message Enhancement - Behavior Triggers Tab */}
                    <TabsContent value="triggers" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5" />
                                    AI Behavior Triggers
                                </CardTitle>
                                <CardDescription>
                                    Dynamic triggers that respond to user behavior in real-time
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Trigger</TableHead>
                                            <TableHead>Condition</TableHead>
                                            <TableHead>AI Score</TableHead>
                                            <TableHead>Performance</TableHead>
                                            <TableHead>Actions</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {behaviorTriggers.map((trigger) => (
                                            <TableRow key={trigger.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline">{trigger.triggerType}</Badge>
                                                        <span className="font-medium">
                                                            {trigger.triggerCondition.event.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        <div>Threshold: {trigger.triggerCondition.threshold}</div>
                                                        <div>Window: {trigger.triggerCondition.timeWindow}m</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {getPerformanceIcon(trigger.performanceScore)}
                                                        <span className={getPerformanceColor(trigger.performanceScore)}>
                                                            {(trigger.performanceScore * 100).toFixed(0)}%
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="text-sm">Triggered: {trigger.triggerCount}x</div>
                                                        <Progress value={trigger.performanceScore * 100} className="h-2" />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleGenerateAIMessage(trigger.id, "customer1")}
                                                            disabled={loading}
                                                        >
                                                            <Sparkles className="h-3 w-3 mr-1" />
                                                            AI Generate
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleOptimizeChannel(trigger.id, "customer1")}
                                                            disabled={loading}
                                                        >
                                                            <Globe className="h-3 w-3 mr-1" />
                                                            Optimize
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleOptimizeMessage("msg1")}
                                                            disabled={loading}
                                                        >
                                                            <Zap className="h-3 w-3 mr-1" />
                                                            Optimize
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Switch checked={trigger.isActive} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* AI Auto Message Enhancement - Customer Segments Tab */}
                    <TabsContent value="segments" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    AI Customer Segments
                                </CardTitle>
                                <CardDescription>
                                    AI-powered customer segmentation with adaptive tone matching
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {customerSegments.map((segment) => (
                                        <Card key={segment.id} className="p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <h3 className="font-semibold">{segment.segmentName}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {segment.criteria.engagementLevel} engagement
                                                    </p>
                                                </div>
                                                <Badge variant="outline">{segment.tone}</Badge>
                                            </div>

                                            <div className="space-y-2 mb-3">
                                                <div className="text-sm">
                                                    <span className="font-medium">Criteria:</span>
                                                    <ul className="mt-1 space-y-1">
                                                        {segment.criteria.purchaseHistory && (
                                                            <li>• {segment.criteria.purchaseHistory}+ purchases</li>
                                                        )}
                                                        {segment.criteria.preferredChannel && (
                                                            <li>• Prefers {segment.criteria.preferredChannel}</li>
                                                        )}
                                                        {segment.criteria.ageGroup && (
                                                            <li>• {segment.criteria.ageGroup.replace('_', ' ')}</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="text-sm font-medium">AI Message Templates:</h4>
                                                <div className="space-y-1">
                                                    {segment.messageTemplates.slice(0, 2).map((template, index) => (
                                                        <div key={index} className="text-xs bg-muted p-2 rounded">
                                                            {template}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 mt-3">
                                                <Button size="sm" variant="outline">
                                                    <Edit className="h-3 w-3 mr-1" />
                                                    Edit
                                                </Button>
                                                <Button size="sm" variant="outline">
                                                    <Sparkles className="h-3 w-3 mr-1" />
                                                    AI Optimize
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* AI Auto Message Enhancement - Campaign Reactions Tab */}
                    <TabsContent value="reactions" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="h-5 w-5" />
                                    AI Campaign Reactions
                                </CardTitle>
                                <CardDescription>
                                    Real-time campaign performance reactions with AI-powered responses
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Campaign</TableHead>
                                            <TableHead>Reaction Type</TableHead>
                                            <TableHead>Condition</TableHead>
                                            <TableHead>AI Response</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {campaignReactions.map((reaction) => (
                                            <TableRow key={reaction.id}>
                                                <TableCell>
                                                    <div className="font-medium">Campaign {reaction.campaignId}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {reaction.reactionType.replace('_', ' ')}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        <div>CTR: {reaction.triggerCondition.ctr * 100}%</div>
                                                        <div>Sales: {reaction.triggerCondition.sales}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {reaction.actions[0]?.content}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Switch checked={reaction.isActive} />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Button size="sm" variant="outline">
                                                            <Play className="h-3 w-3 mr-1" />
                                                            Test
                                                        </Button>
                                                        <Button size="sm" variant="outline">
                                                            <Edit className="h-3 w-3 mr-1" />
                                                            Edit
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* AI Auto Message Enhancement - Analytics Tab */}
                    <TabsContent value="analytics" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BarChart3 className="h-5 w-5" />
                                        AI Performance
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">87%</div>
                                            <div className="text-sm text-muted-foreground">AI Optimization Success</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">23%</div>
                                            <div className="text-sm text-muted-foreground">Conversion Lift</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-600">45s</div>
                                            <div className="text-sm text-muted-foreground">Avg Response Time</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageSquare className="h-5 w-5" />
                                        Channel Performance
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">WhatsApp</span>
                                            <span className="text-sm font-medium">92%</span>
                                        </div>
                                        <Progress value={92} className="h-2" />

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Email</span>
                                            <span className="text-sm font-medium">78%</span>
                                        </div>
                                        <Progress value={78} className="h-2" />

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Instagram DM</span>
                                            <span className="text-sm font-medium">85%</span>
                                        </div>
                                        <Progress value={85} className="h-2" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Brain className="h-5 w-5" />
                                        AI Insights
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                                            <div className="text-sm">
                                                <div className="font-medium">High Performance</div>
                                                <div className="text-muted-foreground">Gen Z segment responding well to casual tone</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                                            <div className="text-sm">
                                                <div className="font-medium">Optimization Needed</div>
                                                <div className="text-muted-foreground">VIP segment needs more urgency in messages</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                                            <div className="text-sm">
                                                <div className="font-medium">Trending Up</div>
                                                <div className="text-muted-foreground">Voice messages showing 34% higher engagement</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* AI Auto Message Enhancement - Create Trigger Dialog */}
                <Dialog open={showCreateTrigger} onOpenChange={setShowCreateTrigger}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Brain className="h-5 w-5" />
                                Create AI Behavior Trigger
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Trigger Type</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select trigger type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="shopify">Shopify Events</SelectItem>
                                            <SelectItem value="ga4">Google Analytics 4</SelectItem>
                                            <SelectItem value="meta_pixel">Meta Pixel</SelectItem>
                                            <SelectItem value="instagram">Instagram Activity</SelectItem>
                                            <SelectItem value="whatsapp">WhatsApp Activity</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Event</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select event" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="product_view">Product View</SelectItem>
                                            <SelectItem value="cart_abandon">Cart Abandon</SelectItem>
                                            <SelectItem value="checkout_fail">Checkout Fail</SelectItem>
                                            <SelectItem value="dm_sent">DM Sent</SelectItem>
                                            <SelectItem value="story_reply">Story Reply</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Threshold</label>
                                    <Input type="number" placeholder="3" />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Time Window (minutes)</label>
                                    <Input type="number" placeholder="60" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">AI Channel Selection</label>
                                <div className="flex items-center gap-2 mt-2">
                                    <Switch defaultChecked />
                                    <span className="text-sm">Let AI choose optimal channel</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">AI Tone Adaptation</label>
                                <div className="flex items-center gap-2 mt-2">
                                    <Switch defaultChecked />
                                    <span className="text-sm">Adapt tone based on customer segment</span>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setShowCreateTrigger(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={() => handleCreateBehaviorTrigger({
                                    userId: "user1",
                                    triggerType: "shopify",
                                    triggerCondition: {
                                        event: "product_view",
                                        threshold: 3,
                                        timeWindow: 60
                                    },
                                    isActive: true
                                })}>
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Create with AI
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </ErrorBoundary>
    )
} 