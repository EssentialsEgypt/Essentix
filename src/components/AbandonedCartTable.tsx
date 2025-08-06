"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  MessageSquare, 
  Mail, 
  Brain, 
  Clock, 
  DollarSign, 
  ShoppingCart,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff
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

interface AbandonedCartTableProps {
  carts: AbandonedCart[]
  loading: boolean
  onFollowUp: (cart: AbandonedCart) => void
}

export function AbandonedCartTable({ carts, loading, onFollowUp }: AbandonedCartTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")

  const getTimeSinceAbandoned = (abandonedAt: string) => {
    const now = new Date()
    const abandoned = new Date(abandonedAt)
    const diffInHours = Math.floor((now.getTime() - abandoned.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'mobile': return '📱'
      case 'app': return '📲'
      default: return '💻'
    }
  }

  const filteredCarts = carts.filter(cart => {
    const matchesSearch = 
      cart.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'recovered' && cart.recovered) ||
      (statusFilter === 'pending' && !cart.recovered)
    
    const matchesUrgency = urgencyFilter === 'all' || cart.urgency === urgencyFilter
    const matchesSource = sourceFilter === 'all' || cart.cartSource === sourceFilter

    return matchesSearch && matchesStatus && matchesUrgency && matchesSource
  })

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-64 bg-gray-700 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-700 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, email, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-600"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-gray-800/50 border-gray-600">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="recovered">Recovered</SelectItem>
          </SelectContent>
        </Select>

        <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
          <SelectTrigger className="w-40 bg-gray-800/50 border-gray-600">
            <SelectValue placeholder="Urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Urgency</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-40 bg-gray-800/50 border-gray-600">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="app">App</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800/50">
              <TableHead className="text-gray-300">Customer</TableHead>
              <TableHead className="text-gray-300">Cart Items</TableHead>
              <TableHead className="text-gray-300">Total</TableHead>
              <TableHead className="text-gray-300">Abandoned</TableHead>
              <TableHead className="text-gray-300">Reason</TableHead>
              <TableHead className="text-gray-300">Urgency</TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCarts.map((cart) => (
              <TableRow key={cart.id} className="border-gray-700 hover:bg-gray-800/30">
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-white">{cart.customerName}</div>
                    <div className="text-sm text-gray-400">{cart.customerEmail}</div>
                    {cart.customerPhone && (
                      <div className="text-sm text-gray-400">{cart.customerPhone}</div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      {getSourceIcon(cart.cartSource)}
                      {cart.cartSource}
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="space-y-1">
                    {cart.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-xs">
                          {item.image ? '🖼️' : '📦'}
                        </div>
                        <div className="text-sm">
                          <div className="text-white">{item.name}</div>
                          <div className="text-gray-400">Qty: {item.quantity}</div>
                        </div>
                      </div>
                    ))}
                    {cart.items.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{cart.items.length - 2} more items
                      </div>
                    )}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="font-semibold text-white">
                    {cart.currency} {cart.cartTotal.toLocaleString()}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-300">
                      {getTimeSinceAbandoned(cart.abandonedAt)}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="max-w-32">
                    {cart.abandonmentReason ? (
                      <div className="text-sm text-gray-300">
                        {cart.abandonmentReason}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Brain className="h-3 w-3 text-purple-400" />
                        <span className="text-xs text-gray-400">AI analyzing...</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`${getUrgencyColor(cart.urgency)} text-xs`}
                  >
                    {cart.urgency}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onFollowUp(cart)}
                      className="border-green-500 text-green-400 hover:bg-green-500/10"
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      WhatsApp
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onFollowUp(cart)}
                      className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onFollowUp(cart)}
                      className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                    >
                      <Brain className="h-3 w-3 mr-1" />
                      AI Suggest
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty State */}
      {filteredCarts.length === 0 && !loading && (
        <Card className="bg-gray-800/30 border-gray-700">
          <CardContent className="p-8 text-center">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No abandoned carts found</h3>
            <p className="text-gray-400">
              {searchTerm || statusFilter !== 'all' || urgencyFilter !== 'all' || sourceFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'All carts have been recovered or no new abandonments yet'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 