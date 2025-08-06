import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { timeframe = '7d' } = req.query

        // Mock analytics data to avoid service dependency issues
        const analyticsData = [
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
            },
            {
                id: '4',
                metric: 'Customer Acquisition',
                value: 156,
                change: 12.5,
                trend: 'up',
                timestamp: new Date(),
                category: 'marketing',
                aiInsight: 'Strong acquisition, focus on retention'
            },
            {
                id: '5',
                metric: 'Average Order Value',
                value: 89.5,
                change: 5.3,
                trend: 'up',
                timestamp: new Date(),
                category: 'sales',
                aiInsight: 'AOV increasing, consider upselling strategies'
            }
        ]

        res.status(200).json({
            success: true,
            data: analyticsData,
            timeframe,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('AI Analytics: Error fetching data:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch analytics data'
        })
    }
} 