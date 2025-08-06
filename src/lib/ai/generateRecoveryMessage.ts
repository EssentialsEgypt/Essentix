interface CustomerData {
    name: string
    email: string
    phone?: string
    cartTotal: number
    currency: string
    items: Array<{
        name: string
        price: number
        quantity: number
    }>
    abandonmentReason?: string
    urgency: 'high' | 'medium' | 'low'
    cartSource: 'web' | 'mobile' | 'app'
    previousPurchases?: number
    customerLifetimeValue?: number
    lastPurchaseDate?: string
}

interface AIMessageResponse {
    message: string
    strategy: string
    confidence: number
    reasoning: string
    suggestedOffer?: string
    timing: string
}

// Mock AI response generator
export async function generateRecoveryMessage(
    customerData: CustomerData,
    channel: 'email' | 'whatsapp',
    strategy?: 'urgent' | 'personal' | 'offer' | 'assistance'
): Promise<AIMessageResponse> {
    try {
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 2000))

        const { name, cartTotal, items, abandonmentReason, urgency, cartSource } = customerData

        // Generate message based on strategy and channel
        let message = ''
        let aiStrategy = strategy || 'personal'
        let confidence = 0.85
        let reasoning = ''
        let suggestedOffer = ''
        let timing = 'Send immediately'

        const itemNames = items.map(item => item.name).join(', ')
        const isHighValue = cartTotal > 200
        const isMobile = cartSource === 'mobile'

        if (channel === 'whatsapp') {
            switch (aiStrategy) {
                case 'urgent':
                    message = `Hi ${name}! ⚡ I noticed you left some amazing items in your cart (${itemNames}). Don't miss out - complete your purchase now and get 15% off with code FLASH15! Valid for 2 hours only! 🛒✨`
                    reasoning = 'High-value cart with recent activity, urgent reminder with time-limited discount'
                    suggestedOffer = '15% off for 2 hours'
                    confidence = 0.92
                    break

                case 'personal':
                    message = `Hey ${name}! 💫 I saw you were interested in ${itemNames}. These items are perfect for you! Need help with anything? I'm here to assist. 😊`
                    reasoning = 'Personal approach with assistance offer, no pressure'
                    confidence = 0.87
                    break

                case 'offer':
                    message = `🎉 ${name}, exclusive offer just for you! Complete your cart now and get 10% off + free shipping. This offer expires in 24 hours! ⏰`
                    reasoning = 'Limited time offer creates urgency'
                    suggestedOffer = '10% off + free shipping'
                    confidence = 0.79
                    break

                case 'assistance':
                    message = `Hi ${name}! 👋 I noticed you left some items in your cart. Is there anything I can help you with? Maybe sizing questions or payment issues? I'm here to help! 🤝`
                    reasoning = 'Assistance-focused approach, addresses potential abandonment reasons'
                    confidence = 0.83
                    break

                default:
                    message = `Hi ${name}! 👋 I noticed you left some items in your cart (${itemNames}). Don't miss out - complete your purchase now! 🛒`
                    reasoning = 'Standard friendly reminder'
                    confidence = 0.85
            }
        } else {
            // Email channel
            switch (aiStrategy) {
                case 'urgent':
                    message = `Hi ${name},\n\nI noticed you left some items in your cart (${itemNames}). As a valued customer, I'd like to offer you 15% off your entire order with code FLASH15.\n\nThis offer is valid for 2 hours only.\n\nBest regards,\nYour Store Team`
                    reasoning = 'High-value cart with recent activity, urgent reminder with time-limited discount'
                    suggestedOffer = '15% off for 2 hours'
                    confidence = 0.92
                    break

                case 'personal':
                    message = `Hi ${name},\n\nI saw you were interested in ${itemNames}. Is there anything I can help you with regarding your order?\n\nBest regards,\nYour Store Team`
                    reasoning = 'Personal approach with assistance offer, no pressure'
                    confidence = 0.87
                    break

                case 'offer':
                    message = `Hi ${name},\n\nExclusive offer just for you! Complete your cart now and get 10% off + free shipping. This offer expires in 24 hours.\n\nBest regards,\nYour Store Team`
                    reasoning = 'Limited time offer creates urgency'
                    suggestedOffer = '10% off + free shipping'
                    confidence = 0.79
                    break

                case 'assistance':
                    message = `Hi ${name},\n\nI noticed you left some items in your cart. Is there anything I can help you with? Maybe sizing questions or payment issues?\n\nBest regards,\nYour Store Team`
                    reasoning = 'Assistance-focused approach, addresses potential abandonment reasons'
                    confidence = 0.83
                    break

                default:
                    message = `Hi ${name},\n\nI noticed you left some items in your cart (${itemNames}). Don't miss out - complete your purchase now!\n\nBest regards,\nYour Store Team`
                    reasoning = 'Standard friendly reminder'
                    confidence = 0.85
            }
        }

        // Adjust confidence based on customer data
        if (isHighValue) confidence += 0.05
        if (isMobile) confidence += 0.03
        if (abandonmentReason) confidence += 0.02

        return {
            message,
            strategy: aiStrategy,
            confidence: Math.min(confidence, 0.98),
            reasoning,
            suggestedOffer,
            timing
        }
    } catch (error) {
        console.error('Error generating AI recovery message:', error)
        throw new Error('Failed to generate recovery message')
    }
}

// Generate multiple message options
export async function generateMultipleMessages(
    customerData: CustomerData,
    channel: 'email' | 'whatsapp'
): Promise<AIMessageResponse[]> {
    const strategies: Array<'urgent' | 'personal' | 'offer' | 'assistance'> = [
        'urgent',
        'personal',
        'offer',
        'assistance'
    ]

    const messages = await Promise.all(
        strategies.map(strategy =>
            generateRecoveryMessage(customerData, channel, strategy)
        )
    )

    // Sort by confidence
    return messages.sort((a, b) => b.confidence - a.confidence)
}

// Analyze abandonment reason using AI
export async function analyzeAbandonmentReason(
    customerData: CustomerData,
    cartBehavior: any
): Promise<string> {
    try {
        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 1500))

        const { cartTotal, cartSource, items } = customerData

        // Simple logic for demo - in production this would use AI
        if (cartTotal > 200 && cartSource === 'mobile') {
            return 'High shipping cost on mobile'
        } else if (cartSource === 'mobile') {
            return 'Mobile load issue'
        } else if (items.length > 3) {
            return 'Size chart confusion'
        } else if (cartTotal < 50) {
            return 'Price comparison'
        } else {
            return 'Payment method issues'
        }
    } catch (error) {
        console.error('Error analyzing abandonment reason:', error)
        return 'Unknown reason'
    }
}

// Generate personalized offer
export async function generatePersonalizedOffer(
    customerData: CustomerData
): Promise<{
    offer: string
    discount: number
    conditions: string[]
    reasoning: string
}> {
    try {
        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 1000))

        const { cartTotal, previousPurchases, customerLifetimeValue } = customerData

        let offer = ''
        let discount = 0
        let conditions: string[] = []
        let reasoning = ''

        if (customerLifetimeValue && customerLifetimeValue > 1000) {
            // VIP customer
            offer = '20% off + free shipping'
            discount = 20
            conditions = ['VIP customers only', 'One-time use per customer']
            reasoning = 'High lifetime value customer, personalized VIP treatment'
        } else if (cartTotal > 200) {
            // High-value cart
            offer = '15% off + free shipping'
            discount = 15
            conditions = ['Orders over $200', 'Valid for 24 hours']
            reasoning = 'High-value cart, significant discount to encourage completion'
        } else if (cartTotal > 100) {
            // Medium-value cart
            offer = '10% off'
            discount = 10
            conditions = ['Valid for 24 hours', 'Minimum $50 purchase']
            reasoning = 'Medium-value cart, standard discount offer'
        } else {
            // Low-value cart
            offer = 'Free shipping'
            discount = 0
            conditions = ['Orders over $50', 'Standard shipping only']
            reasoning = 'Low-value cart, eliminate shipping cost barrier'
        }

        return {
            offer,
            discount,
            conditions,
            reasoning
        }
    } catch (error) {
        console.error('Error generating personalized offer:', error)
        throw new Error('Failed to generate personalized offer')
    }
} 