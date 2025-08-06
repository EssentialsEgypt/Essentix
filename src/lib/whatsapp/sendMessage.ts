interface WhatsAppMessage {
    to: string
    message: string
    template?: string
    variables?: Record<string, string>
}

interface WhatsAppResponse {
    success: boolean
    messageId?: string
    error?: string
    status: 'sent' | 'delivered' | 'failed'
}

// Mock WhatsApp API integration
export async function sendWhatsAppMessage(
    phoneNumber: string,
    message: string,
    template?: string,
    variables?: Record<string, string>
): Promise<WhatsAppResponse> {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Validate phone number format
        if (!isValidPhoneNumber(phoneNumber)) {
            throw new Error('Invalid phone number format')
        }

        // Simulate success/failure (90% success rate)
        const success = Math.random() > 0.1

        if (!success) {
            throw new Error('WhatsApp API error: Message delivery failed')
        }

        // Generate mock message ID
        const messageId = `wa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        return {
            success: true,
            messageId,
            status: 'sent'
        }
    } catch (error) {
        console.error('Error sending WhatsApp message:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'failed'
        }
    }
}

// Send WhatsApp template message
export async function sendWhatsAppTemplate(
    phoneNumber: string,
    templateName: string,
    variables: Record<string, string>
): Promise<WhatsAppResponse> {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Validate phone number
        if (!isValidPhoneNumber(phoneNumber)) {
            throw new Error('Invalid phone number format')
        }

        // Simulate success
        const messageId = `wa_template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        return {
            success: true,
            messageId,
            status: 'sent'
        }
    } catch (error) {
        console.error('Error sending WhatsApp template:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'failed'
        }
    }
}

// Check message delivery status
export async function checkWhatsAppStatus(messageId: string): Promise<{
    status: 'sent' | 'delivered' | 'read' | 'failed'
    timestamp?: string
}> {
    try {
        // Simulate status check delay
        await new Promise(resolve => setTimeout(resolve, 500))

        // Simulate status progression
        const statuses: Array<'sent' | 'delivered' | 'read' | 'failed'> = ['sent', 'delivered', 'read', 'failed']
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

        return {
            status: randomStatus,
            timestamp: new Date().toISOString()
        }
    } catch (error) {
        console.error('Error checking WhatsApp status:', error)
        return {
            status: 'failed'
        }
    }
}

// Send bulk WhatsApp messages
export async function sendBulkWhatsAppMessages(
    messages: WhatsAppMessage[]
): Promise<WhatsAppResponse[]> {
    try {
        const results = await Promise.all(
            messages.map(msg =>
                sendWhatsAppMessage(msg.to, msg.message, msg.template, msg.variables)
            )
        )

        return results
    } catch (error) {
        console.error('Error sending bulk WhatsApp messages:', error)
        return messages.map(() => ({
            success: false,
            error: 'Bulk send failed',
            status: 'failed'
        }))
    }
}

// Validate phone number format
function isValidPhoneNumber(phoneNumber: string): boolean {
    // Basic validation - in production, use a proper phone number library
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''))
}

// Format phone number for WhatsApp
export function formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters except +
    let formatted = phoneNumber.replace(/[^\d+]/g, '')

    // Ensure it starts with +
    if (!formatted.startsWith('+')) {
        formatted = '+' + formatted
    }

    return formatted
}

// Get WhatsApp templates
export async function getWhatsAppTemplates(): Promise<Array<{
    name: string
    language: string
    category: string
    components: any[]
}>> {
    // Mock templates
    return [
        {
            name: 'abandoned_cart_reminder',
            language: 'en',
            category: 'MARKETING',
            components: [
                {
                    type: 'HEADER',
                    text: 'Your cart is waiting!'
                },
                {
                    type: 'BODY',
                    text: 'Hi {{1}}, I noticed you left some items in your cart. Don\'t miss out - complete your purchase now!'
                },
                {
                    type: 'BUTTON',
                    sub_type: 'URL',
                    text: 'Complete Purchase',
                    url: '{{2}}'
                }
            ]
        },
        {
            name: 'exclusive_offer',
            language: 'en',
            category: 'MARKETING',
            components: [
                {
                    type: 'HEADER',
                    text: 'Exclusive Offer Just for You!'
                },
                {
                    type: 'BODY',
                    text: 'Hi {{1}}, as a valued customer, here\'s an exclusive offer: {{2}} off your cart! Use code {{3}} at checkout.'
                },
                {
                    type: 'BUTTON',
                    sub_type: 'URL',
                    text: 'Shop Now',
                    url: '{{4}}'
                }
            ]
        }
    ]
} 