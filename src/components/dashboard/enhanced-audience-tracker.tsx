"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts"
import { useToast } from "@/hooks/use-toast"
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  AlertTriangle,
  Brain,
  BarChart3,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MessageSquare,
  Zap,
  Eye,
  MousePointer,
  ShoppingCart,
  CreditCard,
  Filter,
  Search,
  X,
  CheckCircle,
  Activity,
  PieChart as PieChartIcon,
  MapPin,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Download,
  Share2,
  Bell,
  BellOff,
  Timer,
  Users,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Smartphone as Phone,
  Mail,
  Slack,
  MessageCircle,
  Zap as Lightning,
  Target as Bullseye,
  TrendingUp as ChartUp,
  AlertCircle,
  Info,
  Star,
  Heart,
  ThumbsUp,
  Eye as Views,
  MessageSquare as Comments,
  Share,
  Calendar as CalendarIcon,
  Clock as TimeIcon,
  MapPin as LocationIcon,
  Users as GroupIcon,
  Activity as PulseIcon,
  Brain as AIBrain,
  Zap as AIZap,
  Target as AITarget,
  TrendingUp as AITrend,
  AlertTriangle as AIAlert,
  CheckCircle as AICheck,
  Info as AIInfo,
  Star as AIStar,
  Heart as AIHeart,
  ThumbsUp as AIThumbs,
  Eye as AIViews,
  MessageSquare as AIComments,
  Share as AIShare,
  Calendar as AICalendar,
  Clock as AITime,
  MapPin as AILocation,
  Users as AIGroup,
  Activity as AIPulse,
  DollarSign
} from "lucide-react"

// Enhanced mock audience tracker data with demographics and response rates
const initialAudienceData = [
  { date: "2024-06-01", newFollowers: 120, unfollows: 30 },
  { date: "2024-06-02", newFollowers: 150, unfollows: 20 },
  { date: "2024-06-03", newFollowers: 180, unfollows: 25 },
  { date: "2024-06-04", newFollowers: 200, unfollows: 15 },
  { date: "2024-06-05", newFollowers: 170, unfollows: 10 },
  { date: "2024-06-06", newFollowers: 190, unfollows: 5 },
  { date: "2024-06-07", newFollowers: 210, unfollows: 8 },
]

const demographics = {
  ageGroups: [
    { label: "18-24", value: 40 },
    { label: "25-34", value: 35 },
    { label: "35-44", value: 15 },
    { label: "45-54", value: 7 },
    { label: "55+", value: 3 },
  ],
  locations: [
    { label: "New York", value: 25 },
    { label: "Los Angeles", value: 20 },
    { label: "Chicago", value: 15 },
    { label: "Houston", value: 10 },
    { label: "Other", value: 30 },
  ],
  phoneNumbers: [
    "123-456-7890",
    "234-567-8901",
    "345-678-9012",
  ],
  emails: [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com",
  ]
}

// AI-Enhanced Logic: AI Timing Intelligence Data
const aiTimingData = {
  platformEngagement: [
    { platform: "Instagram", hour: "8-10", engagement: 85, reach: 1200, location: "Egypt" },
    { platform: "Instagram", hour: "12-14", engagement: 72, reach: 980, location: "Egypt" },
    { platform: "Instagram", hour: "18-20", engagement: 94, reach: 1500, location: "Egypt" },
    { platform: "TikTok", hour: "10-12", engagement: 78, reach: 2100, location: "Egypt" },
    { platform: "TikTok", hour: "16-18", engagement: 91, reach: 2800, location: "Egypt" },
    { platform: "TikTok", hour: "20-22", engagement: 88, reach: 2400, location: "Egypt" },
    { platform: "Facebook", hour: "9-11", engagement: 65, reach: 850, location: "Egypt" },
    { platform: "Facebook", hour: "19-21", engagement: 82, reach: 1100, location: "Egypt" },
  ],
  deviceActivity: [
    { device: "Mobile", hour: "8-10", activity: 92, source: "organic" },
    { device: "Mobile", hour: "12-14", activity: 78, source: "ads" },
    { device: "Mobile", hour: "18-20", activity: 95, source: "organic" },
    { device: "Desktop", hour: "9-11", activity: 45, source: "organic" },
    { device: "Desktop", hour: "14-16", activity: 38, source: "ads" },
    { device: "Desktop", hour: "19-21", activity: 52, source: "organic" },
  ],
  patterns: [
    "Monday 3-5PM = high reach from TikTok in Egypt",
    "Wednesday 8PM = peak Instagram Story engagement",
    "Friday 6-8PM = best time for product drops",
    "Sunday 2-4PM = highest organic reach across platforms"
  ]
}

// AI-Enhanced Logic: Post Timing Forecaster Data
const timingForecasterData = {
  nextBestTimes: [
    { time: "2 hours from now", platform: "Instagram", reason: "Peak engagement window", confidence: 94 },
    { time: "Tomorrow 8PM", platform: "TikTok", reason: "Historical high reach", confidence: 89 },
    { time: "Friday 6PM", platform: "All platforms", reason: "Weekend shopping surge", confidence: 92 }
  ],
  historicalData: [
    { time: "8-10 AM", reach: 1200, engagement: 85, platform: "Instagram" },
    { time: "12-2 PM", reach: 980, engagement: 72, platform: "Instagram" },
    { time: "6-8 PM", reach: 1500, engagement: 94, platform: "Instagram" },
    { time: "10-12 AM", reach: 2100, engagement: 78, platform: "TikTok" },
    { time: "4-6 PM", reach: 2800, engagement: 91, platform: "TikTok" },
    { time: "8-10 PM", reach: 2400, engagement: 88, platform: "TikTok" }
  ]
}

// AI-Enhanced Logic: Platform Sync Layer Data
const platformSyncData = {
  comparisons: [
    { platform: "Instagram", time: "8PM Wed", metric: "Story replies", performance: "3x more", vs: "average" },
    { platform: "TikTok", time: "3 hours after IG", metric: "engagement", performance: "better", vs: "solo posting" },
    { platform: "Facebook", time: "7PM Thu", metric: "link clicks", performance: "2.5x more", vs: "other times" },
    { platform: "All", time: "Friday 6PM", metric: "conversions", performance: "peak", vs: "week average" }
  ],
  crossPlatformInsights: [
    "Posting on Instagram 2 hours before TikTok increases cross-platform engagement by 34%",
    "Facebook ads perform 28% better when Instagram story is active",
    "TikTok content gets 45% more views when posted after Instagram story engagement peaks"
  ]
}

// AI-Enhanced Logic: AI Alerts System Data
const aiAlertsData = {
  activeAlerts: [
    { id: 1, type: "peak", message: "Your audience is peaking now, post ASAP", platform: "Instagram", priority: "high", time: "2 minutes ago" },
    { id: 2, type: "missed", message: "You missed peak hours for 3 days in a row — consider rescheduling", platform: "All", priority: "medium", time: "1 hour ago" },
    { id: 3, type: "opportunity", message: "Competitor activity low - good time to post", platform: "TikTok", priority: "low", time: "30 minutes ago" }
  ],
  alertSettings: {
    email: true,
    whatsapp: true,
    slack: false,
    push: true
  }
}

// AI-Enhanced Logic: Drop Readiness Score Data
const dropReadinessData = {
  currentScore: 78,
  factors: [
    { factor: "Daily activity level", score: 85, weight: 0.3 },
    { factor: "Post interaction rate", score: 72, weight: 0.25 },
    { factor: "Wishlist views", score: 91, weight: 0.2 },
    { factor: "Saves rate", score: 68, weight: 0.15 },
    { factor: "Comment engagement", score: 79, weight: 0.1 }
  ],
  recommendations: [
    "Post 2 more stories to increase activity level",
    "Engage with 15 more comments to boost interaction rate",
    "Share behind-the-scenes content to increase saves"
  ]
}

// AI-Enhanced Logic: Competitor Timing Scanner Data
const competitorTimingData = {
  blindSpots: [
    { day: "Saturday", time: "10AM-1PM", reason: "None of your competitors post in this window", opportunity: "Claim this window for your next product drop" },
    { day: "Tuesday", time: "2-4PM", reason: "Low competitor activity", opportunity: "Good time for experimental content" },
    { day: "Sunday", time: "7-9PM", reason: "Competitors focus on family content", opportunity: "Post lifestyle/product mix content" }
  ],
  competitorActivity: [
    { competitor: "FashionBrand1", typicalTime: "8PM", frequency: "daily", platform: "Instagram" },
    { competitor: "StyleHub", typicalTime: "6PM", frequency: "3x/week", platform: "TikTok" },
    { competitor: "TrendSetter", typicalTime: "9PM", frequency: "2x/week", platform: "All" }
  ]
}

// AI-Enhanced Logic: Personalized AI Suggestions Data
const personalizedAISuggestions = {
  dropTimes: [
    { time: "Friday 6PM", confidence: 94, reason: "Your audience shows highest purchase intent on Fridays" },
    { time: "Wednesday 8PM", confidence: 87, reason: "Best engagement-to-conversion ratio" },
    { time: "Sunday 2PM", confidence: 82, reason: "Low competition, high organic reach" }
  ],
  postFrequency: {
    recommended: "3-4 posts per day",
    reason: "Your audience engagement drops after 4 posts",
    optimal: "2 Instagram, 1 TikTok, 1 Facebook"
  },
  ctaTypes: [
    { type: "Limited Time", effectiveness: 94, reason: "Your audience responds well to urgency" },
    { type: "Exclusive Access", effectiveness: 87, reason: "VIP treatment increases engagement" },
    { type: "Story Polls", effectiveness: 91, reason: "Interactive content performs best" }
  ]
}

// VIP AI Logic Start: VIP Customer Engine Data
const vipCustomerData = {
  vipCustomers: [
    {
      id: "vip_001",
      name: "Sara Ahmed",
      email: "sara.ahmed@email.com",
      phone: "+201234567890",
      instagram: "@sara_style",
      tier: "Tier 1 - Power Buyer",
      totalSpent: 8500,
      orderCount: 12,
      lastOrder: "2024-01-15",
      daysSinceLastOrder: 21,
      purchaseProbability: 78,
      engagementScore: 92,
      favoriteCategories: ["Hoodies", "Accessories"],
      socialInteractions: 45,
      storyReplies: 23,
      tags: 8,
      influenceIndex: 85,
      emotionalTriggers: ["Exclusive", "Limited", "Hidden"],
      lifecycle: {
        firstVisit: "2023-03-15",
        firstOrder: "2023-04-02",
        lastActivity: "2024-01-20",
        status: "Active VIP"
      },
      recentActivity: [
        { type: "product_view", item: "Premium Hoodie", date: "2024-01-20" },
        { type: "cart_add", item: "Designer Cap", date: "2024-01-19" },
        { type: "story_reply", content: "Love this!", date: "2024-01-18" }
      ]
    },
    {
      id: "vip_002",
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      phone: "+201234567891",
      instagram: "@ahmed_fashion",
      tier: "Tier 2 - Social Advocate",
      totalSpent: 6200,
      orderCount: 8,
      lastOrder: "2024-01-10",
      daysSinceLastOrder: 26,
      purchaseProbability: 65,
      engagementScore: 88,
      favoriteCategories: ["T-Shirts", "Sneakers"],
      socialInteractions: 67,
      storyReplies: 34,
      tags: 15,
      influenceIndex: 92,
      emotionalTriggers: ["New Arrival", "Trending", "Popular"],
      lifecycle: {
        firstVisit: "2023-05-20",
        firstOrder: "2023-06-10",
        lastActivity: "2024-01-22",
        status: "Engaged VIP"
      },
      recentActivity: [
        { type: "product_share", item: "Limited T-Shirt", date: "2024-01-22" },
        { type: "comment", content: "This is fire!", date: "2024-01-21" },
        { type: "story_reply", content: "Need this!", date: "2024-01-20" }
      ]
    },
    {
      id: "vip_003",
      name: "Fatima Ali",
      email: "fatima.ali@email.com",
      phone: "+201234567892",
      instagram: "@fatima_luxury",
      tier: "Tier 3 - Silent Whale",
      totalSpent: 15000,
      orderCount: 5,
      lastOrder: "2024-01-05",
      daysSinceLastOrder: 31,
      purchaseProbability: 45,
      engagementScore: 35,
      favoriteCategories: ["Premium Items", "Limited Edition"],
      socialInteractions: 12,
      storyReplies: 3,
      tags: 1,
      influenceIndex: 25,
      emotionalTriggers: ["Premium", "Exclusive", "Rare"],
      lifecycle: {
        firstVisit: "2023-02-10",
        firstOrder: "2023-03-01",
        lastActivity: "2024-01-15",
        status: "At Risk"
      },
      recentActivity: [
        { type: "product_view", item: "Limited Edition Jacket", date: "2024-01-15" },
        { type: "wishlist_add", item: "Premium Sneakers", date: "2024-01-14" },
        { type: "email_open", campaign: "New Arrivals", date: "2024-01-13" }
      ]
    }
  ],
  vipAlerts: [
    {
      id: 1,
      type: "retention",
      customer: "Sara Ahmed",
      message: "Sara hasn't purchased in 21 days - send reactivation campaign",
      priority: "high",
      suggestedAction: "Send personalized email with 15% discount"
    },
    {
      id: 2,
      type: "engagement",
      customer: "Ahmed Hassan",
      message: "Ahmed shared 3 products this week - perfect for UGC campaign",
      priority: "medium",
      suggestedAction: "Invite for product collaboration"
    },
    {
      id: 3,
      type: "risk",
      customer: "Fatima Ali",
      message: "Fatima's engagement dropped 60% - needs re-activation",
      priority: "high",
      suggestedAction: "Send VIP-exclusive early access"
    }
  ],
  vipCampaigns: [
    {
      id: "camp_001",
      type: "reactivation",
      target: "Sara Ahmed",
      strategy: "Personalized Discount",
      content: {
        email: "Hi Sara, we miss you! Here's 15% off your next order.",
        whatsapp: "Hey Sara! Your favorite hoodie just restocked with VIP pricing 🎁",
        instagram: "Sara, this drop is for you 💎"
      },
      products: ["Premium Hoodie", "Designer Cap"],
      sendTime: "2024-01-25 10:00",
      status: "scheduled"
    },
    {
      id: "camp_002",
      type: "reward",
      target: "Ahmed Hassan",
      strategy: "UGC Collaboration",
      content: {
        email: "Ahmed, we'd love to feature your style!",
        whatsapp: "Ahmed, want to be our next brand ambassador?",
        instagram: "Ahmed, this collab is calling your name ✨"
      },
      products: ["Limited T-Shirt", "New Collection"],
      sendTime: "2024-01-26 14:00",
      status: "draft"
    }
  ],
  vipMetrics: {
    totalVIPs: 156,
    activeVIPs: 89,
    atRiskVIPs: 23,
    newVIPs: 12,
    averageSpend: 7800,
    retentionRate: 87,
    engagementRate: 76
  }
}

export function EnhancedAudienceTracker() {
  const [audienceData] = useState(initialAudienceData)
  const [activeTab, setActiveTab] = useState("overview")
  const [aiAlertsEnabled, setAiAlertsEnabled] = useState(true)
  const [realTimeTracking, setRealTimeTracking] = useState(true)
  const [vipAlertsEnabled, setVipAlertsEnabled] = useState(true)
  const { toast } = useToast()

  // AI-Enhanced Logic: Real-time alert simulation
  useEffect(() => {
    if (aiAlertsEnabled) {
      const interval = setInterval(() => {
        const randomAlert = aiAlertsData.activeAlerts[Math.floor(Math.random() * aiAlertsData.activeAlerts.length)]
        if (Math.random() > 0.7) {
          toast({
            title: "AI Alert",
            description: randomAlert.message,
            variant: randomAlert.priority === "high" ? "destructive" : "default"
          })
        }
      }, 30000) // Check every 30 seconds

      return () => clearInterval(interval)
    }
  }, [aiAlertsEnabled, toast])

  // VIP AI Logic: VIP alert simulation
  useEffect(() => {
    if (vipAlertsEnabled) {
      const interval = setInterval(() => {
        const randomVipAlert = vipCustomerData.vipAlerts[Math.floor(Math.random() * vipCustomerData.vipAlerts.length)]
        if (Math.random() > 0.8) {
          toast({
            title: "VIP Alert",
            description: randomVipAlert.message,
            variant: randomVipAlert.priority === "high" ? "destructive" : "default"
          })
        }
      }, 45000) // Check every 45 seconds

      return () => clearInterval(interval)
    }
  }, [vipAlertsEnabled, toast])

  const handlePostNow = (time: string) => {
    toast({
      title: "Scheduled Post",
      description: `Post scheduled for ${time}`,
    })
  }

  const handleOptimizeTiming = () => {
    toast({
      title: "AI Optimization",
      description: "Analyzing your audience patterns and optimizing posting schedule...",
    })
  }

  // VIP AI Logic: VIP-specific handlers
  const handleVipEmail = (vipName: string) => {
    toast({
      title: "VIP Email Sent",
      description: `Personalized email sent to ${vipName}`,
    })
  }

  const handleVipWhatsApp = (vipName: string) => {
    toast({
      title: "VIP WhatsApp Sent",
      description: `WhatsApp message sent to ${vipName}`,
    })
  }

  const handleVipDM = (vipName: string) => {
    toast({
      title: "VIP Instagram DM Sent",
      description: `Instagram DM sent to ${vipName}`,
    })
  }

  const handleVipAccess = (vipName: string) => {
    toast({
      title: "VIP Access Granted",
      description: `Early access granted to ${vipName}`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header with AI Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audience Tracker</h1>
          <p className="text-muted-foreground">AI-powered audience insights and timing optimization</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={aiAlertsEnabled}
              onCheckedChange={setAiAlertsEnabled}
            />
            <Label>AI Alerts</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={realTimeTracking}
              onCheckedChange={setRealTimeTracking}
            />
            <Label>Real-time tracking</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={vipAlertsEnabled}
              onCheckedChange={setVipAlertsEnabled}
            />
            <Label>VIP Alerts</Label>
          </div>
          <Button onClick={handleOptimizeTiming} variant="outline">
            <AIBrain className="h-4 w-4 mr-2" />
            Optimize Timing
          </Button>
        </div>
      </div>

      {/* AI Alerts Section */}
      {aiAlertsEnabled && (
        <div className="space-y-2">
          {aiAlertsData.activeAlerts.map((alert) => (
            <Alert key={alert.id} className={`border-l-4 ${alert.priority === "high" ? "border-red-500 bg-red-50" :
              alert.priority === "medium" ? "border-yellow-500 bg-yellow-50" :
                "border-blue-500 bg-blue-50"
              }`}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{alert.message}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{alert.platform}</Badge>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-timing">AI Timing</TabsTrigger>
          <TabsTrigger value="forecaster">Forecaster</TabsTrigger>
          <TabsTrigger value="platform-sync">Platform Sync</TabsTrigger>
          <TabsTrigger value="drop-readiness">Drop Readiness</TabsTrigger>
          <TabsTrigger value="competitor-scan">Competitor Scan</TabsTrigger>
          <TabsTrigger value="ai-suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="vip-customers">VIP Customers</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="abandoned-checkouts">Abandoned Checkouts</TabsTrigger>
        </TabsList>

        {/* Overview Tab - Original Content */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audience Growth</CardTitle>
              <CardDescription>Track audience growth, demographics, and response rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={audienceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="newFollowers" stroke="#8884d8" name="New Followers" />
                  <Line type="monotone" dataKey="unfollows" stroke="#82ca9d" name="Unfollows" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Timing Intelligence Tab */}
        <TabsContent value="ai-timing" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Engagement Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AIBrain className="h-5 w-5" />
                  AI Timing Intelligence
                </CardTitle>
                <CardDescription>Platform-specific engagement patterns by time and location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiTimingData.platformEngagement.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {item.platform === "Instagram" && <Instagram className="h-4 w-4 text-pink-500" />}
                          {item.platform === "TikTok" && <MessageSquare className="h-4 w-4 text-black" />}
                          {item.platform === "Facebook" && <Facebook className="h-4 w-4 text-blue-600" />}
                          <span className="font-medium">{item.platform}</span>
                        </div>
                        <Badge variant="outline">{item.location}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Time</div>
                          <div className="font-medium">{item.hour}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Engagement</div>
                          <div className="font-medium">{item.engagement}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Reach</div>
                          <div className="font-medium">{item.reach.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Activity Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Device Activity Patterns</CardTitle>
                <CardDescription>Activity by device type and traffic source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiTimingData.deviceActivity.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {item.device === "Mobile" && <Smartphone className="h-4 w-4" />}
                          {item.device === "Desktop" && <Monitor className="h-4 w-4" />}
                          <span className="font-medium">{item.device}</span>
                        </div>
                        <Badge variant={item.source === "organic" ? "default" : "secondary"}>
                          {item.source}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Time</div>
                          <div className="font-medium">{item.hour}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Activity</div>
                          <div className="font-medium">{item.activity}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>AI-Detected Patterns</CardTitle>
              <CardDescription>Machine learning insights from audience behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiTimingData.patterns.map((pattern, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <AIBrain className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{pattern}</div>
                      <div className="text-sm text-muted-foreground">AI Confidence: 94%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Post Timing Forecaster Tab */}
        <TabsContent value="forecaster" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Next Best Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  AI Post Timing Forecaster
                </CardTitle>
                <CardDescription>Predict the next best 3 times to post for maximum reach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timingForecasterData.nextBestTimes.map((time, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{time.time}</span>
                        </div>
                        <Badge className="bg-green-500 text-white">
                          {time.confidence}% confidence
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Platform: </span>
                          <span className="font-medium">{time.platform}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Reason: </span>
                          <span>{time.reason}</span>
                        </div>
                        <Button size="sm" onClick={() => handlePostNow(time.time)}>
                          Schedule Post
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Historical Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Historical Performance</CardTitle>
                <CardDescription>Training data for AI predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timingForecasterData.historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="reach" fill="#3B82F6" name="Reach" />
                    <Bar dataKey="engagement" fill="#10B981" name="Engagement" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Platform Sync Layer Tab */}
        <TabsContent value="platform-sync" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Platform Sync Layer
              </CardTitle>
              <CardDescription>Compare performance side-by-side across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Platform Comparisons */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Platform Performance Comparison</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {platformSyncData.comparisons.map((comp, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {comp.platform === "Instagram" && <Instagram className="h-4 w-4 text-pink-500" />}
                            {comp.platform === "TikTok" && <MessageSquare className="h-4 w-4 text-black" />}
                            {comp.platform === "Facebook" && <Facebook className="h-4 w-4 text-blue-600" />}
                            <span className="font-medium">{comp.platform}</span>
                          </div>
                          <Badge className="bg-green-500 text-white">
                            {comp.performance}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Time: </span>
                            <span className="font-medium">{comp.time}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Metric: </span>
                            <span className="font-medium">{comp.metric}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">vs: </span>
                            <span>{comp.vs}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Cross-Platform Insights */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Cross-Platform AI Insights</h3>
                  <div className="space-y-3">
                    {platformSyncData.crossPlatformInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <AIBrain className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium">{insight}</div>
                          <div className="text-sm text-muted-foreground">AI Confidence: 89%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Drop Readiness Score Tab */}
        <TabsContent value="drop-readiness" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bullseye className="h-5 w-5" />
                  Drop Readiness Score
                </CardTitle>
                <CardDescription>AI score showing how &quot;ready&quot; your audience is for a drop</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="text-4xl font-bold text-blue-600">{dropReadinessData.currentScore}</div>
                    <div className="text-sm text-muted-foreground">out of 100</div>
                    <Progress value={dropReadinessData.currentScore} className="mt-4" />
                  </div>

                  <div className="text-sm">
                    {dropReadinessData.currentScore >= 80 && (
                      <div className="text-green-600 font-medium">🎯 Perfect timing for a drop!</div>
                    )}
                    {dropReadinessData.currentScore >= 60 && dropReadinessData.currentScore < 80 && (
                      <div className="text-yellow-600 font-medium">⚠️ Good timing, but could be optimized</div>
                    )}
                    {dropReadinessData.currentScore < 60 && (
                      <div className="text-red-600 font-medium">❌ Not ideal timing for a drop</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Score Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Score Factors</CardTitle>
                <CardDescription>What&apos;s contributing to your readiness score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dropReadinessData.factors.map((factor, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{factor.factor}</span>
                        <span className="font-medium">{factor.score}/100</span>
                      </div>
                      <Progress value={factor.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Actions to improve your drop readiness score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dropReadinessData.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <AIBrain className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{rec}</div>
                      <div className="text-sm text-muted-foreground">Expected score increase: +8-12 points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitor Timing Scanner Tab */}
        <TabsContent value="competitor-scan" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Blind Spot Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Blind Spot Map
                </CardTitle>
                <CardDescription>Windows when competitors are inactive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitorTimingData.blindSpots.map((spot, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{spot.day}</span>
                        </div>
                        <Badge className="bg-green-500 text-white">Opportunity</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Time: </span>
                          <span className="font-medium">{spot.time}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reason: </span>
                          <span>{spot.reason}</span>
                        </div>
                        <div className="bg-blue-50 p-2 rounded">
                          <span className="text-blue-700 font-medium">💡 {spot.opportunity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Competitor Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Competitor Activity Patterns</CardTitle>
                <CardDescription>When your competitors typically post</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitorTimingData.competitorActivity.map((comp, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-medium">{comp.competitor}</div>
                        <Badge variant="outline">{comp.frequency}</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Typical Time: </span>
                          <span className="font-medium">{comp.typicalTime}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Platform: </span>
                          <span>{comp.platform}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Personalized AI Suggestions Tab */}
        <TabsContent value="ai-suggestions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Drop Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recommended Drop Times
                </CardTitle>
                <CardDescription>AI-suggested optimal times for product drops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personalizedAISuggestions.dropTimes.map((time, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{time.time}</div>
                        <Badge className="bg-green-500 text-white">
                          {time.confidence}%
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{time.reason}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Post Frequency */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Post Frequency
                </CardTitle>
                <CardDescription>Optimal posting schedule for your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {personalizedAISuggestions.postFrequency.recommended}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {personalizedAISuggestions.postFrequency.reason}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <div className="font-medium mb-2">Optimal Mix:</div>
                    <div className="text-sm text-muted-foreground">
                      {personalizedAISuggestions.postFrequency.optimal}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  CTA Effectiveness
                </CardTitle>
                <CardDescription>Which call-to-action types work best</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personalizedAISuggestions.ctaTypes.map((cta, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{cta.type}</div>
                        <Badge className="bg-blue-500 text-white">
                          {cta.effectiveness}%
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{cta.reason}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* VIP Customers Tab - VIP AI Logic Start */}
        <TabsContent value="vip-customers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* VIP Metrics Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  VIP Metrics
                </CardTitle>
                <CardDescription>Real-time VIP customer insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{vipCustomerData.vipMetrics.totalVIPs}</div>
                      <div className="text-sm text-muted-foreground">Total VIPs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{vipCustomerData.vipMetrics.activeVIPs}</div>
                      <div className="text-sm text-muted-foreground">Active VIPs</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-red-600">{vipCustomerData.vipMetrics.atRiskVIPs}</div>
                      <div className="text-sm text-muted-foreground">At Risk</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600">{vipCustomerData.vipMetrics.newVIPs}</div>
                      <div className="text-sm text-muted-foreground">New VIPs</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Avg Spend</span>
                      <span className="font-medium">${vipCustomerData.vipMetrics.averageSpend.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Retention Rate</span>
                      <span className="font-medium">{vipCustomerData.vipMetrics.retentionRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Engagement Rate</span>
                      <span className="font-medium">{vipCustomerData.vipMetrics.engagementRate}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* VIP Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-red-500" />
                  VIP Alerts
                </CardTitle>
                <CardDescription>AI-powered VIP notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vipCustomerData.vipAlerts.map((alert) => (
                    <div key={alert.id} className={`p-3 border rounded-lg ${alert.priority === "high" ? "border-red-200 bg-red-50" :
                      "border-yellow-200 bg-yellow-50"
                      }`}>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{alert.customer}</div>
                          <div className="text-xs text-muted-foreground">{alert.message}</div>
                          <div className="text-xs text-blue-600 mt-1">{alert.suggestedAction}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* VIP Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  VIP Campaigns
                </CardTitle>
                <CardDescription>Automated VIP outreach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vipCustomerData.vipCampaigns.map((campaign) => (
                    <div key={campaign.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm">{campaign.target}</div>
                        <Badge variant={campaign.status === "scheduled" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">{campaign.strategy}</div>
                      <div className="text-xs">
                        <div className="font-medium">Products:</div>
                        <div className="text-muted-foreground">{campaign.products.join(", ")}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* VIP Customer List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                VIP Customer Database
              </CardTitle>
              <CardDescription>Detailed VIP customer profiles with AI insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vipCustomerData.vipCustomers.map((vip) => (
                  <div key={vip.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {vip.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium">{vip.name}</div>
                          <div className="text-sm text-muted-foreground">{vip.tier}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">${vip.totalSpent.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{vip.orderCount} orders</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Purchase Probability</div>
                        <div className="text-lg font-bold text-green-600">{vip.purchaseProbability}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Engagement Score</div>
                        <div className="text-lg font-bold text-blue-600">{vip.engagementScore}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Influence Index</div>
                        <div className="text-lg font-bold text-purple-600">{vip.influenceIndex}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Days Since Order</div>
                        <div className={`text-lg font-bold ${vip.daysSinceLastOrder > 30 ? "text-red-600" : "text-green-600"}`}>
                          {vip.daysSinceLastOrder}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Recent Activity</div>
                        <div className="space-y-1">
                          {vip.recentActivity.slice(0, 3).map((activity, index) => (
                            <div key={index} className="text-xs text-muted-foreground">
                              {activity.type.replace("_", " ")}: {activity.item || (activity as any).content || 'N/A'}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">Emotional Triggers</div>
                        <div className="flex flex-wrap gap-1">
                          {vip.emotionalTriggers.map((trigger, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleVipEmail(vip.name)}>
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleVipWhatsApp(vip.name)}>
                        <MessageCircle className="h-3 w-3 mr-1" />
                        WhatsApp
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleVipDM(vip.name)}>
                        <Instagram className="h-3 w-3 mr-1" />
                        DM
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleVipAccess(vip.name)}>
                        <Star className="h-3 w-3 mr-1" />
                        VIP Access
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Demographics Tab - Original Content */}
        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Demographics</CardTitle>
              <CardDescription>Detailed audience demographics and contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium">Age Groups</h4>
                  <ul className="list-disc list-inside">
                    {demographics.ageGroups.map((group) => (
                      <li key={group.label}>{group.label}: {group.value}%</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Locations</h4>
                  <ul className="list-disc list-inside">
                    {demographics.locations.map((loc) => (
                      <li key={loc.label}>{loc.label}: {loc.value}%</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Contact Info</h4>
                  <p>Phone Numbers:</p>
                  <ul className="list-disc list-inside">
                    {demographics.phoneNumbers.map((phone, idx) => (
                      <li key={idx}>{phone}</li>
                    ))}
                  </ul>
                  <p>Emails:</p>
                  <ul className="list-disc list-inside">
                    {demographics.emails.map((email, idx) => (
                      <li key={idx}>{email}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Abandoned Checkouts Tab */}
        <TabsContent value="abandoned-checkouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Abandoned Checkout Recovery
              </CardTitle>
              <CardDescription>
                AI-powered recovery system for abandoned Shopify carts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Recover Lost Revenue</h3>
                    <p className="text-gray-300 text-sm">
                      Automatically detect and recover abandoned carts with AI-powered follow-up strategies
                    </p>
                  </div>
                  <Button
                    onClick={() => window.location.href = '/dashboard/audience-tracker/abandoned-checkouts'}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Open Recovery Dashboard
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-300">Abandoned Carts</p>
                          <p className="text-2xl font-bold text-white">1,247</p>
                        </div>
                        <ShoppingCart className="h-8 w-8 text-red-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-300">Recovered</p>
                          <p className="text-2xl font-bold text-white">229</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-300">Revenue Recovered</p>
                          <p className="text-2xl font-bold text-white">$12,450</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border-purple-500/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">🚀 Key Features</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Real-time abandoned cart detection via Shopify webhooks</li>
                    <li>• AI-powered abandonment reason analysis</li>
                    <li>• Automated follow-up via WhatsApp, Email, and SMS</li>
                    <li>• Smart offer generation based on cart value and customer behavior</li>
                    <li>• Complete recovery analytics and ROI tracking</li>
                    <li>• Multi-channel follow-up flow builder</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
