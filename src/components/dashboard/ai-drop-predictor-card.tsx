"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Calendar,
    Clock,
    TrendingUp,
    Target,
    AlertTriangle,
    CheckCircle,
    Star,
    BarChart3,
    Users,
    DollarSign,
    MessageSquare,
    Heart,
    Eye,
    Zap,
    Brain,
    History,
    Plus,
    Play,
    Pause,
    RefreshCw,
    ArrowRight
} from "lucide-react"

interface DropPrediction {
    id: string
    suggestedWindow: {
        start: string
        end: string
        date: string
    }
    confidence: number
    reasoning: string[]
    alternativeSlots: Array<{
        date: string
        start: string
        end: string
        confidence: number
    }>
    audienceOverlap: number
    competitorActivity: string[]
    marketConditions: string
}

export function AIDropPredictorCard() {
    const [prediction, setPrediction] = useState<DropPrediction | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadLatestPrediction()
    }, [])

    const loadLatestPrediction = async () => {
        try {
            const response = await fetch('/api/ai-drop-predictor/predictions')
            const data = await response.json()
            if (data.success && data.data.length > 0) {
                setPrediction(data.data[0])
            }
        } catch (error) {
            console.error('Error loading prediction:', error)
        }
    }

    const generateNewPrediction = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/ai-drop-predictor/generate', {
                method: 'POST'
            })
            const data = await response.json()
            if (data.success) {
                await loadLatestPrediction()
            }
        } catch (error) {
            console.error('Error generating prediction:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 80) return 'text-green-400'
        if (confidence >= 60) return 'text-yellow-400'
        return 'text-red-400'
    }

    if (!prediction) {
        return (
            <Card className="hover:scale-105 transition-all duration-200">
                <CardHeader>
                    <CardTitle className="text-white flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-pink-400" />
                        AI Drop Predictor
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-4">No predictions available</p>
                    <Button
                        onClick={generateNewPrediction}
                        disabled={isLoading}
                        variant="premium"
                    >
                        <Zap className="w-4 h-4 mr-2" />
                        Generate Prediction
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="hover:scale-105 transition-all duration-200">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-pink-400" />
                        Next Drop Window
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                        <Badge variant="premium" className={`${getConfidenceColor(prediction.confidence)}`}>
                            {prediction.confidence}% Confidence
                        </Badge>
                        <Button
                            size="sm"
                            onClick={generateNewPrediction}
                            disabled={isLoading}
                            variant="premium"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Main Prediction */}
                <div className="bg-gradient-to-r from-pink-500/10 to-purple-600/10 backdrop-blur-sm rounded-lg p-4 border border-pink-500/20">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <div className="text-2xl font-bold text-white">
                                {prediction.suggestedWindow.date}
                            </div>
                            <div className="text-gray-300">
                                {prediction.suggestedWindow.start} - {prediction.suggestedWindow.end}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-400">Audience Overlap</div>
                            <div className="text-xl font-bold text-white">{prediction.audienceOverlap}%</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Confidence</span>
                            <span className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                                {prediction.confidence}%
                            </span>
                        </div>
                        <Progress value={prediction.confidence} className="h-2" />
                    </div>
                </div>

                {/* Key Reasoning */}
                <div className="space-y-2">
                    <h4 className="text-white font-semibold text-sm">AI Reasoning</h4>
                    <div className="space-y-1">
                        {prediction.reasoning.slice(0, 3).map((reason, index) => (
                            <div key={index} className="flex items-start">
                                <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-xs">{reason}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Market Conditions */}
                <div className="bg-slate-700/20 rounded p-3">
                    <div className="flex items-center mb-1">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-white font-medium text-sm">Market Conditions</span>
                    </div>
                    <p className="text-gray-300 text-xs">{prediction.marketConditions}</p>
                </div>

                {/* Alternative Slots */}
                {prediction.alternativeSlots.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-white font-semibold text-sm">Backup Slots</h4>
                        <div className="space-y-2">
                            {prediction.alternativeSlots.slice(0, 2).map((slot, index) => (
                                <div key={index} className="bg-slate-700/20 rounded p-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-white text-sm font-medium">{slot.date}</div>
                                            <div className="text-gray-400 text-xs">{slot.start} - {slot.end}</div>
                                        </div>
                                        <span className={`text-xs ${getConfidenceColor(slot.confidence)}`}>
                                            {slot.confidence}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Competitor Activity */}
                {prediction.competitorActivity.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-white font-semibold text-sm flex items-center">
                            <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                            Competitor Activity
                        </h4>
                        <div className="space-y-1">
                            {prediction.competitorActivity.slice(0, 2).map((activity, index) => (
                                <div key={index} className="text-gray-300 text-xs">
                                    • {activity}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => window.location.href = '/dashboard?tab=aidroppredictor'}
                >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    View Full Analysis
                </Button>
            </CardContent>
        </Card>
    )
} 