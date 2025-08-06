"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Brain,
    Zap,
    DollarSign,
    Clock,
    CheckCircle,
    RefreshCw,
    Send,
    Edit,
    Copy,
    TrendingUp,
    AlertTriangle,
    Gift,
    Truck,
    Percent
} from "lucide-react"

interface AIOffer {
    id: string
    type: 'discount' | 'free_shipping' | 'bundle' | 'urgency' | 'personalized'
    title: string
    description: string
    value: string
    confidence: number
    reasoning: string
    predictedConversion: number
    predictedRevenue: number
    conditions?: string[]
    message: string
}

export function SmartOfferGenerator() {
    const [selectedOffer, setSelectedOffer] = useState<AIOffer | null>(null)
    const [customValue, setCustomValue] = useState("")
    const [customMessage, setCustomMessage] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [isSending, setIsSending] = useState(false)

    // Mock AI-generated offers
    const mockOffers: AIOffer[] = [
        {
            id: "1",
            type: "discount",
            title: "10% Off Everything",
            description: "Standard discount that works well for most carts",
            value: "10%",
            confidence: 0.92,
            reasoning: "High-value cart with multiple items, customer has purchase history",
            predictedConversion: 78.5,
            predictedRevenue: 189,
            conditions: ["Valid for 24 hours", "Minimum $50 purchase"],
            message: "🎉 Get 10% off your entire cart! Use code SAVE10 at checkout. Valid for 24 hours only! ⏰"
        },
        {
            id: "2",
            type: "free_shipping",
            title: "Free Express Shipping",
            description: "Eliminate shipping cost barrier",
            value: "Free Shipping",
            confidence: 0.87,
            reasoning: "Cart value is high enough to absorb shipping cost, customer is price-sensitive",
            predictedConversion: 82.3,
            predictedRevenue: 234,
            conditions: ["Orders over $75", "Express shipping only"],
            message: "🚚 Free express shipping on your order! Get your items delivered in 2-3 business days at no extra cost! 📦"
        },
        {
            id: "3",
            type: "urgency",
            title: "Limited Time 15% Off",
            description: "Create urgency with time-limited offer",
            value: "15%",
            confidence: 0.79,
            reasoning: "Customer has been browsing for 2+ hours, needs urgency trigger",
            predictedConversion: 89.4,
            predictedRevenue: 167,
            conditions: ["Valid for 2 hours only", "One-time use"],
                            message: "⏰ FLASH SALE: 15% off your cart for the next 2 hours only! Don&apos;t miss out - this offer expires soon! 🔥"
        },
        {
            id: "4",
            type: "bundle",
            title: "Buy 2 Get 1 Free",
            description: "Encourage larger purchase with bundle offer",
            value: "Buy 2 Get 1",
            confidence: 0.85,
            reasoning: "Customer has 3+ similar items, perfect for bundle promotion",
            predictedConversion: 71.2,
            predictedRevenue: 298,
            conditions: ["Must buy 2 items", "Lowest value item free"],
            message: "🎁 Special bundle offer: Buy 2 items, get the 3rd one FREE! Perfect for stocking up! 📦"
        },
        {
            id: "5",
            type: "personalized",
            title: "VIP Customer Discount",
            description: "Personalized offer for returning customers",
            value: "20%",
            confidence: 0.94,
            reasoning: "Customer is VIP with high lifetime value, personalized approach",
            predictedConversion: 91.2,
            predictedRevenue: 345,
            conditions: ["VIP customers only", "One-time use per customer"],
            message: "👑 VIP Exclusive: 20% off your entire order! As a valued customer, we want to make this special for you! ✨"
        }
    ]

    const handleGenerateOffers = async () => {
        setIsGenerating(true)
        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 3000))
        setIsGenerating(false)
    }

    const handleSendOffer = async () => {
        if (!selectedOffer) return

        setIsSending(true)
        // Simulate sending offer
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsSending(false)
    }

    const getOfferIcon = (type: string) => {
        switch (type) {
            case 'discount': return <Percent className="h-5 w-5" />
            case 'free_shipping': return <Truck className="h-5 w-5" />
            case 'bundle': return <Gift className="h-5 w-5" />
            case 'urgency': return <Clock className="h-5 w-5" />
            case 'personalized': return <TrendingUp className="h-5 w-5" />
            default: return <Zap className="h-5 w-5" />
        }
    }

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.9) return 'bg-green-500/20 text-green-400 border-green-500/30'
        if (confidence >= 0.8) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        return 'bg-red-500/20 text-red-400 border-red-500/30'
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Smart Offer Generator</h2>
                    <p className="text-gray-300 mt-1">
                        AI-powered offer suggestions based on cart value, customer behavior, and historical data
                    </p>
                </div>
                <Button
                    onClick={handleGenerateOffers}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                    <Brain className="h-4 w-4 mr-2" />
                    {isGenerating ? 'Generating...' : 'Generate Offers'}
                </Button>
            </div>

            {/* AI Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockOffers.map((offer) => (
                    <Card
                        key={offer.id}
                        className={`cursor-pointer transition-all ${selectedOffer?.id === offer.id
                                ? 'border-purple-500 bg-purple-500/10'
                                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                            }`}
                        onClick={() => setSelectedOffer(offer)}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    {getOfferIcon(offer.type)}
                                    <div>
                                        <h3 className="text-white font-medium">{offer.title}</h3>
                                        <p className="text-sm text-gray-400">{offer.description}</p>
                                    </div>
                                </div>
                                <Badge className={getConfidenceColor(offer.confidence)}>
                                    {Math.round(offer.confidence * 100)}%
                                </Badge>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-300">Offer Value:</span>
                                    <span className="text-white font-semibold">{offer.value}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-300">Predicted Conversion:</span>
                                    <span className="text-green-400 font-medium">{offer.predictedConversion}%</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-300">Predicted Revenue:</span>
                                    <span className="text-white font-medium">${offer.predictedRevenue}</span>
                                </div>

                                <div className="bg-gray-700/50 rounded p-3">
                                    <p className="text-sm text-gray-300 mb-2">
                                        <strong>AI Reasoning:</strong>
                                    </p>
                                    <p className="text-xs text-gray-400">{offer.reasoning}</p>
                                </div>

                                {offer.conditions && (
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Conditions:</p>
                                        <ul className="text-xs text-gray-400 space-y-1">
                                            {offer.conditions.map((condition, index) => (
                                                <li key={index}>• {condition}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Selected Offer Details */}
            {selectedOffer && (
                <Card className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border-purple-500/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <Brain className="h-5 w-5" />
                            Selected Offer: {selectedOffer.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Offer Message Preview */}
                        <div>
                            <label className="text-sm text-gray-300 mb-2 block">Generated Message:</label>
                            <div className="bg-gray-700/50 rounded p-3 border border-gray-600">
                                <p className="text-white text-sm">{selectedOffer.message}</p>
                            </div>
                        </div>

                        {/* Customization Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-300 mb-2 block">Custom Value:</label>
                                <Input
                                    value={customValue}
                                    onChange={(e) => setCustomValue(e.target.value)}
                                    placeholder="e.g., 15% or Free Shipping"
                                    className="bg-gray-800/50 border-gray-600 text-white"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-300 mb-2 block">Custom Message:</label>
                                <Textarea
                                    value={customMessage}
                                    onChange={(e) => setCustomMessage(e.target.value)}
                                    placeholder="Customize the message..."
                                    className="bg-gray-800/50 border-gray-600 text-white min-h-[80px]"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleSendOffer}
                                disabled={isSending}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                            >
                                <Send className="h-4 w-4 mr-2" />
                                {isSending ? 'Sending...' : 'Send Offer'}
                            </Button>

                            <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Offer
                            </Button>

                            <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                                <Brain className="h-4 w-4 mr-2" />
                                Ask AI Again
                            </Button>

                            <Button variant="outline" className="border-gray-500 text-gray-400 hover:bg-gray-500/10">
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Message
                            </Button>
                        </div>

                        {/* Performance Prediction */}
                        <div className="bg-gray-800/50 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-3">Performance Prediction</h4>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-400">{selectedOffer.predictedConversion}%</div>
                                    <div className="text-xs text-gray-400">Conversion Rate</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-400">${selectedOffer.predictedRevenue}</div>
                                    <div className="text-xs text-gray-400">Avg Revenue</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-400">{Math.round(selectedOffer.confidence * 100)}%</div>
                                    <div className="text-xs text-gray-400">AI Confidence</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* AI Insights */}
            <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <TrendingUp className="h-5 w-5" />
                        AI Insights & Best Practices
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-white font-medium mb-3">🎯 Offer Strategy Tips</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>• Free shipping works best for carts $50-150</li>
                                <li>• Percentage discounts perform better on high-value carts</li>
                                <li>• Urgency offers should be time-limited (2-4 hours)</li>
                                <li>• Personalized offers have 3x higher conversion</li>
                                <li>• Bundle offers increase average order value by 40%</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-3">📊 Performance Factors</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>• Cart abandonment time (1-2 hours optimal)</li>
                                <li>• Customer purchase history and LTV</li>
                                <li>• Product category and price sensitivity</li>
                                <li>• Previous interaction with recovery campaigns</li>
                                <li>• Device type and browsing behavior</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 