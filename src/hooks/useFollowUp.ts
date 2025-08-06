import { useState, useCallback } from 'react'

interface FollowUpMessage {
    cartId: string
    message: string
    channel: 'email' | 'whatsapp'
    sentAt: string
    status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'replied' | 'failed'
    customerResponse?: string
    recovered?: boolean
}

export function useFollowUp() {
    const [followUpLoading, setFollowUpLoading] = useState(false)
    const [followUpHistory, setFollowUpHistory] = useState<FollowUpMessage[]>([])
    const [error, setError] = useState<string | null>(null)

    // Send follow-up message
    const sendFollowUp = useCallback(async (
        cartId: string,
        message: string,
        channel: 'email' | 'whatsapp'
    ) => {
        try {
            setFollowUpLoading(true)
            setError(null)

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Simulate success/failure
            const success = Math.random() > 0.1 // 90% success rate

            if (!success) {
                throw new Error(`Failed to send ${channel} message`)
            }

            // Create follow-up record
            const followUp: FollowUpMessage = {
                cartId,
                message,
                channel,
                sentAt: new Date().toISOString(),
                status: 'sent'
            }

            // Add to history
            setFollowUpHistory(prev => [...prev, followUp])

            // Simulate status updates
            setTimeout(() => {
                setFollowUpHistory(prev =>
                    prev.map(f =>
                        f.cartId === cartId && f.sentAt === followUp.sentAt
                            ? { ...f, status: 'delivered' }
                            : f
                    )
                )
            }, 1000)

            // Simulate customer response (10% chance)
            if (Math.random() > 0.9) {
                setTimeout(() => {
                    setFollowUpHistory(prev =>
                        prev.map(f =>
                            f.cartId === cartId && f.sentAt === followUp.sentAt
                                ? {
                                    ...f,
                                    status: 'replied',
                                    customerResponse: channel === 'whatsapp'
                                        ? "Thanks! I'll complete my purchase now."
                                        : "I'm interested, can you help me with the checkout?"
                                }
                                : f
                        )
                    )
                }, 5000)
            }

            return { success: true, messageId: followUp.sentAt }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send follow-up')
            throw err
        } finally {
            setFollowUpLoading(false)
        }
    }, [])

    // Send AI-generated follow-up
    const sendAIFollowUp = useCallback(async (
        cartId: string,
        channel: 'email' | 'whatsapp',
        customerData: any
    ) => {
        try {
            setFollowUpLoading(true)
            setError(null)

            // Simulate AI processing
            await new Promise(resolve => setTimeout(resolve, 3000))

            // Generate AI message based on customer data
            const aiMessage = generateAIMessage(customerData, channel)

            return await sendFollowUp(cartId, aiMessage, channel)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send AI follow-up')
            throw err
        } finally {
            setFollowUpLoading(false)
        }
    }, [sendFollowUp])

    // Generate AI message based on customer data
    const generateAIMessage = (customerData: any, channel: 'email' | 'whatsapp'): string => {
        const { customerName, cartTotal, items, abandonmentReason } = customerData

        const itemNames = items.map((item: any) => item.name).join(', ')
        const isHighValue = cartTotal > 200
        const isMobile = customerData.cartSource === 'mobile'

        let message = ''

        if (channel === 'whatsapp') {
            if (isHighValue) {
                message = `Hi ${customerName}! 👋 I noticed you left some amazing items in your cart (${itemNames}). Don't miss out - complete your purchase now and get 15% off with code SAVE15! 🛒✨`
            } else {
                message = `Hey ${customerName}! 💫 I saw you were interested in ${itemNames}. Need help with anything? I'm here to assist! 😊`
            }
        } else {
            if (isHighValue) {
                message = `Hi ${customerName},\n\nI noticed you left some items in your cart (${itemNames}). As a valued customer, I'd like to offer you 15% off your entire order with code SAVE15.\n\nThis offer is valid for 24 hours only.\n\nBest regards,\nYour Store Team`
            } else {
                message = `Hi ${customerName},\n\nI saw you were interested in ${itemNames}. Is there anything I can help you with regarding your order?\n\nBest regards,\nYour Store Team`
            }
        }

        return message
    }

    // Get follow-up history for a specific cart
    const getFollowUpHistory = useCallback((cartId: string) => {
        return followUpHistory.filter(f => f.cartId === cartId)
    }, [followUpHistory])

    // Get follow-up statistics
    const getFollowUpStats = useCallback(() => {
        const total = followUpHistory.length
        const sent = followUpHistory.filter(f => f.status === 'sent').length
        const delivered = followUpHistory.filter(f => f.status === 'delivered').length
        const opened = followUpHistory.filter(f => f.status === 'opened').length
        const clicked = followUpHistory.filter(f => f.status === 'clicked').length
        const replied = followUpHistory.filter(f => f.status === 'replied').length
        const failed = followUpHistory.filter(f => f.status === 'failed').length

        return {
            total,
            sent,
            delivered,
            opened,
            clicked,
            replied,
            failed,
            deliveryRate: total > 0 ? (delivered / total) * 100 : 0,
            openRate: delivered > 0 ? (opened / delivered) * 100 : 0,
            replyRate: delivered > 0 ? (replied / delivered) * 100 : 0
        }
    }, [followUpHistory])

    // Clear error
    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return {
        sendFollowUp,
        sendAIFollowUp,
        getFollowUpHistory,
        getFollowUpStats,
        followUpLoading,
        error,
        clearError,
        followUpHistory
    }
} 