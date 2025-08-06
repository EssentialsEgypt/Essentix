"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MessageSquare, 
  Mail, 
  Brain, 
  Zap, 
  Clock, 
  DollarSign,
  ShoppingCart,
  X,
  Send,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface AbandonedCart {
  id: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  cartTotal: number
  currency: string
  abandonedAt: string
  cartSource: 'web' | 'mobile' | 'app'
  items: CartItem[]
  abandonmentReason?: string
  urgency: 'high' | 'medium' | 'low'
  lastContacted?: string
  contactAttempts: number
  recovered: boolean
}

interface FollowUpModalProps {
  cart: AbandonedCart
  onClose: () => void
  onSend: (message: string, channel: 'email' | 'whatsapp') => Promise<void>
  loading: boolean
}

interface AISuggestion {
  strategy: string
  message: string
  confidence: number
  reasoning: string
  timing: string
  offer?: string
}

export function FollowUpModal({ cart, onClose, onSend, loading }: FollowUpModalProps) {
  const [activeTab, setActiveTab] = useState("ai-suggest")
  const [selectedChannel, setSelectedChannel] = useState<'email' | 'whatsapp'>('whatsapp')
  const [customMessage, setCustomMessage] = useState("")
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([])
  const [aiLoading, setAiLoading] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState<AISuggestion | null>(null)

  // Mock AI suggestions
  const mockSuggestions: AISuggestion[] = [
    {
      strategy: "Urgent Reminder",
                      message: `Hi ${cart.customerName}! 👋 I noticed you left some amazing items in your cart. Don&apos;t miss out on ${cart.items[0]?.name} - it&apos;s still waiting for you! Complete your purchase now and get 10% off with code SAVE10. 🛒`,
      confidence: 0.92,
      reasoning: "High-value cart with recent activity, urgent reminder with discount",
      timing: "Send immediately",
      offer: "10% off"
    },
    {
      strategy: "Personal Touch",
      message: `Hey ${cart.customerName}! 💫 I saw you were interested in ${cart.items.map(item => item.name).join(', ')}. These items are perfect for you! Need help with anything? I'm here to assist. 😊`,
      confidence: 0.87,
      reasoning: "Personal approach with assistance offer, no pressure",
      timing: "Send in 2 hours",
      offer: "Free shipping"
    },
    {
      strategy: "Exclusive Offer",
      message: `🎉 ${cart.customerName}, exclusive offer just for you! Complete your cart now and get 15% off + free shipping. This offer expires in 24 hours! ⏰`,
      confidence: 0.78,
      reasoning: "Limited time offer creates urgency",
      timing: "Send in 1 hour",
      offer: "15% off + free shipping"
    }
  ]

  useEffect(() => {
    setAiSuggestions(mockSuggestions)
    setSelectedSuggestion(mockSuggestions[0])
  }, [cart])

  const handleAISuggest = async () => {
    setAiLoading(true)
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setAiLoading(false)
  }

  const handleSendMessage = async () => {
    const message = selectedSuggestion?.message || customMessage
    if (!message.trim()) return

    await onSend(message, selectedChannel)
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <ShoppingCart className="h-5 w-5" />
            Follow-up for {cart.customerName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cart Summary */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Cart Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Customer</div>
                  <div className="text-white font-medium">{cart.customerName}</div>
                  <div className="text-sm text-gray-400">{cart.customerEmail}</div>
                  {cart.customerPhone && (
                    <div className="text-sm text-gray-400">{cart.customerPhone}</div>
                  )}
                </div>
                <div>
                  <div className="text-sm text-gray-400">Cart Value</div>
                  <div className="text-white font-semibold text-lg">
                    {cart.currency} {cart.cartTotal.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">{cart.items.length} items</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Status</div>
                  <Badge className={getUrgencyColor(cart.urgency)}>
                    {cart.urgency} urgency
                  </Badge>
                  <div className="text-sm text-gray-400 mt-1">
                    Abandoned {new Date(cart.abandonedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-sm text-gray-400 mb-2">Items in Cart:</div>
                <div className="space-y-2">
                  {cart.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700/50 rounded p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center text-xs">
                          {item.image ? '🖼️' : '📦'}
                        </div>
                        <div>
                          <div className="text-white text-sm">{item.name}</div>
                          <div className="text-gray-400 text-xs">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="text-white font-medium">
                        {cart.currency} {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Follow-up Options */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
              <TabsTrigger value="ai-suggest" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600">
                <Brain className="h-4 w-4 mr-2" />
                AI Suggestions
              </TabsTrigger>
              <TabsTrigger value="custom" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600">
                <MessageSquare className="h-4 w-4 mr-2" />
                Custom Message
              </TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600">
                <Zap className="h-4 w-4 mr-2" />
                Templates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ai-suggest" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">AI-Powered Suggestions</h3>
                <Button 
                  onClick={handleAISuggest} 
                  disabled={aiLoading}
                  variant="outline"
                  size="sm"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${aiLoading ? 'animate-spin' : ''}`} />
                  Regenerate
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {aiSuggestions.map((suggestion, index) => (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all ${
                      selectedSuggestion === suggestion 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedSuggestion(suggestion)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-white font-medium">{suggestion.strategy}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {Math.round(suggestion.confidence * 100)}% confidence
                            </Badge>
                            {suggestion.offer && (
                              <Badge variant="premium" className="text-xs bg-green-500/20 text-green-400">
                                {suggestion.offer}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {suggestion.timing}
                        </div>
                      </div>
                      
                      <div className="bg-gray-700/50 rounded p-3 mb-3">
                        <p className="text-white text-sm">{suggestion.message}</p>
                      </div>
                      
                      <div className="text-xs text-gray-400">
                        <strong>AI Reasoning:</strong> {suggestion.reasoning}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Custom Message</label>
                <Textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Write your custom follow-up message..."
                  className="bg-gray-800/50 border-gray-600 text-white min-h-[120px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    name: "Simple Reminder",
                    message: `Hi ${cart.customerName}! You left some items in your cart. Complete your purchase now! 🛒`
                  },
                  {
                    name: "Discount Offer",
                    message: `Hey ${cart.customerName}! Get 10% off your cart with code SAVE10. Limited time offer! ⏰`
                  },
                  {
                    name: "Free Shipping",
                    message: `Hi ${cart.customerName}! Free shipping on your cart when you complete your purchase today! 🚚`
                  }
                ].map((template, index) => (
                  <Card key={index} className="border-gray-700 bg-gray-800/50 cursor-pointer hover:border-gray-600">
                    <CardContent className="p-4">
                      <h4 className="text-white font-medium mb-2">{template.name}</h4>
                      <p className="text-gray-300 text-sm">{template.message}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 border-purple-500 text-purple-400 hover:bg-purple-500/10"
                        onClick={() => setCustomMessage(template.message)}
                      >
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Channel Selection and Send */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Send via:</label>
                    <div className="flex gap-2">
                      <Button
                        variant={selectedChannel === 'whatsapp' ? 'premium' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedChannel('whatsapp')}
                        className={selectedChannel === 'whatsapp' ? '' : 'border-green-500 text-green-400 hover:bg-green-500/10'}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button
                        variant={selectedChannel === 'email' ? 'premium' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedChannel('email')}
                        className={selectedChannel === 'email' ? '' : 'border-blue-500 text-blue-400 hover:bg-blue-500/10'}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={loading || (!selectedSuggestion?.message && !customMessage.trim())}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
} 