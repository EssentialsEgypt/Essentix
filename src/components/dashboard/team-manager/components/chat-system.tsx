"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    MessageSquare, Send, Mic, Pin, Brain, Users, UserPlus,
    Search, MoreHorizontal, Smile, Paperclip, Video, Phone,
    Volume2, Play, Pause, Download, Share, Star, AlertCircle
} from "lucide-react"

interface TeamMember {
    id: string
    name: string
    role: string
    status: 'active' | 'away' | 'offline' | 'focus'
    avatar: string
    email: string
    phone: string
    joinDate: Date
    aiMotivationType: string
    strengths: string[]
    currentStressLevel: number
    lastTasks: string[]
    openTasks: number
    completedTasks: number
    campaignsInvolved: number
    meetingAttendance: number
    responseSpeed: number
    deadlineCompliance: number
    salary: number
    toolCost: number
    revenueImpact: number
    roi: number
    mood: 'positive' | 'neutral' | 'negative'
    burnoutRisk: number
    focusMode: boolean
    lastActive: Date
    timeSpent: number
    skills: string[]
    desiredSkills: string[]
    mentorId?: string
    menteeIds: string[]
    permissions: string[]
    motivationDrivers: string[]
}

interface ChatMessage {
    id: string
    senderId: string
    senderName: string
    content: string
    timestamp: Date
    type: 'text' | 'voice' | 'image' | 'file'
    isAI?: boolean
    isPinned?: boolean
    reactions?: { [userId: string]: string }
}

interface ChatRoom {
    id: string
    name: string
    type: 'team' | 'direct' | 'group' | 'ai'
    participants: string[]
    lastMessage?: ChatMessage
    unreadCount: number
    isPinned: boolean
}

interface ChatSystemProps {
    teamMembers: TeamMember[]
}

export function ChatSystem({ teamMembers }: ChatSystemProps) {
    const [selectedRoom, setSelectedRoom] = useState<string>('team')
    const [message, setMessage] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [showAIAssistant, setShowAIAssistant] = useState(false)

    // Mock chat rooms
    const chatRooms: ChatRoom[] = [
        {
            id: 'team',
            name: 'Team Room',
            type: 'team',
            participants: teamMembers.map(m => m.id),
            unreadCount: 3,
            isPinned: true
        },
        {
            id: 'ai',
            name: 'AI Assistant',
            type: 'ai',
            participants: ['ai'],
            unreadCount: 0,
            isPinned: true
        },
        {
            id: 'campaigns',
            name: 'Campaign Team',
            type: 'group',
            participants: ['1', '3'],
            unreadCount: 1,
            isPinned: false
        }
    ]

    // Mock messages
    const messages: ChatMessage[] = [
        {
            id: '1',
            senderId: '1',
            senderName: 'Ahmed Hassan',
            content: 'Great work on the Q4 campaign everyone! 🎉',
            timestamp: new Date('2024-01-15T10:30:00'),
            type: 'text',
            reactions: { '2': '👍', '3': '🎉' }
        },
        {
            id: '2',
            senderId: 'ai',
            senderName: 'AI Assistant',
            content: '📊 Daily Summary: Team completed 15 tasks today with 95% deadline compliance. Omar achieved highest ROI at 6.2x. Farouk needs attention - high stress levels detected.',
            timestamp: new Date('2024-01-15T10:35:00'),
            type: 'text',
            isAI: true,
            isPinned: true
        },
        {
            id: '3',
            senderId: '2',
            senderName: 'Nada El-Sayed',
            content: 'Just finished the new Instagram reel. Should I post it now or wait for tomorrow?',
            timestamp: new Date('2024-01-15T10:40:00'),
            type: 'text'
        },
        {
            id: '4',
            senderId: '3',
            senderName: 'Omar Khalil',
            content: '📈 Monthly report is ready. Revenue up 23% from last month!',
            timestamp: new Date('2024-01-15T10:45:00'),
            type: 'text',
            reactions: { '1': '🔥', '2': '📈' }
        }
    ]

    const handleSendMessage = () => {
        if (message.trim()) {
            console.log('Sending message:', message)
            setMessage('')
        }
    }

    const handleVoiceMessage = () => {
        setIsRecording(!isRecording)
        console.log('Voice recording:', isRecording ? 'stopped' : 'started')
    }

    const handleAIAssistant = () => {
        setShowAIAssistant(!showAIAssistant)
    }

    const getMemberById = (id: string) => {
        return teamMembers.find(m => m.id === id)
    }

    const getRoomById = (id: string) => {
        return chatRooms.find(r => r.id === id)
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Team Chat</h2>
                    <p className="text-gray-300">Real-time communication with AI assistance</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                    </Button>
                    <Button variant="outline" size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Member
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[600px]">
                {/* Chat Rooms Sidebar */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <MessageSquare className="h-5 w-5" />
                            <span>Chats</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {chatRooms.map((room) => (
                            <div
                                key={room.id}
                                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                    selectedRoom === room.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                                }`}
                                onClick={() => setSelectedRoom(room.id)}
                            >
                                <div className="relative">
                                    {room.type === 'ai' ? (
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                                            <Brain className="h-5 w-5 text-white" />
                                        </div>
                                    ) : (
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src="/avatars/team.jpg" />
                                            <AvatarFallback>
                                                {room.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    {room.unreadCount > 0 && (
                                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                            {room.unreadCount}
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2">
                                        <h4 className="font-medium truncate">{room.name}</h4>
                                        {room.isPinned && <Pin className="h-3 w-3 text-yellow-500" />}
                                    </div>
                                    {room.lastMessage && (
                                        <p className="text-xs text-gray-500 truncate">
                                            {room.lastMessage.content}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Chat Messages */}
                <Card className="lg:col-span-3 flex flex-col">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/team.jpg" />
                                    <AvatarFallback>
                                        {getRoomById(selectedRoom)?.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">{getRoomById(selectedRoom)?.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {getRoomById(selectedRoom)?.participants.length} members
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                    <Video className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Phone className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col">
                        {/* Messages Area */}
                        <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isAI ? 'justify-center' : msg.senderId === '1' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${msg.isAI ? 'w-full' : ''}`}>
                                        {!msg.isAI && msg.senderId !== '1' && (
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={getMemberById(msg.senderId)?.avatar} />
                                                <AvatarFallback>
                                                    {msg.senderName.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={`flex flex-col ${msg.senderId === '1' ? 'items-end' : 'items-start'}`}>
                                            {!msg.isAI && (
                                                <p className="text-xs text-gray-500 mb-1">{msg.senderName}</p>
                                            )}
                                            <div className={`p-3 rounded-lg ${
                                                msg.isAI 
                                                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 w-full' 
                                                    : msg.senderId === '1'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100'
                                            }`}>
                                                <div className="flex items-center space-x-2 mb-1">
                                                    {msg.isAI && <Brain className="h-4 w-4 text-purple-500" />}
                                                    {msg.isPinned && <Pin className="h-3 w-3 text-yellow-500" />}
                                                </div>
                                                <p className="text-sm">{msg.content}</p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-xs opacity-70">
                                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                    {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                                                        <div className="flex items-center space-x-1">
                                                            {Object.entries(msg.reactions).map(([userId, reaction]) => (
                                                                <Badge key={userId} variant="outline" className="text-xs">
                                                                    {reaction}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {!msg.isAI && msg.senderId === '1' && (
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={getMemberById(msg.senderId)?.avatar} />
                                                <AvatarFallback>
                                                    {msg.senderName.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="border-t pt-4">
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleVoiceMessage}
                                    className={isRecording ? 'bg-red-500 text-white' : ''}
                                >
                                    <Mic className="h-4 w-4" />
                                </Button>
                                <div className="flex-1 relative">
                                    <Input
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        className="pr-20"
                                    />
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                        <Button variant="ghost" size="sm">
                                            <Smile className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <Paperclip className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* AI Assistant Panel */}
            {showAIAssistant && (
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Brain className="h-5 w-5" />
                            <span>AI Assistant</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Button variant="outline" className="justify-start">
                                <Brain className="h-4 w-4 mr-2" />
                                Summarize last 5 messages
                            </Button>
                            <Button variant="outline" className="justify-start">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Remind me at 6PM
                            </Button>
                            <Button variant="outline" className="justify-start">
                                <Star className="h-4 w-4 mr-2" />
                                Generate team insights
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
} 