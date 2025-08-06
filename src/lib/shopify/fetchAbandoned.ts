interface ShopifyAbandonedCart {
    id: string
    customer: {
        id: string
        first_name: string
        last_name: string
        email: string
        phone?: string
    }
    line_items: Array<{
        id: string
        title: string
        price: string
        quantity: number
        image_url?: string
        product_id: string
        variant_id: string
    }>
    total_price: string
    currency: string
    abandoned_checkout_url: string
    created_at: string
    updated_at: string
    source_name?: string
    note?: string
    tags?: string[]
}

interface ShopifyAbandonedCartResponse {
    abandoned_checkouts: ShopifyAbandonedCart[]
}

// Mock Shopify API response
const mockShopifyResponse: ShopifyAbandonedCartResponse = {
    abandoned_checkouts: [
        {
            id: "123456789",
            customer: {
                id: "987654321",
                first_name: "Sarah",
                last_name: "Johnson",
                email: "sarah.johnson@email.com",
                phone: "+1234567890"
            },
            line_items: [
                {
                    id: "item1",
                    title: "Premium Wireless Headphones",
                    price: "89.99",
                    quantity: 1,
                    image_url: "https://example.com/headphones.jpg",
                    product_id: "prod1",
                    variant_id: "var1"
                },
                {
                    id: "item2",
                    title: "Phone Case",
                    price: "24.99",
                    quantity: 2,
                    image_url: "https://example.com/case.jpg",
                    product_id: "prod2",
                    variant_id: "var2"
                }
            ],
            total_price: "189.99",
            currency: "USD",
            abandoned_checkout_url: "https://store.myshopify.com/checkout/123456789",
            created_at: "2024-01-15T10:30:00Z",
            updated_at: "2024-01-15T10:30:00Z",
            source_name: "web",
            tags: ["high-value", "tech"]
        }
    ]
}

export async function fetchAbandonedCarts(
    shopDomain: string,
    accessToken: string,
    limit: number = 50
): Promise<ShopifyAbandonedCart[]> {
    try {
        // In production, this would make a real API call to Shopify
        // const response = await fetch(
        //   `https://${shopDomain}.myshopify.com/admin/api/2023-10/checkouts.json?status=open&limit=${limit}`,
        //   {
        //     headers: {
        //       'X-Shopify-Access-Token': accessToken,
        //       'Content-Type': 'application/json'
        //     }
        //   }
        // )

        // if (!response.ok) {
        //   throw new Error(`Shopify API error: ${response.status}`)
        // }

        // const data: ShopifyAbandonedCartResponse = await response.json()

        // For now, return mock data
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay

        return mockShopifyResponse.abandoned_checkouts
    } catch (error) {
        console.error('Error fetching abandoned carts from Shopify:', error)
        throw new Error('Failed to fetch abandoned carts from Shopify')
    }
}

export async function getAbandonedCartById(
    shopDomain: string,
    accessToken: string,
    cartId: string
): Promise<ShopifyAbandonedCart | null> {
    try {
        // In production, this would make a real API call to Shopify
        // const response = await fetch(
        //   `https://${shopDomain}.myshopify.com/admin/api/2023-10/checkouts/${cartId}.json`,
        //   {
        //     headers: {
        //       'X-Shopify-Access-Token': accessToken,
        //       'Content-Type': 'application/json'
        //     }
        //   }
        // )

        // if (!response.ok) {
        //   return null
        // }

        // const data = await response.json()

        // For now, return mock data
        await new Promise(resolve => setTimeout(resolve, 500))

        const cart = mockShopifyResponse.abandoned_checkouts.find(c => c.id === cartId)
        return cart || null
    } catch (error) {
        console.error('Error fetching abandoned cart by ID:', error)
        return null
    }
}

export async function markCartAsRecovered(
    shopDomain: string,
    accessToken: string,
    cartId: string
): Promise<boolean> {
    try {
        // In production, this would make a real API call to Shopify
        // const response = await fetch(
        //   `https://${shopDomain}.myshopify.com/admin/api/2023-10/checkouts/${cartId}.json`,
        //   {
        //     method: 'PUT',
        //     headers: {
        //       'X-Shopify-Access-Token': accessToken,
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       checkout: {
        //         tags: ['recovered', 'abandoned-cart-recovery']
        //       }
        //     })
        //   }
        // )

        // if (!response.ok) {
        //   return false
        // }

        // For now, simulate success
        await new Promise(resolve => setTimeout(resolve, 1000))

        return true
    } catch (error) {
        console.error('Error marking cart as recovered:', error)
        return false
    }
}

export function transformShopifyCart(shopifyCart: ShopifyAbandonedCart) {
    return {
        id: shopifyCart.id,
        customerName: `${shopifyCart.customer.first_name} ${shopifyCart.customer.last_name}`,
        customerEmail: shopifyCart.customer.email,
        customerPhone: shopifyCart.customer.phone,
        cartTotal: parseFloat(shopifyCart.total_price),
        currency: shopifyCart.currency,
        abandonedAt: shopifyCart.created_at,
        cartSource: shopifyCart.source_name as 'web' | 'mobile' | 'app' || 'web',
        items: shopifyCart.line_items.map(item => ({
            id: item.id,
            name: item.title,
            price: parseFloat(item.price),
            quantity: item.quantity,
            image: item.image_url || ''
        })),
        urgency: getUrgencyLevel(shopifyCart),
        contactAttempts: 0,
        recovered: false
    }
}

function getUrgencyLevel(cart: ShopifyAbandonedCart): 'high' | 'medium' | 'low' {
    const totalPrice = parseFloat(cart.total_price)
    const abandonedTime = new Date(cart.created_at)
    const now = new Date()
    const hoursSinceAbandoned = (now.getTime() - abandonedTime.getTime()) / (1000 * 60 * 60)

    // High urgency: High value (>$200) or abandoned recently (<2 hours)
    if (totalPrice > 200 || hoursSinceAbandoned < 2) {
        return 'high'
    }

    // Medium urgency: Medium value ($50-$200) or abandoned 2-24 hours ago
    if (totalPrice > 50 || hoursSinceAbandoned < 24) {
        return 'medium'
    }

    // Low urgency: Everything else
    return 'low'
} 