-- Recovery Log and Analytics Tables

-- Table for storing detailed recovery logs
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
    channel_performance JSONB, -- Store channel-specific metrics
    ai_generated BOOLEAN DEFAULT FALSE,
    ai_confidence DECIMAL(3,2), -- 0.00 to 1.00
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing recovery campaign analytics
CREATE TABLE IF NOT EXISTS recovery_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    campaign_type VARCHAR(50) NOT NULL, -- abandoned_cart, win_back, seasonal
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    target_audience JSONB, -- Criteria for targeting
    message_template TEXT,
    offer_template VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing campaign performance
CREATE TABLE IF NOT EXISTS campaign_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES recovery_campaigns(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    messages_sent INTEGER DEFAULT 0,
    messages_delivered INTEGER DEFAULT 0,
    messages_opened INTEGER DEFAULT 0,
    messages_clicked INTEGER DEFAULT 0,
    messages_replied INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    revenue_generated DECIMAL(10,2) DEFAULT 0,
    cost_per_message DECIMAL(5,2),
    roi DECIMAL(5,2), -- Return on investment percentage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing customer segments
CREATE TABLE IF NOT EXISTS customer_segments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    criteria JSONB NOT NULL, -- Segment criteria
    customer_count INTEGER DEFAULT 0,
    avg_cart_value DECIMAL(10,2),
    avg_lifetime_value DECIMAL(10,2),
    recovery_rate DECIMAL(5,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing A/B test results
CREATE TABLE IF NOT EXISTS ab_test_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_name VARCHAR(255) NOT NULL,
    variant_a JSONB NOT NULL, -- Control variant
    variant_b JSONB NOT NULL, -- Test variant
    start_date DATE NOT NULL,
    end_date DATE,
    total_participants INTEGER DEFAULT 0,
    variant_a_participants INTEGER DEFAULT 0,
    variant_b_participants INTEGER DEFAULT 0,
    variant_a_conversions INTEGER DEFAULT 0,
    variant_b_conversions INTEGER DEFAULT 0,
    variant_a_revenue DECIMAL(10,2) DEFAULT 0,
    variant_b_revenue DECIMAL(10,2) DEFAULT 0,
    confidence_level DECIMAL(3,2), -- Statistical confidence
    winner VARCHAR(10), -- A, B, or null if inconclusive
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing recovery automation rules
CREATE TABLE IF NOT EXISTS recovery_automation_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    trigger_conditions JSONB NOT NULL, -- When to trigger
    action_type VARCHAR(50) NOT NULL, -- send_message, apply_offer, etc.
    action_config JSONB NOT NULL, -- How to execute
    priority INTEGER DEFAULT 0, -- Higher number = higher priority
    is_active BOOLEAN DEFAULT TRUE,
    execution_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing recovery insights
CREATE TABLE IF NOT EXISTS recovery_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    insight_type VARCHAR(50) NOT NULL, -- pattern, trend, recommendation
    title VARCHAR(255) NOT NULL,
    description TEXT,
    data_points JSONB, -- Supporting data
    confidence_level DECIMAL(3,2),
    impact_score INTEGER, -- 1-10 scale
    is_actionable BOOLEAN DEFAULT TRUE,
    action_taken BOOLEAN DEFAULT FALSE,
    action_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing recovery templates
CREATE TABLE IF NOT EXISTS recovery_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    template_type VARCHAR(50) NOT NULL, -- email, whatsapp, sms
    subject VARCHAR(255), -- For emails
    content TEXT NOT NULL,
    variables JSONB, -- Template variables
    category VARCHAR(50), -- reminder, offer, assistance, etc.
    performance_score DECIMAL(3,2), -- Average performance
    usage_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recovery_log_cart_id ON recovery_log(cart_id);
CREATE INDEX IF NOT EXISTS idx_recovery_log_sent_at ON recovery_log(sent_at);
CREATE INDEX IF NOT EXISTS idx_recovery_log_status ON recovery_log(status);
CREATE INDEX IF NOT EXISTS idx_recovery_log_message_type ON recovery_log(message_type);
CREATE INDEX IF NOT EXISTS idx_campaign_performance_campaign_id ON campaign_performance(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_performance_date ON campaign_performance(date);
CREATE INDEX IF NOT EXISTS idx_ab_test_results_test_name ON ab_test_results(test_name);
CREATE INDEX IF NOT EXISTS idx_ab_test_results_is_completed ON ab_test_results(is_completed);
CREATE INDEX IF NOT EXISTS idx_automation_rules_priority ON recovery_automation_rules(priority);
CREATE INDEX IF NOT EXISTS idx_automation_rules_is_active ON recovery_automation_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_recovery_insights_insight_type ON recovery_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_recovery_insights_impact_score ON recovery_insights(impact_score);
CREATE INDEX IF NOT EXISTS idx_recovery_templates_template_type ON recovery_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_recovery_templates_category ON recovery_templates(category);

-- Row Level Security (RLS) Policies
ALTER TABLE recovery_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for recovery_log
CREATE POLICY "Users can view their own recovery logs" ON recovery_log
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own recovery logs" ON recovery_log
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own recovery logs" ON recovery_log
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for recovery_campaigns
CREATE POLICY "Users can view their own campaigns" ON recovery_campaigns
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own campaigns" ON recovery_campaigns
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own campaigns" ON recovery_campaigns
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for campaign_performance
CREATE POLICY "Users can view their own campaign performance" ON campaign_performance
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own campaign performance" ON campaign_performance
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for customer_segments
CREATE POLICY "Users can view their own customer segments" ON customer_segments
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own customer segments" ON customer_segments
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own customer segments" ON customer_segments
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for ab_test_results
CREATE POLICY "Users can view their own A/B test results" ON ab_test_results
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own A/B test results" ON ab_test_results
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own A/B test results" ON ab_test_results
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for recovery_automation_rules
CREATE POLICY "Users can view their own automation rules" ON recovery_automation_rules
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own automation rules" ON recovery_automation_rules
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own automation rules" ON recovery_automation_rules
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for recovery_insights
CREATE POLICY "Users can view their own recovery insights" ON recovery_insights
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own recovery insights" ON recovery_insights
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own recovery insights" ON recovery_insights
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for recovery_templates
CREATE POLICY "Users can view their own recovery templates" ON recovery_templates
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own recovery templates" ON recovery_templates
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own recovery templates" ON recovery_templates
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Functions for analytics and insights

-- Function to calculate campaign ROI
CREATE OR REPLACE FUNCTION calculate_campaign_roi(
    campaign_id UUID,
    start_date DATE,
    end_date DATE
)
RETURNS TABLE (
    total_cost DECIMAL(10,2),
    total_revenue DECIMAL(10,2),
    roi_percentage DECIMAL(5,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(SUM(cp.cost_per_message * cp.messages_sent), 0) as total_cost,
        COALESCE(SUM(cp.revenue_generated), 0) as total_revenue,
        CASE 
            WHEN COALESCE(SUM(cp.cost_per_message * cp.messages_sent), 0) > 0 
            THEN ROUND(
                ((COALESCE(SUM(cp.revenue_generated), 0) - COALESCE(SUM(cp.cost_per_message * cp.messages_sent), 0)) / 
                COALESCE(SUM(cp.cost_per_message * cp.messages_sent), 0)) * 100, 
                2
            )
            ELSE 0
        END as roi_percentage
    FROM campaign_performance cp
    WHERE cp.campaign_id = calculate_campaign_roi.campaign_id
    AND cp.date BETWEEN start_date AND end_date;
END;
$$ LANGUAGE plpgsql;

-- Function to get top performing templates
CREATE OR REPLACE FUNCTION get_top_performing_templates(
    limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
    template_name VARCHAR(255),
    template_type VARCHAR(50),
    category VARCHAR(50),
    performance_score DECIMAL(3,2),
    usage_count INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        rt.name as template_name,
        rt.template_type,
        rt.category,
        rt.performance_score,
        rt.usage_count
    FROM recovery_templates rt
    WHERE rt.is_active = TRUE
    ORDER BY rt.performance_score DESC, rt.usage_count DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get recovery insights
CREATE OR REPLACE FUNCTION get_recovery_insights(
    days_back INTEGER DEFAULT 30
)
RETURNS TABLE (
    insight_type VARCHAR(50),
    title VARCHAR(255),
    description TEXT,
    impact_score INTEGER,
    is_actionable BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ri.insight_type,
        ri.title,
        ri.description,
        ri.impact_score,
        ri.is_actionable
    FROM recovery_insights ri
    WHERE ri.created_at >= NOW() - INTERVAL '1 day' * days_back
    ORDER BY ri.impact_score DESC, ri.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate conversion rates by channel
CREATE OR REPLACE FUNCTION get_channel_conversion_rates(
    start_date DATE,
    end_date DATE
)
RETURNS TABLE (
    channel VARCHAR(20),
    messages_sent BIGINT,
    messages_delivered BIGINT,
    messages_opened BIGINT,
    messages_clicked BIGINT,
    conversions BIGINT,
    delivery_rate DECIMAL(5,2),
    open_rate DECIMAL(5,2),
    click_rate DECIMAL(5,2),
    conversion_rate DECIMAL(5,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        rl.message_type as channel,
        COUNT(*) as messages_sent,
        COUNT(*) FILTER (WHERE rl.status IN ('delivered', 'opened', 'clicked', 'replied')) as messages_delivered,
        COUNT(*) FILTER (WHERE rl.status IN ('opened', 'clicked', 'replied')) as messages_opened,
        COUNT(*) FILTER (WHERE rl.status IN ('clicked', 'replied')) as messages_clicked,
        COUNT(*) FILTER (WHERE rl.status = 'replied') as conversions,
        ROUND(
            (COUNT(*) FILTER (WHERE rl.status IN ('delivered', 'opened', 'clicked', 'replied'))::DECIMAL / COUNT(*)::DECIMAL) * 100, 
            2
        ) as delivery_rate,
        ROUND(
            (COUNT(*) FILTER (WHERE rl.status IN ('opened', 'clicked', 'replied'))::DECIMAL / 
             COUNT(*) FILTER (WHERE rl.status IN ('delivered', 'opened', 'clicked', 'replied'))::DECIMAL) * 100, 
            2
        ) as open_rate,
        ROUND(
            (COUNT(*) FILTER (WHERE rl.status IN ('clicked', 'replied'))::DECIMAL / 
             COUNT(*) FILTER (WHERE rl.status IN ('delivered', 'opened', 'clicked', 'replied'))::DECIMAL) * 100, 
            2
        ) as click_rate,
        ROUND(
            (COUNT(*) FILTER (WHERE rl.status = 'replied')::DECIMAL / 
             COUNT(*) FILTER (WHERE rl.status IN ('delivered', 'opened', 'clicked', 'replied'))::DECIMAL) * 100, 
            2
        ) as conversion_rate
    FROM recovery_log rl
    WHERE rl.sent_at::DATE BETWEEN start_date AND end_date
    GROUP BY rl.message_type
    ORDER BY conversion_rate DESC;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_recovery_campaigns_updated_at 
    BEFORE UPDATE ON recovery_campaigns 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ab_test_results_updated_at 
    BEFORE UPDATE ON ab_test_results 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recovery_automation_rules_updated_at 
    BEFORE UPDATE ON recovery_automation_rules 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recovery_insights_updated_at 
    BEFORE UPDATE ON recovery_insights 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recovery_templates_updated_at 
    BEFORE UPDATE ON recovery_templates 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 