"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Calendar, Clock, Users, Video, MessageSquare, Mail, Bell,
    CheckCircle, XCircle, AlertTriangle, Plus, Settings, Link,
    ExternalLink, MapPin, Phone, Smartphone, Zap
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

interface Meeting {
    id: string
    title: string
    description: string
    date: Date
    duration: number
    attendees: string[]
    meetingLink?: string
    location?: string
    type: 'team' | 'client' | 'review' | 'planning' | 'training'
    status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
    reminders: string[]
    attendance: {
        [memberId: string]: 'confirmed' | 'pending' | 'declined' | 'attended' | 'no-show'
    }
}

interface MeetingManagerProps {
    teamMembers: TeamMember[]
}

export function MeetingManager({ teamMembers }: MeetingManagerProps) {
    const [showMeetingDialog, setShowMeetingDialog] = useState(false)
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
    const [meetingTitle, setMeetingTitle] = useState('')
    const [meetingDescription, setMeetingDescription] = useState('')
    const [meetingDate, setMeetingDate] = useState('')
    const [meetingTime, setMeetingTime] = useState('')
    const [meetingDuration, setMeetingDuration] = useState(60)
    const [selectedAttendees, setSelectedAttendees] = useState<string[]>([])
    const [meetingType, setMeetingType] = useState<'team' | 'client' | 'review' | 'planning' | 'training'>('team')
    const [meetingLink, setMeetingLink] = useState('')
    const [meetingLocation, setMeetingLocation] = useState('')

    // Mock meetings data
    const meetings: Meeting[] = [
        {
            id: '1',
            title: 'Weekly Team Sync',
            description: 'Review progress, discuss challenges, and plan next week',
            date: new Date('2024-01-15T10:00:00'),
            duration: 60,
            attendees: ['1', '2', '3', '4'],
            meetingLink: 'https://meet.google.com/abc-defg-hij',
            type: 'team',
            status: 'scheduled',
            reminders: ['email', 'whatsapp', 'in-app'],
            attendance: {
                '1': 'confirmed',
                '2': 'confirmed',
                '3': 'pending',
                '4': 'declined'
            }
        },
        {
            id: '2',
            title: 'Campaign Performance Review',
            description: 'Analyze Q4 campaign results and plan Q1 strategy',
            date: new Date('2024-01-16T14:00:00'),
            duration: 90,
            attendees: ['1', '3'],
            meetingLink: 'https://zoom.us/j/123456789',
            type: 'review',
            status: 'scheduled',
            reminders: ['email', 'in-app'],
            attendance: {
                '1': 'confirmed',
                '3': 'confirmed'
            }
        },
        {
            id: '3',
            title: 'Content Strategy Planning',
            description: 'Plan content calendar for next month',
            date: new Date('2024-01-14T11:00:00'),
            duration: 45,
            attendees: ['2', '4'],
            type: 'planning',
            status: 'completed',
            reminders: ['email'],
            attendance: {
                '2': 'attended',
                '4': 'no-show'
            }
        }
    ]

    const getMeetingTypeColor = (type: string) => {
        switch (type) {
            case 'team': return 'text-blue-600 bg-blue-100'
            case 'client': return 'text-purple-600 bg-purple-100'
            case 'review': return 'text-green-600 bg-green-100'
            case 'planning': return 'text-orange-600 bg-orange-100'
            case 'training': return 'text-pink-600 bg-pink-100'
            default: return 'text-gray-600 bg-gray-100'
        }
    }

    const getMeetingStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled': return 'text-blue-600 bg-blue-100'
            case 'ongoing': return 'text-green-600 bg-green-100'
            case 'completed': return 'text-gray-600 bg-gray-100'
            case 'cancelled': return 'text-red-600 bg-red-100'
            default: return 'text-gray-600 bg-gray-100'
        }
    }

    const getAttendanceStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'text-green-600 bg-green-100'
            case 'pending': return 'text-yellow-600 bg-yellow-100'
            case 'declined': return 'text-red-600 bg-red-100'
            case 'attended': return 'text-green-600 bg-green-100'
            case 'no-show': return 'text-red-600 bg-red-100'
            default: return 'text-gray-600 bg-gray-100'
        }
    }

    const getAttendanceIcon = (status: string) => {
        switch (status) {
            case 'confirmed':
            case 'attended':
                return <CheckCircle className="h-4 w-4 text-green-500" />
            case 'declined':
            case 'no-show':
                return <XCircle className="h-4 w-4 text-red-500" />
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-500" />
            default:
                return <AlertTriangle className="h-4 w-4 text-gray-500" />
        }
    }

    const handleCreateMeeting = () => {
        // Mock API call to create meeting
        console.log('Creating meeting:', {
            title: meetingTitle,
            description: meetingDescription,
            date: meetingDate,
            time: meetingTime,
            duration: meetingDuration,
            attendees: selectedAttendees,
            type: meetingType,
            link: meetingLink,
            location: meetingLocation
        })
        setShowMeetingDialog(false)
        // Reset form
        setMeetingTitle('')
        setMeetingDescription('')
        setMeetingDate('')
        setMeetingTime('')
        setMeetingDuration(60)
        setSelectedAttendees([])
        setMeetingType('team')
        setMeetingLink('')
        setMeetingLocation('')
    }

    const MeetingDialog = () => (
        <Dialog open={showMeetingDialog} onOpenChange={setShowMeetingDialog}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5" />
                        <span>Schedule Meeting</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="title">Meeting Title</Label>
                            <Input
                                id="title"
                                value={meetingTitle}
                                onChange={(e) => setMeetingTitle(e.target.value)}
                                placeholder="Enter meeting title"
                            />
                        </div>
                        <div>
                            <Label htmlFor="type">Meeting Type</Label>
                            <select
                                id="type"
                                name="type"
                                aria-label="Select meeting type"
                                className="w-full p-2 border rounded-md"
                                value={meetingType}
                                onChange={(e) => setMeetingType(e.target.value as any)}
                            >
                                <option value="team">Team Meeting</option>
                                <option value="client">Client Meeting</option>
                                <option value="review">Review Meeting</option>
                                <option value="planning">Planning Meeting</option>
                                <option value="training">Training Session</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={meetingDescription}
                            onChange={(e) => setMeetingDescription(e.target.value)}
                            placeholder="Enter meeting description..."
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={meetingDate}
                                onChange={(e) => setMeetingDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="time">Time</Label>
                            <Input
                                id="time"
                                type="time"
                                value={meetingTime}
                                onChange={(e) => setMeetingTime(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="duration">Duration (minutes)</Label>
                            <Input
                                id="duration"
                                type="number"
                                value={meetingDuration}
                                onChange={(e) => setMeetingDuration(Number(e.target.value))}
                                min="15"
                                max="480"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="link">Meeting Link (optional)</Label>
                            <Input
                                id="link"
                                value={meetingLink}
                                onChange={(e) => setMeetingLink(e.target.value)}
                                placeholder="https://meet.google.com/..."
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location (optional)</Label>
                            <Input
                                id="location"
                                value={meetingLocation}
                                onChange={(e) => setMeetingLocation(e.target.value)}
                                placeholder="Office, Conference Room, etc."
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Attendees</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                            {teamMembers.map((member) => (
                                <label key={member.id} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        checked={selectedAttendees.includes(member.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedAttendees([...selectedAttendees, member.id])
                                            } else {
                                                setSelectedAttendees(selectedAttendees.filter(id => id !== member.id))
                                            }
                                        }}
                                    />
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{member.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button onClick={handleCreateMeeting} className="flex-1">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Meeting
                        </Button>
                        <Button variant="outline" onClick={() => setShowMeetingDialog(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Meeting Manager</h2>
                    <p className="text-gray-300">Schedule and manage team meetings</p>
                </div>
                <Button onClick={() => setShowMeetingDialog(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Meeting
                </Button>
            </div>

            {/* Upcoming Meetings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5" />
                        <span>Upcoming Meetings</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {meetings.filter(m => m.status === 'scheduled').length} scheduled
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {meetings.filter(m => m.status === 'scheduled').map((meeting) => (
                            <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getMeetingTypeColor(meeting.type)}>
                                            {meeting.type}
                                        </Badge>
                                        <Badge className={getMeetingStatusColor(meeting.status)}>
                                            {meeting.status}
                                        </Badge>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{meeting.title}</h4>
                                        <p className="text-sm text-gray-600">{meeting.description}</p>
                                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                            <span className="flex items-center space-x-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>{meeting.date.toLocaleDateString()}</span>
                                            </span>
                                            <span className="flex items-center space-x-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{meeting.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </span>
                                            <span className="flex items-center space-x-1">
                                                <Users className="h-3 w-3" />
                                                <span>{meeting.attendees.length} attendees</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    {meeting.meetingLink && (
                                        <Button size="sm" variant="outline">
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Join
                                        </Button>
                                    )}
                                    <Button size="sm" variant="outline">
                                        <Bell className="h-4 w-4 mr-2" />
                                        Remind
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Meetings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Clock className="h-5 w-5" />
                        <span>Recent Meetings</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {meetings.filter(m => m.status === 'completed').map((meeting) => (
                            <div key={meeting.id} className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getMeetingTypeColor(meeting.type)}>
                                            {meeting.type}
                                        </Badge>
                                        <Badge className={getMeetingStatusColor(meeting.status)}>
                                            {meeting.status}
                                        </Badge>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {meeting.date.toLocaleDateString()}
                                    </span>
                                </div>
                                
                                <h4 className="font-semibold mb-2">{meeting.title}</h4>
                                <p className="text-sm text-gray-600 mb-3">{meeting.description}</p>
                                
                                {/* Attendance */}
                                <div>
                                    <p className="text-sm font-medium mb-2">Attendance:</p>
                                    <div className="flex items-center space-x-3">
                                        {meeting.attendees.map((attendeeId) => {
                                            const member = teamMembers.find(m => m.id === attendeeId)
                                            const status = meeting.attendance[attendeeId]
                                            return member ? (
                                                <div key={attendeeId} className="flex items-center space-x-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={member.avatar} />
                                                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex items-center space-x-1">
                                                        {getAttendanceIcon(status)}
                                                        <Badge className={getAttendanceStatusColor(status)}>
                                                            {status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ) : null
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Meeting Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Meetings</p>
                                <p className="text-2xl font-bold">{meetings.length}</p>
                                <p className="text-xs text-blue-600">This month</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Attendance Rate</p>
                                <p className="text-2xl font-bold">87%</p>
                                <p className="text-xs text-green-600">+5% vs last month</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                <Clock className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Avg Duration</p>
                                <p className="text-2xl font-bold">65min</p>
                                <p className="text-xs text-yellow-600">Efficient</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Avg Attendees</p>
                                <p className="text-2xl font-bold">3.2</p>
                                <p className="text-xs text-purple-600">Per meeting</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <MeetingDialog />
        </div>
    )
} 