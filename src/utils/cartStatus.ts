export interface CartStatus {
    id: string
    status: 'abandoned' | 'recovered' | 'pending' | 'expired'
    abandonedAt: Date
    lastContacted?: Date
    contactAttempts: number
    urgency: 'high' | 'medium' | 'low'
    recoveryProbability: number // 0-100
    nextAction?: {
        type: 'email' | 'whatsapp' | 'sms'
        scheduledAt: Date
        message?: string
    }
}

export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
    variant?: string
}

export interface AbandonedCart {
    id: string
    customerName: string
    customerEmail: string
    customerPhone?: string
    cartTotal: number
    currency: string
    items: CartItem[]
    abandonedAt: Date
    cartSource: 'web' | 'mobile' | 'app'
    abandonmentReason?: string
    urgency: 'high' | 'medium' | 'low'
    lastContacted?: Date
    contactAttempts: number
    recovered: boolean
    recoveredAt?: Date
    recoveryRevenue?: number
}

// Calculate urgency level based on cart data
export function calculateUrgency(cart: AbandonedCart): 'high' | 'medium' | 'low' {
    const now = new Date()
    const hoursSinceAbandoned = (now.getTime() - cart.abandonedAt.getTime()) / (1000 * 60 * 60)

    // High urgency: High value (>$200) or abandoned recently (<2 hours)
    if (cart.cartTotal > 200 || hoursSinceAbandoned < 2) {
        return 'high'
    }

    // Medium urgency: Medium value ($50-$200) or abandoned 2-24 hours ago
    if (cart.cartTotal > 50 || hoursSinceAbandoned < 24) {
        return 'medium'
    }

    // Low urgency: Everything else
    return 'low'
}

// Calculate recovery probability based on various factors
export function calculateRecoveryProbability(cart: AbandonedCart): number {
    let probability = 50 // Base probability

    // Factor 1: Cart value (higher value = higher probability)
    if (cart.cartTotal > 200) probability += 20
    else if (cart.cartTotal > 100) probability += 10
    else if (cart.cartTotal < 50) probability -= 10

    // Factor 2: Time since abandonment (fresher = higher probability)
    const hoursSinceAbandoned = (Date.now() - cart.abandonedAt.getTime()) / (1000 * 60 * 60)
    if (hoursSinceAbandoned < 1) probability += 15
    else if (hoursSinceAbandoned < 6) probability += 10
    else if (hoursSinceAbandoned < 24) probability += 5
    else if (hoursSinceAbandoned > 72) probability -= 20

    // Factor 3: Number of items (more items = higher probability)
    if (cart.items.length > 3) probability += 10
    else if (cart.items.length === 1) probability -= 5

    // Factor 4: Contact attempts (more attempts = lower probability)
    probability -= cart.contactAttempts * 5

    // Factor 5: Cart source (mobile users have different behavior)
    if (cart.cartSource === 'mobile') probability -= 5

    // Factor 6: Abandonment reason (if known)
    if (cart.abandonmentReason) {
        if (cart.abandonmentReason.includes('shipping')) probability += 10
        else if (cart.abandonmentReason.includes('payment')) probability -= 5
        else if (cart.abandonmentReason.includes('technical')) probability -= 10
    }

    // Ensure probability stays within 0-100 range
    return Math.max(0, Math.min(100, probability))
}

// Determine next action for a cart
export function determineNextAction(cart: AbandonedCart): {
    type: 'email' | 'whatsapp' | 'sms'
    scheduledAt: Date
    message?: string
} | null {
    const now = new Date()
    const hoursSinceAbandoned = (now.getTime() - cart.abandonedAt.getTime()) / (1000 * 60 * 60)
    const hoursSinceLastContact = cart.lastContacted
        ? (now.getTime() - cart.lastContacted.getTime()) / (1000 * 60 * 60)
        : Infinity

    // Don't send if too many attempts or too much time has passed
    if (cart.contactAttempts >= 3 || hoursSinceAbandoned > 168) { // 7 days
        return null
    }

    // Determine timing based on urgency and previous attempts
    let delayHours = 0
    if (cart.urgency === 'high') {
        delayHours = cart.contactAttempts === 0 ? 1 : 6
    } else if (cart.urgency === 'medium') {
        delayHours = cart.contactAttempts === 0 ? 6 : 24
    } else {
        delayHours = cart.contactAttempts === 0 ? 24 : 48
    }

    // Don't send if we contacted recently
    if (hoursSinceLastContact < delayHours) {
        return null
    }

    // Determine channel based on customer data and previous attempts
    let channel: 'email' | 'whatsapp' | 'sms'
    if (cart.customerPhone && cart.contactAttempts === 0) {
        channel = 'whatsapp' // Try WhatsApp first if we have phone
    } else if (cart.customerEmail) {
        channel = 'email' // Fall back to email
    } else {
        return null // No contact method
    }

    const scheduledAt = new Date(now.getTime() + delayHours * 60 * 60 * 1000)

    return {
        type: channel,
        scheduledAt,
        message: generateDefaultMessage(cart, channel)
    }
}

// Generate default message based on cart and channel
export function generateDefaultMessage(cart: AbandonedCart, channel: 'email' | 'whatsapp' | 'sms'): string {
    const itemNames = cart.items.map(item => item.name).join(', ')

    if (channel === 'whatsapp') {
        if (cart.urgency === 'high') {
            return `Hi ${cart.customerName}! ⚡ I noticed you left some amazing items in your cart (${itemNames}). Don't miss out - complete your purchase now and get 15% off with code FLASH15! Valid for 2 hours only! 🛒✨`
        } else {
            return `Hey ${cart.customerName}! 💫 I saw you were interested in ${itemNames}. These items are perfect for you! Need help with anything? I'm here to assist. 😊`
        }
    } else {
        // Email
        if (cart.urgency === 'high') {
            return `Hi ${cart.customerName},\n\nI noticed you left some items in your cart (${itemNames}). As a valued customer, I'd like to offer you 15% off your entire order with code FLASH15.\n\nThis offer is valid for 2 hours only.\n\nBest regards,\nYour Store Team`
        } else {
            return `Hi ${cart.customerName},\n\nI saw you were interested in ${itemNames}. Is there anything I can help you with regarding your order?\n\nBest regards,\nYour Store Team`
        }
    }
}

// Check if cart should be considered expired
export function isCartExpired(cart: AbandonedCart): boolean {
    const now = new Date()
    const daysSinceAbandoned = (now.getTime() - cart.abandonedAt.getTime()) / (1000 * 60 * 60 * 24)

    // Consider cart expired after 7 days
    return daysSinceAbandoned > 7
}

// Get cart status summary
export function getCartStatus(cart: AbandonedCart): CartStatus {
    const urgency = calculateUrgency(cart)
    const recoveryProbability = calculateRecoveryProbability(cart)
    const nextAction = determineNextAction(cart)

    let status: 'abandoned' | 'recovered' | 'pending' | 'expired'
    if (cart.recovered) {
        status = 'recovered'
    } else if (isCartExpired(cart)) {
        status = 'expired'
    } else if (nextAction) {
        status = 'pending'
    } else {
        status = 'abandoned'
    }

    return {
        id: cart.id,
        status,
        abandonedAt: cart.abandonedAt,
        lastContacted: cart.lastContacted,
        contactAttempts: cart.contactAttempts,
        urgency,
        recoveryProbability,
        nextAction
    }
}

// Get carts that need immediate attention
export function getCartsNeedingAttention(carts: AbandonedCart[]): AbandonedCart[] {
    return carts.filter(cart => {
        if (cart.recovered || isCartExpired(cart)) return false

        const status = getCartStatus(cart)
        return status.urgency === 'high' && status.recoveryProbability > 70
    })
}

// Get carts ready for follow-up
export function getCartsReadyForFollowUp(carts: AbandonedCart[]): AbandonedCart[] {
    return carts.filter(cart => {
        if (cart.recovered || isCartExpired(cart)) return false

        const status = getCartStatus(cart)
        return status.nextAction !== null
    })
}

// Update cart after contact attempt
export function updateCartAfterContact(
    cart: AbandonedCart,
    contactType: 'email' | 'whatsapp' | 'sms',
    success: boolean
): AbandonedCart {
    return {
        ...cart,
        lastContacted: new Date(),
        contactAttempts: cart.contactAttempts + 1,
        // In a real implementation, you might also update the recovery probability
        // based on the success of the contact attempt
    }
}

// Mark cart as recovered
export function markCartAsRecovered(
    cart: AbandonedCart,
    recoveryRevenue?: number
): AbandonedCart {
    return {
        ...cart,
        recovered: true,
        recoveredAt: new Date(),
        recoveryRevenue
    }
} 