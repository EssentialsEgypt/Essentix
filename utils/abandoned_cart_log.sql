-- Abandoned Cart Recovery Tables

-- Table for storing abandoned cart data
CREATE TABLE IF NOT EXISTS abandoned_carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shopify_cart_id VARCHAR(255) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    cart_total DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    abandoned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    cart_source VARCHAR(20) DEFAULT 'web', -- web, mobile, app
    cart_items JSONB NOT NULL, -- Array of cart items
    abandonment_reason VARCHAR(500),
    urgency VARCHAR(20) DEFAULT 'medium', -- high, medium, low
    last_contacted TIMESTAMP WITH TIME ZONE,
    contact_attempts INTEGER DEFAULT 0,
    recovered BOOLEAN DEFAULT FALSE,
    recovered_at TIMESTAMP WITH TIME ZONE,
    recovery_revenue DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing recovery follow-up messages
CREATE TABLE IF NOT EXISTS recovery_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES abandoned_carts(id) ON DELETE CASCADE,
    message_type VARCHAR(20) NOT NULL, -- email, whatsapp, sms
    message_content TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'sent', -- sent, delivered, opened, clicked, replied, failed
    customer_response TEXT,
    response_at TIMESTAMP WITH TIME ZONE,
    offer_used VARCHAR(100),
    discount_amount DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing AI-generated offers
CREATE TABLE IF NOT EXISTS ai_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES abandoned_carts(id) ON DELETE CASCADE,
    offer_type VARCHAR(50) NOT NULL, -- discount, free_shipping, bundle, urgency, personalized
    offer_value VARCHAR(100) NOT NULL,
    discount_percentage INTEGER,
    conditions JSONB, -- Array of conditions
    ai_confidence DECIMAL(3,2), -- 0.00 to 1.00
    ai_reasoning TEXT,
    predicted_conversion DECIMAL(5,2), -- Percentage
    predicted_revenue DECIMAL(10,2),
    used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing follow-up flow templates
CREATE TABLE IF NOT EXISTS follow_up_flows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    flow_steps JSONB NOT NULL, -- Array of flow steps
    conditions JSONB, -- Trigger conditions
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing flow executions
CREATE TABLE IF NOT EXISTS flow_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    flow_id UUID REFERENCES follow_up_flows(id) ON DELETE CASCADE,
    cart_id UUID REFERENCES abandoned_carts(id) ON DELETE CASCADE,
    current_step INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active', -- active, completed, paused, failed
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing recovery analytics
CREATE TABLE IF NOT EXISTS recovery_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    total_abandoned INTEGER DEFAULT 0,
    total_recovered INTEGER DEFAULT 0,
    recovery_rate DECIMAL(5,2), -- Percentage
    total_revenue_recovered DECIMAL(10,2) DEFAULT 0,
    avg_recovery_time_hours DECIMAL(5,2),
    most_common_reason VARCHAR(255),
    top_offer_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_customer_email ON abandoned_carts(customer_email);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_abandoned_at ON abandoned_carts(abandoned_at);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_recovered ON abandoned_carts(recovered);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_urgency ON abandoned_carts(urgency);
CREATE INDEX IF NOT EXISTS idx_recovery_log_cart_id ON recovery_log(cart_id);
CREATE INDEX IF NOT EXISTS idx_recovery_log_sent_at ON recovery_log(sent_at);
CREATE INDEX IF NOT EXISTS idx_recovery_log_status ON recovery_log(status);
CREATE INDEX IF NOT EXISTS idx_ai_offers_cart_id ON ai_offers(cart_id);
CREATE INDEX IF NOT EXISTS idx_ai_offers_confidence ON ai_offers(ai_confidence);
CREATE INDEX IF NOT EXISTS idx_flow_executions_cart_id ON flow_executions(cart_id);
CREATE INDEX IF NOT EXISTS idx_flow_executions_status ON flow_executions(status);
CREATE INDEX IF NOT EXISTS idx_recovery_analytics_date ON recovery_analytics(date);

-- Row Level Security (RLS) Policies
ALTER TABLE abandoned_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_up_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE flow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for abandoned_carts
CREATE POLICY "Users can view their own abandoned carts" ON abandoned_carts
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own abandoned carts" ON abandoned_carts
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own abandoned carts" ON abandoned_carts
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for recovery_log
CREATE POLICY "Users can view their own recovery logs" ON recovery_log
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own recovery logs" ON recovery_log
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for ai_offers
CREATE POLICY "Users can view their own AI offers" ON ai_offers
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own AI offers" ON ai_offers
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for follow_up_flows
CREATE POLICY "Users can view their own follow-up flows" ON follow_up_flows
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own follow-up flows" ON follow_up_flows
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own follow-up flows" ON follow_up_flows
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for flow_executions
CREATE POLICY "Users can view their own flow executions" ON flow_executions
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own flow executions" ON flow_executions
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own flow executions" ON flow_executions
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for recovery_analytics
CREATE POLICY "Users can view their own recovery analytics" ON recovery_analytics
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own recovery analytics" ON recovery_analytics
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_abandoned_carts_updated_at 
    BEFORE UPDATE ON abandoned_carts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_follow_up_flows_updated_at 
    BEFORE UPDATE ON follow_up_flows 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate recovery rate
CREATE OR REPLACE FUNCTION calculate_recovery_rate(
    start_date DATE,
    end_date DATE
)
RETURNS TABLE (
    total_abandoned BIGINT,
    total_recovered BIGINT,
    recovery_rate DECIMAL(5,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_abandoned,
        COUNT(*) FILTER (WHERE recovered = TRUE) as total_recovered,
        ROUND(
            (COUNT(*) FILTER (WHERE recovered = TRUE)::DECIMAL / COUNT(*)::DECIMAL) * 100, 
            2
        ) as recovery_rate
    FROM abandoned_carts
    WHERE abandoned_at::DATE BETWEEN start_date AND end_date;
END;
$$ LANGUAGE plpgsql;

-- Function to get top abandonment reasons
CREATE OR REPLACE FUNCTION get_top_abandonment_reasons(
    limit_count INTEGER DEFAULT 5
)
RETURNS TABLE (
    reason VARCHAR(500),
    count BIGINT,
    percentage DECIMAL(5,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        abandonment_reason as reason,
        COUNT(*) as count,
        ROUND(
            (COUNT(*)::DECIMAL / (SELECT COUNT(*) FROM abandoned_carts)::DECIMAL) * 100, 
            2
        ) as percentage
    FROM abandoned_carts
    WHERE abandonment_reason IS NOT NULL
    GROUP BY abandonment_reason
    ORDER BY count DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql; 