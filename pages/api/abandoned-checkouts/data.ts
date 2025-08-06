import { NextApiRequest, NextApiResponse } from 'next'

// Mock data for abandoned checkouts
const mockAbandonedCarts = [
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const {
            status = 'all',
            urgency = 'all',
            source = 'all',
            limit = '50',
            offset = '0'
        } = req.query

        let filteredCarts = [...mockAbandonedCarts]

        // Filter by status
        if (status !== 'all') {
            filteredCarts = filteredCarts.filter(cart => {
                if (status === 'recovered') return cart.recovered
                if (status === 'pending') return !cart.recovered
                return true
            })
        }

        // Filter by urgency
        if (urgency !== 'all') {
            filteredCarts = filteredCarts.filter(cart => cart.urgency === urgency)
        }

        // Filter by source
        if (source !== 'all') {
            filteredCarts = filteredCarts.filter(cart => cart.cartSource === source)
        }

        // Apply pagination
        const limitNum = parseInt(limit as string)
        const offsetNum = parseInt(offset as string)
        const paginatedCarts = filteredCarts.slice(offsetNum, offsetNum + limitNum)

        // Calculate summary stats
        const totalAbandoned = mockAbandonedCarts.length
        const totalRecovered = mockAbandonedCarts.filter(cart => cart.recovered).length
        const recoveryRate = totalAbandoned > 0 ? (totalRecovered / totalAbandoned) * 100 : 0
        const totalRevenueRecovered = mockAbandonedCarts
            .filter(cart => cart.recovered)
            .reduce((sum, cart) => sum + cart.cartTotal, 0)

        res.status(200).json({
            carts: paginatedCarts,
            pagination: {
                total: filteredCarts.length,
                limit: limitNum,
                offset: offsetNum,
                hasMore: offsetNum + limitNum < filteredCarts.length
            },
            summary: {
                totalAbandoned,
                totalRecovered,
                recoveryRate: Math.round(recoveryRate * 100) / 100,
                totalRevenueRecovered: Math.round(totalRevenueRecovered * 100) / 100
            }
        })
    } catch (error) {
        console.error('Error fetching abandoned carts:', error)
        res.status(500).json({ error: 'Failed to fetch abandoned carts' })
    }
} 