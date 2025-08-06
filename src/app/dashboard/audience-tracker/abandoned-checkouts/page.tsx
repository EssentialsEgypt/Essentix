"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ShoppingCart, 
  MessageSquare, 
  Mail, 
  Brain, 
  BarChart3, 
  Zap,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Settings,
  Filter,
  Search
} from "lucide-react"
import { AbandonedCartTable } from "@/components/AbandonedCartTable"
import { FollowUpModal } from "@/components/FollowUpModal"
import { RecoveryAnalytics } from "@/components/RecoveryAnalytics"
import { SmartOfferGenerator } from "@/components/SmartOfferGenerator"
import { useCartFeed } from "@/hooks/useCartFeed"
import { useFollowUp } from "@/hooks/useFollowUp"

export default function AbandonedCheckoutsPage() {
  const [activeTab, setActiveTab] = React.useState("live-feed")
  const [showFollowUpModal, setShowFollowUpModal] = React.useState(false)
  const [selectedCart, setSelectedCart] = React.useState<any>(null)
  
  const { carts, loading, refreshCarts } = useCartFeed()
  const { sendFollowUp, followUpLoading } = useFollowUp()

  const handleFollowUp = (cart: any) => {
    setSelectedCart(cart)
    setShowFollowUpModal(true)
  }

  const handleSendFollowUp = async (message: string, channel: 'email' | 'whatsapp') => {
    if (!selectedCart) return
    
    try {
      await sendFollowUp(selectedCart.id, message, channel)
      setShowFollowUpModal(false)
      setSelectedCart(null)
    } catch (error) {
      console.error('Failed to send follow-up:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Abandoned Checkout Recovery</h1>
          <p className="text-gray-300 mt-2">
            Recover lost Shopify sales with AI-powered automation and smart follow-up strategies
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={refreshCarts} 
            disabled={loading}
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Badge variant="premium" className="bg-gradient-to-r from-green-500 to-emerald-600">
            <Zap className="h-3 w-3 mr-1" />
            Live Sync
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Total Abandoned</p>
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
                <p className="text-sm text-gray-300">Recovered Today</p>
                <p className="text-2xl font-bold text-white">23</p>
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

        <Card className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Recovery Rate</p>
                <p className="text-2xl font-bold text-white">18.4%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
          <TabsTrigger value="live-feed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Live Cart Feed
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="offers" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600">
            <Brain className="h-4 w-4 mr-2" />
            Smart Offers
          </TabsTrigger>
          <TabsTrigger value="flows" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600">
            <Zap className="h-4 w-4 mr-2" />
            Follow-up Flows
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live-feed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Live Abandoned Cart Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AbandonedCartTable 
                carts={carts}
                loading={loading}
                onFollowUp={handleFollowUp}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <RecoveryAnalytics />
        </TabsContent>

        <TabsContent value="offers" className="space-y-4">
          <SmartOfferGenerator />
        </TabsContent>

        <TabsContent value="flows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Follow-up Flow Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Follow-up flow builder coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recovery Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Follow-up Modal */}
      {showFollowUpModal && selectedCart && (
        <FollowUpModal
          cart={selectedCart}
          onClose={() => setShowFollowUpModal(false)}
          onSend={handleSendFollowUp}
          loading={followUpLoading}
        />
      )}
    </div>
  )
} 