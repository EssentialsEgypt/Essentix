"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Lightbulb,
    Target,
    Users,
    TrendingUp,
    Eye,
    ShoppingCart,
    AlertTriangle,
    Sparkles,
    Zap,
    Brain,
    Palette,
    TestTube,
    Calendar,
    MessageSquare,
    Play,
    Hash,
    Tag,
    TrendingDown,
    BarChart3,
    Star,
    Heart,
    Share2,
    Bookmark,
    Image
} from "lucide-react"
import {
    aiAdIdeaGeneratorService,
    type ProductContext,
    type AdBlueprint,
    type AdVariant,
    type PsychologicalAngle,
    type VisualCue,
    type CampaignReaction,
    type ViralContentData,
    type ViralAdIdea,
    type ViralContentAnalysis
} from "@/services/ai-ad-idea-generator"

// Mock data for demonstration
const mockProductContext: ProductContext = {
    id: "essentials-hoodie-001",
    name: "Essentials Fear of God Hoodie",
    views24h: 1700,
    conversions24h: 7,
    abandonedCheckouts: 45,
    lowStock: true,
    stockLevel: 9,
    price: 299,
    category: "Streetwear",
    tags: ["Limited", "Premium", "Trending"],
    audienceType: "cold",
    platform: "Instagram"
}

// ViralContent-AdIdeaEnhancer: Mock viral content data
const mockViralContent: ViralContentData[] = [
    {
        id: "viral-001",
        type: "reel",
        caption: "Real ones recognize real drops. This isn't for everyone. But it might be for you. #EssentialsEG #LimitedDrop #FearOfGod",
        hashtags: ["#EssentialsEG", "#LimitedDrop", "#FearOfGod", "#Streetwear"],
        likes: 15420,
        comments: 892,
        shares: 2341,
        saves: 1100,
        views: 220000,
        reach: 450000,
        engagementRate: 8.7,
        topComments: [
            "Real ones recognize real drops 🔥",
            "This isn't for everyone. But it might be for you 💯",
            "Need this in my life",
            "When's the restock?"
        ],
        ctaClicks: 156,
        postedAt: new Date('2024-01-15'),
        visualStyle: "Close-up product shots with fast transitions",
        emotionalTone: "Exclusive, aspirational, confident",
        viralPhrases: ["Real ones recognize real drops", "This isn't for everyone", "But it might be for you"],
        audienceReaction: "High engagement from streetwear enthusiasts"
    },
    {
        id: "viral-002",
        type: "post",
        caption: "Made for the real ones. 100% authentic. Fast delivery. Limited quantities. #EssentialsEG #FearOfGod #Streetwear",
        hashtags: ["#EssentialsEG", "#FearOfGod", "#Streetwear", "#Authentic"],
        likes: 8920,
        comments: 445,
        shares: 1234,
        saves: 567,
        reach: 180000,
        engagementRate: 6.2,
        topComments: [
            "Made for the real ones 🔥",
            "100% authentic 💯",
            "Need this drop",
            "When's the next restock?"
        ],
        ctaClicks: 89,
        postedAt: new Date('2024-01-14'),
        visualStyle: "Lifestyle shots with clean background",
        emotionalTone: "Authentic, premium, exclusive",
        viralPhrases: ["Made for the real ones", "100% authentic", "Limited quantities"],
        audienceReaction: "Strong interest in authenticity and exclusivity"
    }
]

const mockViralAdIdea: ViralAdIdea = {
    id: "viral-ad-001",
    sourceContentId: "viral-001",
    viralElement: "Real ones recognize real drops",
    adHook: "Real ones recognize real drops",
    adCopy: "This isn't for everyone. But it might be for you. 100% authentic. Fast delivery.",
    cta: "Shop now",
    psychologicalAngle: "Reward/VIP",
    visualStyle: "Close-up product shots with fast transitions",
    suggestedFormat: "Instagram Reels",
    targeting: "Streetwear enthusiasts, 18-30, Cairo, engaged with fashion content",
    confidence: 0.87,
    performancePrediction: "High CTR - Viral Formula",
    emotionalLanguage: "Exclusive, aspirational, confident",
    remixStrategy: "Replicate fast transitions and close-up shots for new product"
}

const mockAdBlueprint: AdBlueprint = {
    id: "ad-001",
    platform: "Instagram Reels",
    audience: "Male, 18-30, Cairo, visited in 7d",
    hook: "1700 people saw it. Only 7 ordered. Why?",
    copy: "Essentials just landed in Egypt — but it won't stay long. 100% authentic. Fast delivery.",
    cta: "Shop Now",
    emotion: "Scarcity / FOMO",
    visualSuggestion: "Lifestyle shot, clean background, zoom into logo",
    hashtags: ["#EssentialsEG", "#LimitedDrop", "#FearOfGod"],
    psychologicalAngle: "Curiosity",
    segment: "cold",
    predictedPerformance: "High CTR - Curiosity",
    variants: [],
    createdAt: new Date()
}

const mockVariants: AdVariant[] = [
    {
        id: "var-1",
        hook: "Only 9 left in Egypt. Don&apos;t miss the drop again.",
        cta: "Secure Yours",
        visualAngle: "Close-up of logo with scarcity overlay",
        emotionalDriver: "FOMO",
        prediction: "High CTR - Scarcity",
        confidence: 0.85
    },
    {
        id: "var-2",
        hook: "Why everyone in Egypt is obsessed with this drop...",
        cta: "See Why",
        visualAngle: "Full-body model walking toward camera",
        emotionalDriver: "Curiosity",
        prediction: "Soft engagement - Curiosity",
        confidence: 0.72
    },
    {
        id: "var-3",
        hook: "Still thinking about it? Here's why 2500+ already ordered.",
        cta: "Join Them",
        visualAngle: "Social proof overlay with customer count",
        emotionalDriver: "Social Proof",
        prediction: "Strong Click Intent",
        confidence: 0.78
    }
]

const mockVisualCues: VisualCue = {
    backgroundStyle: "Earth-tone background with urban cityscape",
    productShotAngle: "Full-body model walking toward camera with product name floating",
    modelExpression: "Confident, aspirational look",
    layoutIdea: "Text overlay: 'Made for this city'",
    textOverlayPlacement: "Bottom right corner with fade effect",
    colorScheme: "Neutral tones with accent orange"
}

export function AIPoweredAdIdeaGenerator() {
    const [productContext, setProductContext] = useState<ProductContext>(mockProductContext)
    const [generatedAds, setGeneratedAds] = useState<AdBlueprint[]>([])
    const [selectedAd, setSelectedAd] = useState<AdBlueprint | null>(null)
    const [variants, setVariants] = useState<AdVariant[]>([])
    const [visualCues, setVisualCues] = useState<VisualCue | null>(null)
    const [campaignReactions, setCampaignReactions] = useState<CampaignReaction[]>([])
    const [viralContent, setViralContent] = useState<ViralContentData[]>(mockViralContent)
    const [viralAdIdeas, setViralAdIdeas] = useState<ViralAdIdea[]>([])
    const [viralAnalysis, setViralAnalysis] = useState<ViralContentAnalysis | null>(null)
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("context")

    // Generate context-aware ad
    const handleGenerateContextAd = async () => {
        setLoading(true)
        try {
            const ad = await aiAdIdeaGeneratorService.generateContextAwareAd(productContext)
            setGeneratedAds(prev => [ad, ...prev])
            setSelectedAd(ad)
        } catch (error) {
            console.error("Error generating context ad:", error)
        } finally {
            setLoading(false)
        }
    }

    // Generate A/B test variants
    const handleGenerateVariants = async (ad: AdBlueprint) => {
        setLoading(true)
        try {
            const variants = await aiAdIdeaGeneratorService.generateABTestVariants(ad, 5)
            setVariants(variants)
        } catch (error) {
            console.error("Error generating variants:", error)
        } finally {
            setLoading(false)
        }
    }

    // Generate visual cues
    const handleGenerateVisualCues = async (ad: AdBlueprint) => {
        setLoading(true)
        try {
            const cues = await aiAdIdeaGeneratorService.generateVisualCues(
                productContext,
                ad.platform,
                ad.psychologicalAngle
            )
            setVisualCues(cues)
        } catch (error) {
            console.error("Error generating visual cues:", error)
        } finally {
            setLoading(false)
        }
    }

    // Generate drop campaign
    const handleGenerateDropCampaign = async () => {
        setLoading(true)
        try {
            const campaign = await aiAdIdeaGeneratorService.generateDropCampaign(productContext.id)
            setCampaignReactions(prev => [campaign, ...prev])
        } catch (error) {
            console.error("Error generating drop campaign:", error)
        } finally {
            setLoading(false)
        }
    }

    // ViralContent-AdIdeaEnhancer: Viral content handlers
    const handleAnalyzeViralContent = async () => {
        setLoading(true)
        try {
            const analysis = await aiAdIdeaGeneratorService.getViralContentAnalysis('30d')
            setViralAnalysis(analysis)
        } catch (error) {
            console.error("Error analyzing viral content:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleGenerateViralAdIdea = async (content: ViralContentData) => {
        setLoading(true)
        try {
            const viralAd = await aiAdIdeaGeneratorService.generateViralBasedAdIdea(content, productContext)
            setViralAdIdeas(prev => [viralAd, ...prev])
        } catch (error) {
            console.error("Error generating viral ad idea:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleGenerateViralCampaign = async (campaignType: 'retargeting' | 'cold' | 'drop') => {
        setLoading(true)
        try {
            const campaign = await aiAdIdeaGeneratorService.generateViralAdCampaign(
                viralContent,
                productContext,
                campaignType
            )
            setViralAdIdeas(prev => [...campaign, ...prev])
        } catch (error) {
            console.error("Error generating viral campaign:", error)
        } finally {
            setLoading(false)
        }
    }

    // Update product context
    const updateProductContext = (field: keyof ProductContext, value: any) => {
        setProductContext(prev => ({ ...prev, [field]: value }))
    }

    const getAngleColor = (angle: PsychologicalAngle) => {
        const colors = {
            FOMO: "bg-red-100 text-red-800",
            Curiosity: "bg-blue-100 text-blue-800",
            "Social Proof": "bg-green-100 text-green-800",
            "Problem/Solution": "bg-purple-100 text-purple-800",
            Aspirational: "bg-yellow-100 text-yellow-800",
            "Reward/VIP": "bg-pink-100 text-pink-800",
            Emotional: "bg-indigo-100 text-indigo-800"
        }
        return colors[angle] || "bg-gray-100 text-gray-800"
    }

    const getContentTypeIcon = (type: string) => {
        switch (type) {
            case 'reel': return <Play className="h-4 w-4" />
            case 'post': return <Image className="h-4 w-4" />
            case 'story': return <Bookmark className="h-4 w-4" />
            case 'carousel': return <BarChart3 className="h-4 w-4" />
            default: return <Hash className="h-4 w-4" />
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Brain className="h-6 w-6 text-blue-600" />
                        AI-Powered Ad Idea Generator
                    </CardTitle>
                    <CardDescription>
                        Generate dynamic, context-aware ad concepts with real-time data integration and viral content analysis
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="context">Context Engine</TabsTrigger>
                            <TabsTrigger value="blueprint">Ad Blueprint</TabsTrigger>
                            <TabsTrigger value="variants">A/B Testing</TabsTrigger>
                            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                            <TabsTrigger value="viral">Viral Content</TabsTrigger>
                        </TabsList>

                        {/* Context Engine Tab */}
                        <TabsContent value="context" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Product Context</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium">Product Name</label>
                                            <Input
                                                value={productContext.name}
                                                onChange={(e) => updateProductContext('name', e.target.value)}
                                                placeholder="Product name"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-sm font-medium">Views (24h)</label>
                                                <Input
                                                    type="number"
                                                    value={productContext.views24h}
                                                    onChange={(e) => updateProductContext('views24h', parseInt(e.target.value))}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium">Conversions (24h)</label>
                                                <Input
                                                    type="number"
                                                    value={productContext.conversions24h}
                                                    onChange={(e) => updateProductContext('conversions24h', parseInt(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Audience Type</label>
                                            <Select
                                                value={productContext.audienceType}
                                                onValueChange={(value) => updateProductContext('audienceType', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cold">Cold Audience</SelectItem>
                                                    <SelectItem value="warm">Warm Audience</SelectItem>
                                                    <SelectItem value="vip">VIP Customers</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                id="low-stock-checkbox"
                                                type="checkbox"
                                                checked={productContext.lowStock}
                                                onChange={(e) => updateProductContext('lowStock', e.target.checked)}
                                                aria-label="Low stock alert"
                                            />
                                            <label htmlFor="low-stock-checkbox" className="text-sm">Low Stock Alert</label>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Real-Time Signals</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Views in 24h</span>
                                            <Badge variant="secondary">{productContext.views24h}</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Conversions</span>
                                            <Badge variant="secondary">{productContext.conversions24h}</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Abandoned Checkouts</span>
                                            <Badge variant="destructive">{productContext.abandonedCheckouts}</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Stock Level</span>
                                            <Badge variant={productContext.lowStock ? "destructive" : "secondary"}>
                                                {productContext.stockLevel}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Button
                                onClick={handleGenerateContextAd}
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? "Generating..." : "Generate Context-Aware Ad"}
                            </Button>
                        </TabsContent>

                        {/* Ad Blueprint Tab */}
                        <TabsContent value="blueprint" className="space-y-4">
                            {selectedAd && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Sparkles className="h-5 w-5 text-yellow-500" />
                                            Generated Ad Blueprint
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-sm font-medium">Platform</label>
                                                    <p className="text-sm bg-gray-100 p-2 rounded">{selectedAd.platform}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">Audience</label>
                                                    <p className="text-sm bg-gray-100 p-2 rounded">{selectedAd.audience}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">Hook</label>
                                                    <p className="text-sm bg-blue-50 p-2 rounded border-l-4 border-blue-500">
                                                        {selectedAd.hook}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">Copy</label>
                                                    <p className="text-sm bg-gray-100 p-2 rounded">{selectedAd.copy}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">CTA</label>
                                                    <p className="text-sm bg-green-50 p-2 rounded border-l-4 border-green-500">
                                                        {selectedAd.cta}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-sm font-medium">Emotion</label>
                                                    <p className="text-sm bg-gray-100 p-2 rounded">{selectedAd.emotion}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">Psychological Angle</label>
                                                    <Badge className={getAngleColor(selectedAd.psychologicalAngle)}>
                                                        {selectedAd.psychologicalAngle}
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">Visual Suggestion</label>
                                                    <p className="text-sm bg-gray-100 p-2 rounded">{selectedAd.visualSuggestion}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">Hashtags</label>
                                                    <div className="flex flex-wrap gap-1">
                                                        {selectedAd.hashtags.map((tag, index) => (
                                                            <Badge key={index} variant="outline">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">Predicted Performance</label>
                                                    <p className="text-sm bg-yellow-50 p-2 rounded border-l-4 border-yellow-500">
                                                        {selectedAd.predictedPerformance}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleGenerateVariants(selectedAd)}
                                                variant="outline"
                                                size="sm"
                                            >
                                                <TestTube className="h-4 w-4 mr-2" />
                                                Generate A/B Variants
                                            </Button>
                                            <Button
                                                onClick={() => handleGenerateVisualCues(selectedAd)}
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Palette className="h-4 w-4 mr-2" />
                                                Visual Cues
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {visualCues && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Palette className="h-5 w-5 text-purple-500" />
                                            Visual Cue Builder
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-sm font-medium">Background Style</label>
                                                    <p className="text-sm bg-gray-100 p-2 rounded">{visualCues.backgroundStyle}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">Product Shot Angle</label>
                                                    <p className="text-sm bg-gray-100 p-2 rounded">{visualCues.productShotAngle}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">Model Expression</label>
                                                    <p className="text-sm bg-gray-100 p-2 rounded">{visualCues.modelExpression}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-sm font-medium">Layout Idea</label>
                                                    <p className="text-sm bg-gray-100 p-2 rounded">{visualCues.layoutIdea}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">Text Overlay Placement</label>
                                                    <p className="text-sm bg-gray-100 p-2 rounded">{visualCues.textOverlayPlacement}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">Color Scheme</label>
                                                    <p className="text-sm bg-gray-100 p-2 rounded">{visualCues.colorScheme}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* A/B Testing Tab */}
                        <TabsContent value="variants" className="space-y-4">
                            {variants.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">A/B Test Variants</h3>
                                    {variants.map((variant, index) => (
                                        <Card key={variant.id}>
                                            <CardContent className="pt-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <Badge variant="outline">Variant {index + 1}</Badge>
                                                    <Badge className={variant.confidence > 0.8 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                                        {Math.round(variant.confidence * 100)}% Confidence
                                                    </Badge>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <div>
                                                            <label className="text-sm font-medium">Hook</label>
                                                            <p className="text-sm bg-blue-50 p-2 rounded">{variant.hook}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">CTA</label>
                                                            <p className="text-sm bg-green-50 p-2 rounded">{variant.cta}</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div>
                                                            <label className="text-sm font-medium">Visual Angle</label>
                                                            <p className="text-sm bg-gray-100 p-2 rounded">{variant.visualAngle}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">Prediction</label>
                                                            <p className="text-sm bg-yellow-50 p-2 rounded border-l-4 border-yellow-500">
                                                                {variant.prediction}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        {/* Campaigns Tab */}
                        <TabsContent value="campaigns" className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Drop-Aware Campaigns</h3>
                                <Button
                                    onClick={handleGenerateDropCampaign}
                                    disabled={loading}
                                    size="sm"
                                >
                                    <Zap className="h-4 w-4 mr-2" />
                                    Generate Drop Campaign
                                </Button>
                            </div>

                            {campaignReactions.map((campaign) => (
                                <Card key={campaign.id}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-blue-500" />
                                            Drop Campaign: {campaign.productId}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-sm font-medium">Best Angle</label>
                                                    <Badge className={getAngleColor(campaign.bestAngle)}>
                                                        {campaign.bestAngle}
                                                    </Badge>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            id={`vip-sync-${campaign.id}`}
                                                            type="checkbox"
                                                            checked={campaign.vipListSync}
                                                            readOnly
                                                            aria-label="VIP list sync"
                                                        />
                                                        <label htmlFor={`vip-sync-${campaign.id}`} className="text-sm">VIP List Sync</label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            id={`timing-optimized-${campaign.id}`}
                                                            type="checkbox"
                                                            checked={campaign.timingOptimized}
                                                            readOnly
                                                            aria-label="Timing optimized"
                                                        />
                                                        <label htmlFor={`timing-optimized-${campaign.id}`} className="text-sm">Timing Optimized</label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            id={`content-calendar-${campaign.id}`}
                                                            type="checkbox"
                                                            checked={campaign.contentCalendarSync}
                                                            readOnly
                                                            aria-label="Content calendar sync"
                                                        />
                                                        <label htmlFor={`content-calendar-${campaign.id}`} className="text-sm">Content Calendar Sync</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium">AI Insights</label>
                                                <p className="text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 p-2 rounded border border-blue-200 dark:border-blue-700">{campaign.aiInsights}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        {/* ViralContent-AdIdeaEnhancer: Viral Content Tab */}
                        <TabsContent value="viral" className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Viral Content Analysis</h3>
                                <Button
                                    onClick={handleAnalyzeViralContent}
                                    disabled={loading}
                                    size="sm"
                                >
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    Analyze Viral Content
                                </Button>
                            </div>

                            {/* Viral Content List */}
                            <div className="space-y-4">
                                <h4 className="text-md font-medium">Top Performing Content</h4>
                                {viralContent.map((content) => (
                                    <Card key={content.id}>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-sm">
                                                {getContentTypeIcon(content.type)}
                                                {content.type.toUpperCase()} - {content.engagementRate}% Engagement
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <div>
                                                        <label className="text-sm font-medium">Caption</label>
                                                        <p className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded border border-gray-200 dark:border-gray-700">{content.caption}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium">Viral Phrases</label>
                                                        <div className="flex flex-wrap gap-1">
                                                            {content.viralPhrases.map((phrase, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                    {phrase}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium">Visual Style</label>
                                                        <p className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded border border-gray-200 dark:border-gray-700">{content.visualStyle}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="text-center">
                                                            <div className="text-lg font-semibold">{content.likes.toLocaleString()}</div>
                                                            <div className="text-xs text-muted-foreground">Likes</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-lg font-semibold">{content.comments.toLocaleString()}</div>
                                                            <div className="text-xs text-muted-foreground">Comments</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-lg font-semibold">{content.shares.toLocaleString()}</div>
                                                            <div className="text-xs text-muted-foreground">Shares</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-lg font-semibold">{content.saves.toLocaleString()}</div>
                                                            <div className="text-xs text-muted-foreground">Saves</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium">Emotional Tone</label>
                                                        <Badge variant="outline">{content.emotionalTone}</Badge>
                                                    </div>
                                                    <Button
                                                        onClick={() => handleGenerateViralAdIdea(content)}
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full"
                                                    >
                                                        <Lightbulb className="h-4 w-4 mr-2" />
                                                        Generate Ad from This
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Viral Ad Ideas */}
                            {viralAdIdeas.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="text-md font-medium">Generated Viral Ad Ideas</h4>
                                    {viralAdIdeas.map((viralAd) => (
                                        <Card key={viralAd.id}>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-sm">
                                                    <Star className="h-4 w-4 text-yellow-500" />
                                                    Viral Ad Idea - {Math.round(viralAd.confidence * 100)}% Confidence
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <div>
                                                            <label className="text-sm font-medium">Viral Element</label>
                                                            <p className="text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 p-2 rounded border-l-4 border-blue-500 dark:border-blue-400">
                                                                {viralAd.viralElement}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">Ad Hook</label>
                                                            <p className="text-sm bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100 p-2 rounded border-l-4 border-green-500 dark:border-green-400">
                                                                {viralAd.adHook}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">Ad Copy</label>
                                                            <p className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded border border-gray-200 dark:border-gray-700">{viralAd.adCopy}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">CTA</label>
                                                            <p className="text-sm bg-yellow-50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100 p-2 rounded border-l-4 border-yellow-500 dark:border-yellow-400">
                                                                {viralAd.cta}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div>
                                                            <label className="text-sm font-medium">Psychological Angle</label>
                                                            <Badge className={getAngleColor(viralAd.psychologicalAngle)}>
                                                                {viralAd.psychologicalAngle}
                                                            </Badge>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">Suggested Format</label>
                                                            <p className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded border border-gray-200 dark:border-gray-700">{viralAd.suggestedFormat}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">Targeting</label>
                                                            <p className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded border border-gray-200 dark:border-gray-700">{viralAd.targeting}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">Performance Prediction</label>
                                                            <p className="text-sm bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100 p-2 rounded border-l-4 border-purple-500 dark:border-purple-400">
                                                                {viralAd.performancePrediction}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">Remix Strategy</label>
                                                            <p className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded border border-gray-200 dark:border-gray-700">{viralAd.remixStrategy}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {/* Viral Campaign Generator */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Zap className="h-5 w-5 text-blue-500" />
                                        Viral Campaign Generator
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Button
                                            onClick={() => handleGenerateViralCampaign('retargeting')}
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Target className="h-4 w-4 mr-2" />
                                            Retargeting
                                        </Button>
                                        <Button
                                            onClick={() => handleGenerateViralCampaign('cold')}
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Users className="h-4 w-4 mr-2" />
                                            Cold Audience
                                        </Button>
                                        <Button
                                            onClick={() => handleGenerateViralCampaign('drop')}
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Drop Campaign
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Viral Analysis Results */}
                            {viralAnalysis && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <BarChart3 className="h-5 w-5 text-green-500" />
                                            Viral Pattern Analysis
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-sm font-medium">Successful Phrases</label>
                                                    <div className="flex flex-wrap gap-1">
                                                        {viralAnalysis.viralPatterns.successfulPhrases.slice(0, 5).map((phrase, index) => (
                                                            <Badge key={index} variant="outline" className="text-xs">
                                                                {phrase}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">Visual Styles</label>
                                                    <div className="space-y-1">
                                                        {viralAnalysis.viralPatterns.visualStyles.slice(0, 3).map((style, index) => (
                                                            <p key={index} className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded border border-gray-200 dark:border-gray-700">{style}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-sm font-medium">Recommendations</label>
                                                    <div className="space-y-1">
                                                        {viralAnalysis.recommendations.slice(0, 3).map((rec, index) => (
                                                            <p key={index} className="text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 p-2 rounded border-l-4 border-blue-500 dark:border-blue-400">
                                                                {rec}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
} 