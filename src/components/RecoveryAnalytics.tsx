"use client"

import React, { useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  CheckCircle,
  Clock,
  AlertTriangle,
  Brain,
  Zap,
  Calendar,
  PieChart,
  Activity
} from "lucide-react"
import styles from "./RecoveryAnalytics.module.css"

// Progress Bar Component
interface ProgressBarProps {
  percentage: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, className = "" }) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.setProperty('--data-width', percentage.toString());
    }
  }, [percentage]);

  return (
    <div
      ref={progressRef}
      className={`bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full ${styles['progress-bar']} ${className}`}
    />
  );
};

// Mock data for analytics
const mockAnalyticsData = {
  overview: {
    totalAbandoned: 1247,
    totalRecovered: 229,
    recoveryRate: 18.4,
    totalRevenueRecovered: 12450,
    avgRecoveryTime: 2.3,
    conversionRate: 12.8
  },
  dailyRecoveries: [
    { date: "2024-01-01", recovered: 12, revenue: 1250 },
    { date: "2024-01-02", recovered: 18, revenue: 1890 },
    { date: "2024-01-03", recovered: 15, revenue: 1620 },
    { date: "2024-01-04", recovered: 23, revenue: 2450 },
    { date: "2024-01-05", recovered: 19, revenue: 2010 },
    { date: "2024-01-06", recovered: 25, revenue: 2680 },
    { date: "2024-01-07", recovered: 21, revenue: 2250 }
  ],
  abandonmentReasons: [
    { reason: "High shipping cost", count: 45, percentage: 23.5 },
    { reason: "Mobile load issue", count: 32, percentage: 16.7 },
    { reason: "Size chart confusion", count: 28, percentage: 14.6 },
    { reason: "Payment method", count: 25, percentage: 13.1 },
    { reason: "Technical error", count: 22, percentage: 11.5 },
    { reason: "Price comparison", count: 18, percentage: 9.4 },
    { reason: "Other", count: 22, percentage: 11.5 }
  ],
  topOffers: [
    { offer: "10% off", successRate: 78.5, avgRevenue: 145 },
    { offer: "Free shipping", successRate: 82.3, avgRevenue: 189 },
    { offer: "15% off", successRate: 85.1, avgRevenue: 167 },
    { offer: "Bundle discount", successRate: 71.2, avgRevenue: 234 },
    { offer: "Limited time", successRate: 89.4, avgRevenue: 198 }
  ],
  channelPerformance: [
    { channel: "WhatsApp", sent: 156, opened: 142, replied: 89, recovered: 67, rate: 42.9 },
    { channel: "Email", sent: 203, opened: 178, clicked: 134, recovered: 98, rate: 48.3 },
    { channel: "SMS", sent: 89, delivered: 87, replied: 23, recovered: 18, rate: 20.2 }
  ]
}

export function RecoveryAnalytics() {
  const [timeframe, setTimeframe] = React.useState("7d")

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-green-400" />
    if (value < 0) return <TrendingDown className="h-4 w-4 text-red-400" />
    return <Activity className="h-4 w-4 text-gray-400" />
  }

  const getTrendColor = (value: number) => {
    if (value > 0) return "text-green-400"
    if (value < 0) return "text-red-400"
    return "text-gray-400"
  }

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Recovery Analytics</h2>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-40 bg-gray-800/50 border-gray-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Total Abandoned</p>
                <p className="text-2xl font-bold text-white">{mockAnalyticsData.overview.totalAbandoned.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(5.2)}
                  <span className={`text-xs ${getTrendColor(5.2)}`}>+5.2%</span>
                </div>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Recovered</p>
                <p className="text-2xl font-bold text-white">{mockAnalyticsData.overview.totalRecovered.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(12.8)}
                  <span className={`text-xs ${getTrendColor(12.8)}`}>+12.8%</span>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Recovery Rate</p>
                <p className="text-2xl font-bold text-white">{mockAnalyticsData.overview.recoveryRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(2.1)}
                  <span className={`text-xs ${getTrendColor(2.1)}`}>+2.1%</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Revenue Recovered</p>
                <p className="text-2xl font-bold text-white">${mockAnalyticsData.overview.totalRevenueRecovered.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(8.7)}
                  <span className={`text-xs ${getTrendColor(8.7)}`}>+8.7%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Abandonment Reasons */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <AlertTriangle className="h-5 w-5" />
              Top Abandonment Reasons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAnalyticsData.abandonmentReasons.map((reason, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">{reason.reason}</span>
                      <span className="text-sm text-gray-400">{reason.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <ProgressBar percentage={reason.percentage} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Offers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Brain className="h-5 w-5" />
              Top Performing Offers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalyticsData.topOffers.map((offer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{offer.offer}</div>
                    <div className="text-sm text-gray-400">
                      {offer.successRate}% success rate
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">
                      ${offer.avgRevenue}
                    </div>
                    <div className="text-sm text-gray-400">avg revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="h-5 w-5" />
            Channel Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 text-gray-300">Channel</th>
                  <th className="text-center py-3 text-gray-300">Sent</th>
                  <th className="text-center py-3 text-gray-300">Opened/Delivered</th>
                  <th className="text-center py-3 text-gray-300">Replied/Clicked</th>
                  <th className="text-center py-3 text-gray-300">Recovered</th>
                  <th className="text-center py-3 text-gray-300">Recovery Rate</th>
                </tr>
              </thead>
              <tbody>
                {mockAnalyticsData.channelPerformance.map((channel, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-3 text-white font-medium">{channel.channel}</td>
                    <td className="py-3 text-center text-gray-300">{channel.sent}</td>
                    <td className="py-3 text-center text-gray-300">
                      {channel.opened || channel.delivered}
                    </td>
                    <td className="py-3 text-center text-gray-300">
                      {channel.replied || channel.clicked}
                    </td>
                    <td className="py-3 text-center text-gray-300">{channel.recovered}</td>
                    <td className="py-3 text-center">
                      <Badge
                        variant="outline"
                        className={`${channel.rate > 40 ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          channel.rate > 20 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                            'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}
                      >
                        {channel.rate}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Brain className="h-5 w-5" />
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-white font-medium">🎯 Key Insights</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• WhatsApp has 2x higher recovery rate than email</li>
                <li>• Free shipping offers perform 15% better than discounts</li>
                <li>• High-value carts (&gt;$200) need urgent follow-up</li>
                <li>• Mobile users abandon 3x more than desktop users</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-medium">🚀 AI Recommendations</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Increase WhatsApp automation for high-value carts</li>
                <li>• Test free shipping on all carts &gt;$150</li>
                <li>• Optimize mobile checkout experience</li>
                <li>• Send follow-ups within 1 hour for best results</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 