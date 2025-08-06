interface EmailMessage {
    to: string
    subject: string
    html: string
    text?: string
    from?: string
    replyTo?: string
    attachments?: Array<{
        filename: string
        content: string
        contentType: string
    }>
}

interface EmailResponse {
    success: boolean
    messageId?: string
    error?: string
    status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed'
}

// Mock email API integration
export async function sendEmail(
    to: string,
    subject: string,
    html: string,
    text?: string,
    from?: string
): Promise<EmailResponse> {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Validate email format
        if (!isValidEmail(to)) {
            throw new Error('Invalid email format')
        }

        // Simulate success/failure (95% success rate)
        const success = Math.random() > 0.05

        if (!success) {
            throw new Error('Email service error: Message delivery failed')
        }

        // Generate mock message ID
        const messageId = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        return {
            success: true,
            messageId,
            status: 'sent'
        }
    } catch (error) {
        console.error('Error sending email:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'failed'
        }
    }
}

// Send email with template
export async function sendEmailTemplate(
    to: string,
    templateName: string,
    variables: Record<string, string>
): Promise<EmailResponse> {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800))

        // Validate email
        if (!isValidEmail(to)) {
            throw new Error('Invalid email format')
        }

        // Generate mock message ID
        const messageId = `email_template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        return {
            success: true,
            messageId,
            status: 'sent'
        }
    } catch (error) {
        console.error('Error sending email template:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'failed'
        }
    }
}

// Check email delivery status
export async function checkEmailStatus(messageId: string): Promise<{
    status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed'
    timestamp?: string
    opens?: number
    clicks?: number
}> {
    try {
        // Simulate status check delay
        await new Promise(resolve => setTimeout(resolve, 300))

        // Simulate status progression
        const statuses: Array<'sent' | 'delivered' | 'opened' | 'clicked' | 'failed'> = [
            'sent', 'delivered', 'opened', 'clicked', 'failed'
        ]
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

        return {
            status: randomStatus,
            timestamp: new Date().toISOString(),
            opens: randomStatus === 'opened' || randomStatus === 'clicked' ? Math.floor(Math.random() * 3) + 1 : 0,
            clicks: randomStatus === 'clicked' ? Math.floor(Math.random() * 2) + 1 : 0
        }
    } catch (error) {
        console.error('Error checking email status:', error)
        return {
            status: 'failed'
        }
    }
}

// Send bulk emails
export async function sendBulkEmails(
    emails: EmailMessage[]
): Promise<EmailResponse[]> {
    try {
        const results = await Promise.all(
            emails.map(email =>
                sendEmail(email.to, email.subject, email.html, email.text, email.from)
            )
        )

        return results
    } catch (error) {
        console.error('Error sending bulk emails:', error)
        return emails.map(() => ({
            success: false,
            error: 'Bulk send failed',
            status: 'failed'
        }))
    }
}

// Generate email HTML template
export function generateEmailHTML(
    customerName: string,
    cartItems: Array<{ name: string; price: number; quantity: number }>,
    cartTotal: number,
    currency: string,
    offer?: string,
    checkoutUrl?: string
): string {
    const itemsHTML = cartItems.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <strong>${item.name}</strong>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ${currency} ${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('')

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Complete Your Purchase</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h1 style="color: white; margin: 0; text-align: center;">Your Cart is Waiting!</h1>
      </div>
      
      <p>Hi ${customerName},</p>
      
      <p>I noticed you left some items in your cart. Don't miss out on these great products!</p>
      
      ${offer ? `<div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745;">
        <h3 style="margin: 0 0 10px 0; color: #28a745;">🎉 Special Offer Just for You!</h3>
        <p style="margin: 0; font-size: 18px;"><strong>${offer}</strong></p>
      </div>` : ''}
      
      <h3>Items in Your Cart:</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #f8f9fa;">
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6;">Item</th>
            <th style="padding: 10px; text-align: center; border-bottom: 2px solid #dee2e6;">Qty</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #dee2e6;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
        <tfoot>
          <tr style="background: #f8f9fa; font-weight: bold;">
            <td colspan="2" style="padding: 10px; text-align: right;">Total:</td>
            <td style="padding: 10px; text-align: right;">${currency} ${cartTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      
      ${checkoutUrl ? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="${checkoutUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Complete Your Purchase
          </a>
        </div>
      ` : ''}
      
      <p>If you have any questions or need assistance, please don't hesitate to reach out to our customer support team.</p>
      
      <p>Best regards,<br>Your Store Team</p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="font-size: 12px; color: #666; text-align: center;">
        This email was sent to you because you left items in your cart. 
        If you no longer wish to receive these emails, you can <a href="#" style="color: #667eea;">unsubscribe here</a>.
      </p>
    </body>
    </html>
  `
}

// Generate email text version
export function generateEmailText(
    customerName: string,
    cartItems: Array<{ name: string; price: number; quantity: number }>,
    cartTotal: number,
    currency: string,
    offer?: string,
    checkoutUrl?: string
): string {
    const itemsText = cartItems.map(item =>
        `- ${item.name} (Qty: ${item.quantity}) - ${currency} ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n')

    return `
Hi ${customerName},

I noticed you left some items in your cart. Don't miss out on these great products!

${offer ? `🎉 Special Offer Just for You: ${offer}` : ''}

Items in Your Cart:
${itemsText}

Total: ${currency} ${cartTotal.toFixed(2)}

${checkoutUrl ? `Complete your purchase: ${checkoutUrl}` : ''}

If you have any questions or need assistance, please don't hesitate to reach out to our customer support team.

Best regards,
Your Store Team

---
This email was sent to you because you left items in your cart.
  `.trim()
}

// Validate email format
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Get email templates
export async function getEmailTemplates(): Promise<Array<{
    name: string
    subject: string
    description: string
    variables: string[]
}>> {
    return [
        {
            name: 'abandoned_cart_reminder',
            subject: 'Complete Your Purchase - Your Cart is Waiting!',
            description: 'Friendly reminder about abandoned cart items',
            variables: ['customer_name', 'cart_items', 'cart_total', 'checkout_url']
        },
        {
            name: 'exclusive_offer',
            subject: 'Exclusive Offer Just for You!',
            description: 'Special offer for abandoned cart recovery',
            variables: ['customer_name', 'offer', 'cart_items', 'checkout_url']
        },
        {
            name: 'assistance_offer',
            subject: 'Need Help with Your Order?',
            description: 'Assistance-focused email for abandoned carts',
            variables: ['customer_name', 'cart_items', 'support_url']
        }
    ]
} 