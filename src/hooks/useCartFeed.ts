import { useState, useEffect, useCallback } from 'react'

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

// Mock data for abandoned carts
const mockCarts: AbandonedCart[] = [
    {
        id: "1",
        customerName: "Sarah Johnson",
        customerEmail: "sarah.johnson@email.com",
        customerPhone: "+1234567890",
        cartTotal: 189.99,
        currency: "USD",
        abandonedAt: "2024-01-15T10:30:00Z",
        cartSource: "web",
        items: [
            { id: "item1", name: "Premium Wireless Headphones", price: 89.99, quantity: 1, image: "headphones.jpg" },
            { id: "item2", name: "Phone Case", price: 24.99, quantity: 2, image: "case.jpg" },
            { id: "item3", name: "Screen Protector", price: 15.00, quantity: 1, image: "protector.jpg" }
        ],
        abandonmentReason: "High shipping cost",
        urgency: "high",
        contactAttempts: 0,
        recovered: false
    },
    {
        id: "2",
        customerName: "Michael Chen",
        customerEmail: "michael.chen@email.com",
        cartTotal: 299.50,
        currency: "USD",
        abandonedAt: "2024-01-15T09:15:00Z",
        cartSource: "mobile",
        items: [
            { id: "item4", name: "Smart Watch", price: 199.99, quantity: 1, image: "watch.jpg" },
            { id: "item5", name: "Charging Cable", price: 19.99, quantity: 2, image: "cable.jpg" },
            { id: "item6", name: "Wireless Charger", price: 39.99, quantity: 1, image: "charger.jpg" }
        ],
        abandonmentReason: "Payment method issues",
        urgency: "medium",
        contactAttempts: 1,
        recovered: false
    },
    {
        id: "3",
        customerName: "Emily Rodriguez",
        customerEmail: "emily.rodriguez@email.com",
        customerPhone: "+1987654321",
        cartTotal: 75.00,
        currency: "USD",
        abandonedAt: "2024-01-15T08:45:00Z",
        cartSource: "app",
        items: [
            { id: "item7", name: "Bluetooth Speaker", price: 49.99, quantity: 1, image: "speaker.jpg" },
            { id: "item8", name: "USB Cable Set", price: 12.99, quantity: 2, image: "usb.jpg" }
        ],
        abandonmentReason: "Mobile load issue",
        urgency: "low",
        contactAttempts: 0,
        recovered: false
    },
    {
        id: "4",
        customerName: "David Kim",
        customerEmail: "david.kim@email.com",
        cartTotal: 450.00,
        currency: "USD",
        abandonedAt: "2024-01-15T07:30:00Z",
        cartSource: "web",
        items: [
            { id: "item9", name: "Gaming Laptop", price: 1299.99, quantity: 1, image: "laptop.jpg" },
            { id: "item10", name: "Gaming Mouse", price: 79.99, quantity: 1, image: "mouse.jpg" },
            { id: "item11", name: "Mechanical Keyboard", price: 149.99, quantity: 1, image: "keyboard.jpg" }
        ],
        abandonmentReason: "Size chart confusion",
        urgency: "high",
        contactAttempts: 2,
        recovered: false
    },
    {
        id: "5",
        customerName: "Lisa Thompson",
        customerEmail: "lisa.thompson@email.com",
        cartTotal: 125.50,
        currency: "USD",
        abandonedAt: "2024-01-15T06:20:00Z",
        cartSource: "mobile",
        items: [
            { id: "item12", name: "Fitness Tracker", price: 89.99, quantity: 1, image: "tracker.jpg" },
            { id: "item13", name: "Resistance Bands", price: 24.99, quantity: 2, image: "bands.jpg" },
            { id: "item14", name: "Yoga Mat", price: 35.99, quantity: 1, image: "mat.jpg" }
        ],
        abandonmentReason: "Technical error",
        urgency: "medium",
        contactAttempts: 1,
        recovered: false
    }
]

export function useCartFeed() {
    const [carts, setCarts] = useState<AbandonedCart[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Simulate fetching carts from API
    const fetchCarts = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Simulate some carts being recovered
            const updatedCarts = mockCarts.map(cart => ({
                ...cart,
                recovered: Math.random() > 0.8 // 20% chance of being recovered
            }))

            setCarts(updatedCarts)
        } catch (err) {
            setError('Failed to fetch abandoned carts')
            console.error('Error fetching carts:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    // Refresh carts data
    const refreshCarts = useCallback(async () => {
        await fetchCarts()
    }, [fetchCarts])

    // Auto-refresh every 15 minutes
    useEffect(() => {
        fetchCarts()

        const interval = setInterval(() => {
            fetchCarts()
        }, 15 * 60 * 1000) // 15 minutes

        return () => clearInterval(interval)
    }, [fetchCarts])

    // Update cart status (e.g., when recovered)
    const updateCartStatus = useCallback((cartId: string, updates: Partial<AbandonedCart>) => {
        setCarts(prevCarts =>
            prevCarts.map(cart =>
                cart.id === cartId ? { ...cart, ...updates } : cart
            )
        )
    }, [])

    // Mark cart as recovered
    const markAsRecovered = useCallback((cartId: string) => {
        updateCartStatus(cartId, { recovered: true })
    }, [updateCartStatus])

    // Update contact attempts
    const updateContactAttempts = useCallback((cartId: string) => {
        setCarts(prevCarts =>
            prevCarts.map(cart =>
                cart.id === cartId
                    ? {
                        ...cart,
                        contactAttempts: cart.contactAttempts + 1,
                        lastContacted: new Date().toISOString()
                    }
                    : cart
            )
        )
    }, [])

    return {
        carts,
        loading,
        error,
        refreshCarts,
        updateCartStatus,
        markAsRecovered,
        updateContactAttempts
    }
} 