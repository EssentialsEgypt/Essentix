// AI Analytics Service - Comprehensive analytics and insights
export interface AnalyticsData {
    id: string
    metric: string
    value: number
    change: number
    trend: 'up' | 'down' | 'stable'
    timestamp: Date
    category: string
    aiInsight?: string
}

export interface AIInsight {
    id: string
    type: 'alert' | 'recommendation' | 'prediction'
    title: string
    description: string
    priority: 'critical' | 'high' | 'medium' | 'low'
    confidence: number
    category: string
    action?: string
    timestamp: Date
}

export interface PerformanceMetric {
    id: string
    name: string
    currentValue: number
    targetValue: number
    unit: string
    status: 'on-track' | 'behind' | 'ahead'
    trend: 'improving' | 'declining' | 'stable'
    aiRecommendation?: string
}

export interface UserBehavior {
    id: string
    sessionId: string
    userId?: string
    pageViews: number
    timeOnSite: number
    bounceRate: number
    conversionRate: number
    revenue: number
    actions: string[]
    aiLabel: string
    timestamp: Date
}

class AIAnalyticsService {
    private baseUrl = '/api/ai-analytics'

    // Get comprehensive analytics data
    async getAnalyticsData(timeframe: string = '7d'): Promise<AnalyticsData[]> {
        try {
            const response = await fetch(`${this.baseUrl}/data?timeframe=${timeframe}`)
            if (!response.ok) throw new Error('Failed to fetch analytics data')
            return await response.json()
        } catch (error) {
            console.error('Error fetching analytics data:', error)
            // Return mock data for demonstration
            return this.getMockAnalyticsData()
        }
    }

    // Get AI-generated insights
    async getAIInsights(): Promise<AIInsight[]> {
        try {
            const response = await fetch(`${this.baseUrl}/insights`)
            if (!response.ok) throw new Error('Failed to fetch AI insights')
            return await response.json()
        } catch (error) {
            console.error('Error fetching AI insights:', error)
            return this.getMockAIInsights()
        }
    }

    // Get performance metrics
    async getPerformanceMetrics(): Promise<PerformanceMetric[]> {
        try {
            const response = await fetch(`${this.baseUrl}/performance`)
            if (!response.ok) throw new Error('Failed to fetch performance metrics')
            return await response.json()
        } catch (error) {
            console.error('Error fetching performance metrics:', error)
            return this.getMockPerformanceMetrics()
        }
    }

    // Get user behavior analysis
    async getUserBehavior(timeframe: string = '24h'): Promise<UserBehavior[]> {
        try {
            const response = await fetch(`${this.baseUrl}/behavior?timeframe=${timeframe}`)
            if (!response.ok) throw new Error('Failed to fetch user behavior')
            return await response.json()
        } catch (error) {
            console.error('Error fetching user behavior:', error)
            return this.getMockUserBehavior()
        }
    }

    // Generate AI insights from data
    async generateInsights(data: any): Promise<AIInsight[]> {
        try {
            const response = await fetch(`${this.baseUrl}/generate-insights`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (!response.ok) throw new Error('Failed to generate insights')
            return await response.json()
        } catch (error) {
            console.error('Error generating insights:', error)
            return []
        }
    }

    // Mock data for demonstration
    private getMockAnalyticsData(): AnalyticsData[] {
        return [
            {
                id: '1',
                metric: 'Revenue',
                value: 12450,
                change: 15.2,
                trend: 'up',
                timestamp: new Date(),
                category: 'sales',
                aiInsight: 'Strong growth trend, consider increasing ad spend'
            },
            {
                id: '2',
                metric: 'Engagement Rate',
                value: 8.2,
                change: -2.1,
                trend: 'down',
                timestamp: new Date(),
                category: 'social',
                aiInsight: 'Slight decline, monitor content quality'
            },
            {
                id: '3',
                metric: 'Conversion Rate',
                value: 3.2,
                change: 0.8,
                trend: 'up',
                timestamp: new Date(),
                category: 'sales',
                aiInsight: 'Improving conversion rate, optimize checkout flow'
            }
        ]
    }

    private getMockAIInsights(): AIInsight[] {
        return [
            {
                id: '1',
                type: 'alert',
                title: 'Revenue Spike Detected',
                description: 'Unusual 23% revenue increase in last 2 hours',
                priority: 'high',
                confidence: 0.95,
                category: 'sales',
                action: 'Investigate traffic sources',
                timestamp: new Date()
            },
            {
                id: '2',
                type: 'recommendation',
                title: 'Optimize Ad Timing',
                description: 'Move Instagram ads to 7-9 PM for 15% better CTR',
                priority: 'medium',
                confidence: 0.88,
                category: 'ads',
                action: 'Update ad schedule',
                timestamp: new Date()
            }
        ]
    }

    private getMockPerformanceMetrics(): PerformanceMetric[] {
        return [
            {
                id: '1',
                name: 'Revenue Growth',
                currentValue: 15.2,
                targetValue: 20,
                unit: '%',
                status: 'behind',
                trend: 'improving',
                aiRecommendation: 'Focus on high-value products'
            },
            {
                id: '2',
                name: 'Customer Acquisition',
                currentValue: 156,
                targetValue: 150,
                unit: 'customers',
                status: 'ahead',
                trend: 'improving',
                aiRecommendation: 'Maintain current strategy'
            }
        ]
    }

    private getMockUserBehavior(): UserBehavior[] {
        return [
            {
                id: '1',
                sessionId: 'session-001',
                userId: 'user-001',
                pageViews: 5,
                timeOnSite: 180,
                bounceRate: 20,
                conversionRate: 3.2,
                revenue: 299,
                actions: ['view_product', 'add_to_cart', 'purchase'],
                aiLabel: 'high_intent',
                timestamp: new Date()
            }
        ]
    }
}

export const aiAnalyticsService = new AIAnalyticsService() 