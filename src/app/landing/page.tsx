"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Check, Star, Zap, Brain, Users, DollarSign, Clock, ArrowRight,
    Play, Shield, Sparkles, TrendingUp, Target, MessageSquare,
    BarChart3, Calendar, Crown, Gift, Activity, Heart, Eye
} from "lucide-react"
import { Header, PageHeader } from "@/components/ui/header"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
            {/* Premium Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(232,79,227,0.15),transparent_50%)] animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(131,56,236,0.1),transparent_50%)] animate-pulse delay-1000" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(232,79,227,0.05),transparent_70%)] animate-pulse delay-2000" />

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between p-6">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">Essentials Enhanced</span>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="text-white hover:text-pink-300">
                        Features
                    </Button>
                    <Button variant="ghost" className="text-white hover:text-pink-300">
                        Pricing
                    </Button>
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                        Get Started
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 px-6 py-24 text-center">
                <div className="max-w-5xl mx-auto">
                    {/* Premium Badge */}
                    <div className="inline-flex items-center justify-center rounded-full px-6 py-3 mb-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium shadow-lg shadow-pink-500/25 animate-fade-in">
                        <Sparkles className="w-4 h-4 mr-2" />
                        AI-Powered Business OS
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-2xl animate-slide-up">
                        Your Entire Business.
                    </h1>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight drop-shadow-2xl animate-slide-up">
                        <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                            One AI Operating System.
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto font-light leading-relaxed animate-fade-in-delay">
                        Essentials Enhanced replaces 100+ hours/week of work with smart tools, real-time alerts, and a system that thinks for you.
                    </p>

                    {/* Premium Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-bounce-in">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-10 py-6 rounded-full shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 border-0 font-semibold"
                        >
                            <Zap className="w-6 h-6 mr-3" />
                            Try it now · No code · No extra hires
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/40 text-lg px-10 py-6 rounded-full shadow-xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 font-semibold"
                        >
                            <Play className="w-6 h-6 mr-3" />
                            Book Live Demo
                        </Button>
                    </div>
                </div>

                {/* Premium Floating Dashboard Mockup */}
                <div className="mt-20 animate-fade-in-delay">
                    <div className="relative max-w-6xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-3xl blur-3xl animate-pulse" />
                        <div className="relative bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/20">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                    <div className="h-4 bg-gradient-to-r from-pink-500/40 to-purple-500/40 rounded mb-2" />
                                    <div className="h-3 bg-white/20 rounded mb-1" />
                                    <div className="h-3 bg-white/20 rounded w-2/3" />
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                    <div className="h-4 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded mb-2" />
                                    <div className="h-3 bg-white/20 rounded mb-1" />
                                    <div className="h-3 bg-white/20 rounded w-3/4" />
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                    <div className="h-4 bg-gradient-to-r from-pink-500/40 to-purple-500/40 rounded mb-2" />
                                    <div className="h-3 bg-white/20 rounded mb-1" />
                                    <div className="h-3 bg-white/20 rounded w-1/2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 1: Why Choose Us? */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Why Top Brands Trust Essentials Enhanced
                        </h2>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                            We&apos;re not just another dashboard. We&apos;re your AI-powered operating system — built to do the thinking, tracking, and execution for you.
                        </p>
                    </div>

                    {/* We replace tools, not just improve them */}
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 mb-12">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <Brain className="w-6 h-6 mr-3 text-pink-400" />
                            🧠 We replace tools, not just improve them:
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-700/50 rounded-xl p-6">
                                <div className="flex items-center mb-3">
                                    <Check className="w-5 h-5 text-green-400 mr-3" />
                                    <span className="text-white font-semibold">Instead of using 6 different apps</span>
                                </div>
                                <p className="text-gray-300 text-sm">you&apos;ll manage your entire business from one place.</p>
                            </div>
                            <div className="bg-gray-700/50 rounded-xl p-6">
                                <div className="flex items-center mb-3">
                                    <Check className="w-5 h-5 text-green-400 mr-3" />
                                    <span className="text-white font-semibold">Instead of hiring 3 extra people</span>
                                </div>
                                <p className="text-gray-300 text-sm">you&apos;ll get automated alerts, AI tasks, and predictive analysis.</p>
                            </div>
                            <div className="bg-gray-700/50 rounded-xl p-6">
                                <div className="flex items-center mb-3">
                                    <Check className="w-5 h-5 text-green-400 mr-3" />
                                    <span className="text-white font-semibold">Instead of reading dashboards</span>
                                </div>
                                <p className="text-gray-300 text-sm">our AI reads you what matters.</p>
                            </div>
                        </div>
                    </div>

                    {/* Results You'll See */}
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 mb-12">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <TrendingUp className="w-6 h-6 mr-3 text-green-400" />
                            📈 Results You'll See:
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-400 mb-2">+80%</div>
                                <div className="text-gray-300 text-sm">team productivity</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-red-400 mb-2">-70%</div>
                                <div className="text-gray-300 text-sm">time wasted on tracking or manual reports</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-400 mb-2">+30%</div>
                                <div className="text-gray-300 text-sm">sales lift using AI-led campaign suggestions</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-400 mb-2">Lower</div>
                                <div className="text-gray-300 text-sm">ad costs from smart optimization & spend warnings</div>
                            </div>
                        </div>
                    </div>

                    {/* Essentials Enhanced = All-in-One */}
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 mb-12">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <Sparkles className="w-6 h-6 mr-3 text-pink-400" />
                            🧩 Essentials Enhanced = All-in-One
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-gray-300 mb-4">No more jumping between Shopify, Meta Ads, Slack, Sheets, and Notion.</p>
                                <div className="space-y-2">
                                    <div className="flex items-center text-gray-300">
                                        <span className="w-2 h-2 bg-red-400 rounded-full mr-3" />
                                        <span>Shopify</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                                        <span>Meta Ads</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                                        <span>Slack</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                                        <span>Sheets</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                                        <span>Notion</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-300 mb-4">Your store, team, customers, cash, ads, VIPs, and content are all in one system.</p>
                                <div className="space-y-2">
                                    <div className="flex items-center text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 mr-3" />
                                        <span>Your store</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 mr-3" />
                                        <span>Your team</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 mr-3" />
                                        <span>Your customers</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 mr-3" />
                                        <span>Your cash</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 mr-3" />
                                        <span>Your ads</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 mr-3" />
                                        <span>Your VIPs</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 mr-3" />
                                        <span>Your content</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Comparison Table */}
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 mb-12">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <Target className="w-6 h-6 mr-3 text-blue-400" />
                            Essentials Enhanced vs Competitors
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-white font-semibold py-4 px-4 text-left">Feature / Tool</th>
                                        <th className="text-white font-semibold py-4 px-4 text-center">Essentials Enhanced</th>
                                        <th className="text-white font-semibold py-4 px-4 text-center">Traditional SaaS Tools</th>
                                        <th className="text-white font-semibold py-4 px-4 text-center">Analytics Dashboards</th>
                                        <th className="text-white font-semibold py-4 px-4 text-center">Team Management Tools</th>
                                    </tr>
                                </thead>
                                <tbody className="space-y-2">
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">AI Business OS (All-in-One)</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">Real-Time AI Forecasts</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">Cash Log System</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">AI ROI Predictions</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">Ad Performance Engine</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">Auto Messages & Replies</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-yellow-400">✅ (some)</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">AI Smart Alerts (Campaigns, Sales, Burnout)</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">Team Manager with AI Feedback & Mood Check</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">Smart Drops Tracker</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">VIP Customer Engine</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">Competitor Insights + Alerts</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">AI-Powered To-Do Builder</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-yellow-400">✅ (manual)</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">AI Summary Everywhere</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">AI Content Recommender</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">Burnout + Motivation Tracker</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">AI Decision Logger + Feedback Generator</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">Learning Path Tracker</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">Distraction + Focus Mode</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-gray-300">Ad Generator + ROAS Advisor</td>
                                        <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                        <td className="py-3 px-4 text-center text-red-400">❌</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary: Why We're Different */}
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 mb-12">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <Brain className="w-6 h-6 mr-3 text-pink-400" />
                            🧠 Summary: Why We're Different
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="bg-gray-700/50 rounded-xl p-6">
                                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                                        <Sparkles className="w-5 h-5 mr-2 text-pink-400" />
                                        Everything in One Place
                                    </h4>
                                    <p className="text-gray-300 text-sm">Others give you 1 tool. We give you the system — content, cash, customers, campaigns, and team.</p>
                                </div>
                                <div className="bg-gray-700/50 rounded-xl p-6">
                                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                                        <Brain className="w-5 h-5 mr-2 text-purple-400" />
                                        Built-in AI
                                    </h4>
                                    <p className="text-gray-300 text-sm">Our AI isn&apos;t just a chatbot. It reads your data, spots problems, recommends actions, and does the heavy lifting for you.</p>
                                </div>
                                <div className="bg-gray-700/50 rounded-xl p-6">
                                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                                        <Target className="w-5 h-5 mr-2 text-blue-400" />
                                        Business-Level Intelligence
                                    </h4>
                                    <p className="text-gray-300 text-sm">We&apos;re not a &quot;dashboard.&quot; We&apos;re a command center for real business owners who want to scale smart.</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-gray-700/50 rounded-xl p-6">
                                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                                        <Users className="w-5 h-5 mr-2 text-green-400" />
                                        Human + Business Insights
                                    </h4>
                                    <p className="text-gray-300 text-sm">Only we combine marketing metrics and human signals like mood, burnout, distractions, and collaboration mapping.</p>
                                </div>
                                <div className="bg-gray-700/50 rounded-xl p-6">
                                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                                        <DollarSign className="w-5 h-5 mr-2 text-yellow-400" />
                                        Real ROI Tracking
                                    </h4>
                                    <p className="text-gray-300 text-sm">You don&apos;t just see numbers. You see value: who made you money, which ads worked, and where you&apos;re wasting resources.</p>
                                </div>
                                <div className="bg-gray-700/50 rounded-xl p-6">
                                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                                        <Zap className="w-5 h-5 mr-2 text-red-400" />
                                        Automation That Replaces People
                                    </h4>
                                    <p className="text-gray-300 text-sm">You won&apos;t need 10 tools and 10 employees. Essentials Enhanced will run 70% of it, faster and cheaper.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How much time do you save? */}
                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/20 mb-12">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <Clock className="w-6 h-6 mr-3 text-yellow-400" />
                            🕒 How much time do you save?
                        </h3>
                        <div className="text-center mb-8">
                            <p className="text-xl text-gray-300 mb-4">If your team is 100 people…</p>
                                                            <p className="text-3xl font-bold text-green-400">You&apos;ll only need 30.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-4">Let our AI handle:</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 mr-3" />
                                        <span>Campaign optimization</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 mr-3" />
                                        <span>Sales forecasting</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 mr-3" />
                                        <span>Team tracking</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 mr-3" />
                                        <span>Auto-messaging</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 mr-3" />
                                        <span>VIP analysis</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 mr-3" />
                                        <span>Competitor reporting</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <span className="text-pink-400 font-semibold">…and more</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-700/50 rounded-xl p-6">
                                <h4 className="text-lg font-semibold text-white mb-4">Time Savings Calculator</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Manual reporting</span>
                                        <span className="text-red-400">-80%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Campaign management</span>
                                        <span className="text-red-400">-70%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Team coordination</span>
                                        <span className="text-red-400">-60%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Customer support</span>
                                        <span className="text-red-400">-90%</span>
                                    </div>
                                    <div className="border-t border-gray-600 pt-2 mt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-white font-semibold">Total time saved</span>
                                            <span className="text-green-400 font-bold">-75%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                ✨ You grow the brand.
                            </h3>
                            <h3 className="text-2xl font-bold text-white mb-6">
                                We&apos;ll run the rest.
                            </h3>
                            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-8 py-4">
                                <Zap className="w-5 h-5 mr-2" />
                                🔘 Start Now – Try Essentials Enhanced
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: What You Get (By Tool) */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            What You Get
                        </h2>
                        <p className="text-xl text-gray-300">
                            Every module designed to replace manual work with intelligent automation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="bg-gray-800/50 backdrop-blur-xl border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">AI Business Dashboard</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">See every weak spot + AI insights to fix it.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Real-time KPI tracking</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>AI-powered insights</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Predictive alerts</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 backdrop-blur-xl border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                                    <BarChart3 className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">Ad Performance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">Auto-track spend, ROAS, and get alerts when CPM spikes.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Multi-platform tracking</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>ROAS optimization</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>CPM spike alerts</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 backdrop-blur-xl border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                    <DollarSign className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">Cash Log</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">See exactly how much you earn or lose each day.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Daily profit tracking</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Expense categorization</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>ROI analysis</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 backdrop-blur-xl border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">ROI Forecast Engine</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">Know what your next campaign will return — before you launch.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Predictive modeling</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Campaign optimization</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Budget allocation</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 backdrop-blur-xl border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                                    <MessageSquare className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">Auto Replies</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">Auto-answer DMs, comments, and messages in real time.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Smart responses</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Multi-platform sync</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>24/7 availability</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 backdrop-blur-xl border-red-500/20 hover:border-red-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">Auto Messages</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">Create automated UGC reply flows, send WhatsApp offers, email drops.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>UGC automation</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>WhatsApp integration</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Email campaigns</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 backdrop-blur-xl border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">Audience Tracker</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">Track which content brings high-buying users.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>High-value user identification</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Content performance analysis</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Engagement scoring</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 backdrop-blur-xl border-teal-500/20 hover:border-teal-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">Team Manager</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">Monitor, manage, and reduce your team load by 70%.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Performance tracking</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Mood AI monitoring</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Workload optimization</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 backdrop-blur-xl border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                                    <Eye className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">Competitor Tracker</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">Know what your rivals post, spend, and where they fail.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Competitor analysis</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Spend tracking</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Gap identification</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 backdrop-blur-xl border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-4">
                                    <Crown className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">VIP Customers Engine</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">Identify top buyers, automate retention, and grow LTV.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>VIP identification</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Automated retention</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>LTV optimization</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 backdrop-blur-xl border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                                    <Gift className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">Analytics + Drops</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">Know when to drop products, based on real data.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Data-driven timing</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Product performance</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Market analysis</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Section 3: Time & Cost Saving */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
                                                    A team of 100? You&apos;ll only need 30.
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20">
                            <Clock className="w-12 h-12 text-red-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Save Time</h3>
                            <p className="text-gray-300">Cut reporting time by 80%. Get insights instantly, not weekly.</p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-green-500/20">
                            <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Save Money</h3>
                            <p className="text-gray-300">Replace 10+ tools with one platform. Cut costs by 70%.</p>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="text-left">
                                <h3 className="text-2xl font-bold text-red-400 mb-4">Without Us</h3>
                                <div className="space-y-2 text-gray-300">
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-red-400 rounded-full mr-3" />
                                        <span>10 separate tools</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-red-400 rounded-full mr-3" />
                                        <span>$400/month in costs</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-red-400 rounded-full mr-3" />
                                        <span>25 hours/week managing</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <ArrowRight className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                            </div>
                            <div className="text-center">
                                <ArrowRight className="w-8 h-8 text-purple-400 mx-auto mb-4 rotate-180" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-2xl font-bold text-green-400 mb-4">With Essentials Enhanced</h3>
                                <div className="space-y-2 text-gray-300">
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                                        <span>1 unified platform</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                                        <span>$89/month total</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                                        <span>3 hours/week managing</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Who This Is For */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
                        Who This Is For
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                            <Users className="w-8 h-8 text-pink-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">E-commerce owners</h3>
                            <p className="text-gray-300 text-sm">with no time</p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                            <Zap className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">Teams tired</h3>
                            <p className="text-gray-300 text-sm">of switching between tools</p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                            <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">Business owners</h3>
                            <p className="text-gray-300 text-sm">spending $1k+ on ads</p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                            <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">Marketers managing</h3>
                            <p className="text-gray-300 text-sm">10+ clients</p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                            <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">Founders scaling</h3>
                            <p className="text-gray-300 text-sm">teams but burning out</p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                            <Brain className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">Anyone wanting</h3>
                            <p className="text-gray-300 text-sm">AI to do the heavy lifting</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: AI-First Design */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/20">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                            Not just dashboards. Real AI actions.
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Most tools give you charts. Essentials Enhanced reads them, explains them, and tells you what to do next — then does it.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-700/50 rounded-xl p-6">
                                <Brain className="w-8 h-8 text-pink-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">AI Reads</h3>
                                <p className="text-gray-300 text-sm">Analyzes your data automatically</p>
                            </div>
                            <div className="bg-gray-700/50 rounded-xl p-6">
                                <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">AI Explains</h3>
                                <p className="text-gray-300 text-sm">Tells you what it means</p>
                            </div>
                            <div className="bg-gray-700/50 rounded-xl p-6">
                                <Zap className="w-8 h-8 text-green-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">AI Acts</h3>
                                <p className="text-gray-300 text-sm">Executes the solution for you</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 6: Final CTA */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/20">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Try the OS that works like a full team.
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            No more dashboards. No more guesswork. Just smart growth — on autopilot.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-8 py-4">
                                <Zap className="w-5 h-5 mr-2" />
                                Get Started Today
                            </Button>
                            <Button size="lg" variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white text-lg px-8 py-4">
                                <Play className="w-5 h-5 mr-2" />
                                Live Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 px-6 py-12 border-t border-purple-500/20">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Essentials Enhanced</span>
                        </div>
                        <div className="flex items-center space-x-6 text-gray-400">
                            <span>Privacy</span>
                            <span>Terms</span>
                            <span>Support</span>
                            <span>© 2024 Essentials Enhanced</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
} 