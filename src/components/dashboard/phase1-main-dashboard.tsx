"use client"

import { useState, useEffect } from "react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar"
import { BarChart3, Instagram, Facebook, Youtube, Mail, MessageCircle, ShoppingCart, TrendingUp, Target, Users } from "lucide-react"
import supabase from "@/utils/supabaseClient"
import RageIntel from "./rageintel"
import { TeamManager } from "./team-manager"

function AlertCard({ alerts }: { alerts: Array<{ id: string; message: string }> }) {
  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-900 p-4 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">AI Team Alerts</h3>
      <ul className="list-disc list-inside space-y-1">
        {alerts.length === 0 ? (
          <li>No active alerts</li>
        ) : (
          alerts.map((alert) => <li key={alert.id}>{alert.message}</li>)
        )}
      </ul>
    </div>
  )
}

const sidebarItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "facebook", label: "Facebook Ads", icon: Facebook },
  { id: "tiktok", label: "TikTok", icon: Youtube },
  { id: "googleads", label: "Google Ads", icon: TrendingUp },
  { id: "email", label: "Email Campaigns", icon: Mail },
  { id: "whatsapp", label: "WhatsApp / UGC", icon: MessageCircle },
  { id: "sales", label: "Sales & Conversion", icon: ShoppingCart },
  { id: "rageintel", label: "RageIntel™", icon: Target },
  { id: "team", label: "Team Manager", icon: Users },
]

export function Phase1MainDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [alerts, setAlerts] = useState<Array<{ id: string; message: string }>>([])

  useEffect(() => {
    async function fetchAlerts() {
      const { data, error } = await supabase
        .from("alerts")
        .select("id, message")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(3)
      if (!error && data) {
        setAlerts(data)
      }
    }
    fetchAlerts()
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <AlertCard alerts={alerts} />
            <div className="mt-6 p-6 border rounded-md bg-white shadow">
              <h2 className="text-3xl font-bold mb-4">Overview Dashboard</h2>
              <p className="text-lg text-muted-foreground">
                Main summary panel with KPIs, trendline, top platforms, goals, and alerts.
              </p>
            </div>
          </>
        )
      case "instagram":
        return <Placeholder title="Instagram Analytics" description="Follower growth, engagement metrics, reels, heatmap, top posts, story insights, hashtag performance." />
      case "facebook":
        return <Placeholder title="Facebook Ads Panel" description="Ad set table, campaign selector, graphs, ad creative preview, breakdown tabs, audience segments, diagnostics." />
      case "tiktok":
        return <Placeholder title="TikTok Analytics" description="Views, likes, shares, saves, trending videos, watch time, ads split, UGC vs brand video." />
      case "googleads":
        return <Placeholder title="Google Ads Panel" description="Campaign performance, spend, conversions, and more." />
      case "email":
        return <Placeholder title="Email Campaign Performance" description="Campaign table, heatmap, list growth, top templates, A/B test results." />
      case "whatsapp":
        return <Placeholder title="WhatsApp & DMs Monitor" description="Response time, missed messages, conversion ratio, top agents, chat timeline." />
      case "sales":
        return <Placeholder title="Sales Attribution & Conversion Tracking" description="Funnel chart, attribution model, UTM performance, product sales, conversion ratios." />
      case "rageintel":
        return <RageIntel />
      case "team":
        return <TeamManager />
      default:
        return (
          <>
            <AlertCard alerts={alerts} />
            <div className="mt-6 p-6 border rounded-md bg-white shadow">
              <h2 className="text-3xl font-bold mb-4">Overview Dashboard</h2>
              <p className="text-lg text-muted-foreground">
                Main summary panel with KPIs, trendline, top platforms, goals, and alerts.
              </p>
            </div>
          </>
        )
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              <span className="font-semibold">Essentials Egypt Phase 1</span>
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
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </SidebarProvider>
  )
}

function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  )
}
