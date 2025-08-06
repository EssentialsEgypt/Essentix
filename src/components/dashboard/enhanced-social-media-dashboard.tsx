"use client"

import { useState, useEffect } from "react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BarChart3, Menu, X, ChevronLeft, ChevronRight, Users, MessageSquare, Target, Globe, Lightbulb, DollarSign, TrendingUp, Calendar, Settings } from "lucide-react"
import { SocialMediaManager } from "./social-media-manager"
import { AIPoweredBusinessDashboard } from "./ai-powered-business-dashboard"
import { EnhancedAudienceTracker } from "./enhanced-audience-tracker"
import { EnhancedAdPerformance } from "./enhanced-ad-performance"
import { AutoRepliesEngine } from "./auto-replies-engine"
import { EnhancedAutoMessages } from "./enhanced-auto-messages"
import { BrandAssetsHub } from "./brand-assets-hub"
import { EnhancedCashLog } from "./enhanced-cash-log"
import { AIAudienceTimingInsights } from "./ai-audience-timing-insights"
import { AIPoweredAdIdeaGenerator } from "./ai-powered-ad-idea-generator"
import RageIntel from "./rageintel"
import { WebsiteAnalytics } from "./website-analytics"
import { AIROIForecastEngine } from "./ai-roi-forecast-engine"
import { AIStrategyComposer } from "./ai-strategy-composer"
import { TeamManager } from "./team-manager"

const sidebarItems = [
  { id: "dashboard", label: "AI Business Dashboard", icon: BarChart3 },
  { id: "social", label: "Social Media Manager", icon: BarChart3 },
  { id: "audience", label: "Audience Tracker", icon: TrendingUp },
  { id: "ads", label: "Ad Performance", icon: Target },
  { id: "auto", label: "Auto Replies", icon: MessageSquare },
  { id: "messages", label: "Auto Messages", icon: MessageSquare },
  { id: "branding", label: "Brand Assets", icon: Globe },
  { id: "cash", label: "Cash Log", icon: DollarSign },
  { id: "timing", label: "AI Timing", icon: Calendar },
  { id: "generator", label: "Ad Generator", icon: Lightbulb },
  { id: "competitors", label: "Competitors", icon: TrendingUp },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "forecast", label: "ROI Forecast", icon: TrendingUp },
  { id: "strategycomposer", label: "AI Strategy Composer", icon: Settings },
  { id: "team", label: "Team Manager", icon: Users },
]

export function EnhancedSocialMediaDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AIPoweredBusinessDashboard />
      case "social":
        return <SocialMediaManager />
      case "audience":
        return <EnhancedAudienceTracker />
      case "ads":
        return <EnhancedAdPerformance />
      case "auto":
        return <AutoRepliesEngine />
      case "messages":
        return <EnhancedAutoMessages />
      case "branding":
        return <BrandAssetsHub />
      case "cash":
        return <EnhancedCashLog />
      case "timing":
        return <AIAudienceTimingInsights />
      case "generator":
        return <AIPoweredAdIdeaGenerator />
      case "competitors":
        return <RageIntel />
      case "analytics":
        return <WebsiteAnalytics />
      case "forecast":
        return <AIROIForecastEngine />
      case "strategycomposer":
        return <AIStrategyComposer />
      case "team":
        return <TeamManager />
      default:
        return <AIPoweredBusinessDashboard />
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 overflow-hidden">
        <Sidebar className="border-r border-white/10" collapsible="offcanvas">
          <SidebarHeader className="border-b border-white/10 p-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-500/25">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-lg">Essentials</span>
                <div className="text-xs text-gray-300">AI-Powered OS</div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b border-white/10 p-4 flex items-center justify-between bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-600/30 text-white border border-white/10" />
              <h1 className="text-2xl font-bold text-white">
                {sidebarItems.find(item => item.id === activeTab)?.label || "Dashboard"}
              </h1>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-white border border-white/10">AI-Powered Mode</span>
          </header>

          <main className="flex-1 overflow-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
