-- Team Manager Supabase Schema
-- Created: 2024-01-15
-- Purpose: Database schema for all Team Manager features

-- Conflicts Table
CREATE TABLE IF NOT EXISTS team_conflicts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member1_id UUID REFERENCES auth.users(id),
    member2_id UUID REFERENCES auth.users(id),
    member1_name TEXT NOT NULL,
    member2_name TEXT NOT NULL,
    conflict_type TEXT CHECK (conflict_type IN ('communication', 'workload', 'deadline', 'responsibility')),
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_interaction TIMESTAMP WITH TIME ZONE,
    message_count INTEGER DEFAULT 0,
    avg_response_time DECIMAL(5,2),
    tone_analysis JSONB,
    status TEXT CHECK (status IN ('active', 'resolved', 'escalated')) DEFAULT 'active',
    description TEXT,
    ai_recommendation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mood & Stress Tracking Table
CREATE TABLE IF NOT EXISTS team_mood_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    mood TEXT CHECK (mood IN ('😎', '😐', '😔')),
    stress_level INTEGER CHECK (stress_level >= 0 AND stress_level <= 100),
    energy_level INTEGER CHECK (energy_level >= 0 AND energy_level <= 100),
    productivity INTEGER CHECK (productivity >= 0 AND productivity <= 100),
    notes TEXT,
    ai_analysis TEXT,
    recommendations JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stress Alerts Table
CREATE TABLE IF NOT EXISTS team_stress_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    alert_type TEXT CHECK (alert_type IN ('stress', 'burnout', 'energy', 'productivity')),
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    message TEXT NOT NULL,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT CHECK (status IN ('active', 'acknowledged', 'resolved')) DEFAULT 'active',
    ai_recommendation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feedback Generator Table
CREATE TABLE IF NOT EXISTS team_feedbacks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    scheduled_for TIMESTAMP WITH TIME ZONE,
    status TEXT CHECK (status IN ('draft', 'scheduled', 'sent', 'delivered', 'read')) DEFAULT 'draft',
    feedback_type TEXT CHECK (feedback_type IN ('weekly', 'performance', 'improvement', 'recognition')),
    content TEXT NOT NULL,
    ai_generated BOOLEAN DEFAULT false,
    strengths JSONB,
    areas JSONB,
    recommendations JSONB,
    tone TEXT CHECK (tone IN ('positive', 'constructive', 'neutral')),
    priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning Goals Table
CREATE TABLE IF NOT EXISTS team_learning_goals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    skill TEXT NOT NULL,
    category TEXT CHECK (category IN ('technical', 'soft', 'leadership', 'business')),
    target_level TEXT CHECK (target_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    current_level TEXT CHECK (current_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    progress INTEGER CHECK (progress >= 0 AND progress <= 100) DEFAULT 0,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    target_date TIMESTAMP WITH TIME ZONE,
    status TEXT CHECK (status IN ('active', 'completed', 'paused')) DEFAULT 'active',
    weekly_hours INTEGER DEFAULT 3,
    total_hours INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning Resources Table
CREATE TABLE IF NOT EXISTS team_learning_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    goal_id UUID REFERENCES team_learning_goals(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    resource_type TEXT CHECK (resource_type IN ('course', 'book', 'video', 'article', 'workshop')),
    url TEXT,
    duration TEXT,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    recommended BOOLEAN DEFAULT false,
    completed BOOLEAN DEFAULT false,
    ai_recommended BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Task Reflection Log Table
CREATE TABLE IF NOT EXISTS team_reflection_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    task_name TEXT NOT NULL,
    task_type TEXT CHECK (task_type IN ('campaign', 'project', 'meeting', 'analysis', 'creative')),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reflection_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    what_went_well TEXT,
    what_could_improve TEXT,
    lessons_learned TEXT,
    ai_insights TEXT,
    team_learnings JSONB,
    impact TEXT CHECK (impact IN ('high', 'medium', 'low')),
    time_spent INTEGER DEFAULT 0,
    satisfaction INTEGER CHECK (satisfaction >= 1 AND satisfaction <= 10),
    status TEXT CHECK (status IN ('draft', 'submitted', 'reviewed', 'shared')) DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Decision Log System Table
CREATE TABLE IF NOT EXISTS team_decision_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    decision_title TEXT NOT NULL,
    decision_description TEXT,
    decision_type TEXT CHECK (decision_type IN ('strategic', 'operational', 'tactical')),
    expected_outcome TEXT,
    actual_outcome TEXT,
    decision_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    review_date TIMESTAMP WITH TIME ZONE,
    ai_analysis TEXT,
    impact_score INTEGER CHECK (impact_score >= 1 AND impact_score <= 10),
    status TEXT CHECK (status IN ('pending', 'implemented', 'reviewed', 'archived')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Highlights Board Table
CREATE TABLE IF NOT EXISTS team_highlights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    week_start_date DATE NOT NULL,
    top_performer_id UUID REFERENCES auth.users(id),
    top_performer_name TEXT NOT NULL,
    most_improved_id UUID REFERENCES auth.users(id),
    most_improved_name TEXT NOT NULL,
    most_valuable_task TEXT,
    most_valuable_task_member_id UUID REFERENCES auth.users(id),
    highlights_summary TEXT,
    ai_generated BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pulse Polls Table
CREATE TABLE IF NOT EXISTS team_pulse_polls (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    poll_question TEXT NOT NULL,
    poll_type TEXT CHECK (poll_type IN ('morale', 'alignment', 'satisfaction', 'stress')),
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    status TEXT CHECK (status IN ('active', 'closed', 'analyzed')) DEFAULT 'active',
    ai_generated BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pulse Poll Responses Table
CREATE TABLE IF NOT EXISTS team_pulse_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    poll_id UUID REFERENCES team_pulse_polls(id) ON DELETE CASCADE,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    response_value INTEGER CHECK (response_value >= 1 AND response_value <= 10),
    response_text TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Focus Mode Table
CREATE TABLE IF NOT EXISTS team_focus_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    task_description TEXT,
    productivity_score INTEGER CHECK (productivity_score >= 1 AND productivity_score <= 10),
    interruptions INTEGER DEFAULT 0,
    status TEXT CHECK (status IN ('active', 'completed', 'interrupted')) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Distraction Tracker Table
CREATE TABLE IF NOT EXISTS team_distraction_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    slow_replies_count INTEGER DEFAULT 0,
    task_switches_count INTEGER DEFAULT 0,
    focus_time_minutes INTEGER DEFAULT 0,
    productivity_score INTEGER CHECK (productivity_score >= 1 AND productivity_score <= 10),
    ai_analysis TEXT,
    recommendations JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Role Matching Table
CREATE TABLE IF NOT EXISTS team_role_matches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    task_type TEXT NOT NULL,
    task_description TEXT,
    recommended_member_id UUID REFERENCES auth.users(id),
    recommended_member_name TEXT NOT NULL,
    confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    reasoning TEXT,
    ai_generated BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Motivation Drivers Table
CREATE TABLE IF NOT EXISTS team_motivation_drivers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    driver_type TEXT CHECK (driver_type IN ('recognition', 'freedom', 'money', 'challenge', 'purpose', 'growth')),
    importance_score INTEGER CHECK (importance_score >= 1 AND importance_score <= 10),
    satisfaction_score INTEGER CHECK (satisfaction_score >= 1 AND satisfaction_score <= 10),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mentorship Matches Table
CREATE TABLE IF NOT EXISTS team_mentorship_matches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mentor_id UUID REFERENCES auth.users(id),
    mentor_name TEXT NOT NULL,
    mentee_id UUID REFERENCES auth.users(id),
    mentee_name TEXT NOT NULL,
    skill_area TEXT NOT NULL,
    match_reason TEXT,
    confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    status TEXT CHECK (status IN ('suggested', 'accepted', 'active', 'completed')) DEFAULT 'suggested',
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    ai_generated BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leadership Lens Table
CREATE TABLE IF NOT EXISTS team_leadership_insights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    insight_type TEXT CHECK (insight_type IN ('underused', 'potential_lead', 'bottleneck', 'high_performer')),
    insight_description TEXT,
    recommendation TEXT,
    priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    ai_generated BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Burnout Radar Table
CREATE TABLE IF NOT EXISTS team_burnout_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    risk_factors JSONB,
    risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
    predicted_burnout_date DATE,
    alert_message TEXT,
    recommendations JSONB,
    status TEXT CHECK (status IN ('active', 'acknowledged', 'resolved')) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Anonymous Feedback Table
CREATE TABLE IF NOT EXISTS team_anonymous_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    about_member_id UUID REFERENCES auth.users(id),
    about_member_name TEXT NOT NULL,
    feedback_content TEXT NOT NULL,
    feedback_type TEXT CHECK (feedback_type IN ('positive', 'constructive', 'concern')),
    ai_filtered_content TEXT,
    tone_analysis JSONB,
    status TEXT CHECK (status IN ('submitted', 'reviewed', 'actioned')) DEFAULT 'submitted',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Smart Suggestions Table
CREATE TABLE IF NOT EXISTS team_ai_suggestions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    trigger_event TEXT NOT NULL,
    suggestion_type TEXT CHECK (suggestion_type IN ('check_in', 'reward', 'support', 'training', 'delegation')),
    suggestion_content TEXT NOT NULL,
    priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT CHECK (status IN ('pending', 'implemented', 'dismissed')) DEFAULT 'pending',
    ai_confidence DECIMAL(3,2) CHECK (ai_confidence >= 0 AND ai_confidence <= 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Micro Sprint Mode Table
CREATE TABLE IF NOT EXISTS team_micro_sprints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    sprint_title TEXT NOT NULL,
    task_description TEXT,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER DEFAULT 120,
    productivity_score INTEGER CHECK (productivity_score >= 1 AND productivity_score <= 10),
    completion_rate DECIMAL(3,2) CHECK (completion_rate >= 0 AND completion_rate <= 1),
    motivation_level INTEGER CHECK (motivation_level >= 1 AND motivation_level <= 10),
    status TEXT CHECK (status IN ('active', 'completed', 'interrupted')) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Private Vault Table
CREATE TABLE IF NOT EXISTS team_private_vault (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    vault_type TEXT CHECK (vault_type IN ('notes', 'files', 'drafts', 'feedback')),
    title TEXT NOT NULL,
    content TEXT,
    file_url TEXT,
    encrypted BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- External Sync Table
CREATE TABLE IF NOT EXISTS team_external_sync (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    platform TEXT CHECK (platform IN ('google_calendar', 'notion', 'zoom', 'slack', 'trello')),
    sync_status TEXT CHECK (sync_status IN ('connected', 'syncing', 'error', 'disconnected')) DEFAULT 'disconnected',
    last_sync_at TIMESTAMP WITH TIME ZONE,
    sync_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance & Activity Table
CREATE TABLE IF NOT EXISTS team_attendance_activity (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    online_time_minutes INTEGER DEFAULT 0,
    meeting_attendance_count INTEGER DEFAULT 0,
    activity_score INTEGER CHECK (activity_score >= 0 AND activity_score <= 100),
    heatmap_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Weekly Mood Check Table
CREATE TABLE IF NOT EXISTS team_weekly_mood (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    week_start_date DATE NOT NULL,
    mood_score INTEGER CHECK (mood_score >= 1 AND mood_score <= 10),
    stress_level INTEGER CHECK (stress_level >= 0 AND stress_level <= 100),
    energy_level INTEGER CHECK (energy_level >= 0 AND energy_level <= 100),
    notes TEXT,
    ai_analysis TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workload Balancer Table
CREATE TABLE IF NOT EXISTS team_workload_analysis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    task_load INTEGER CHECK (task_load >= 0 AND task_load <= 100),
    deadline_pressure INTEGER CHECK (deadline_pressure >= 0 AND deadline_pressure <= 100),
    workload_score INTEGER CHECK (workload_score >= 0 AND workload_score <= 100),
    recommendations JSONB,
    ai_analysis TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROI Tracker Table
CREATE TABLE IF NOT EXISTS team_roi_tracking (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    month_year TEXT NOT NULL,
    salary DECIMAL(10,2),
    tool_costs DECIMAL(10,2),
    revenue_impact DECIMAL(10,2),
    roi_multiplier DECIMAL(5,2),
    performance_metrics JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Involvement Matrix Table
CREATE TABLE IF NOT EXISTS team_project_involvement (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES auth.users(id),
    member_name TEXT NOT NULL,
    project_name TEXT NOT NULL,
    involvement_level TEXT CHECK (involvement_level IN ('lead', 'contributor', 'supporter', 'observer')),
    contribution_percentage INTEGER CHECK (contribution_percentage >= 0 AND contribution_percentage <= 100),
    skills_utilized JSONB,
    performance_rating INTEGER CHECK (performance_rating >= 1 AND performance_rating <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_team_conflicts_member1_id ON team_conflicts(member1_id);
CREATE INDEX IF NOT EXISTS idx_team_conflicts_status ON team_conflicts(status);
CREATE INDEX IF NOT EXISTS idx_team_mood_data_member_id ON team_mood_data(member_id);
CREATE INDEX IF NOT EXISTS idx_team_mood_data_date ON team_mood_data(date);
CREATE INDEX IF NOT EXISTS idx_team_feedbacks_member_id ON team_feedbacks(member_id);
CREATE INDEX IF NOT EXISTS idx_team_feedbacks_status ON team_feedbacks(status);
CREATE INDEX IF NOT EXISTS idx_team_learning_goals_member_id ON team_learning_goals(member_id);
CREATE INDEX IF NOT EXISTS idx_team_learning_goals_status ON team_learning_goals(status);
CREATE INDEX IF NOT EXISTS idx_team_reflection_logs_member_id ON team_reflection_logs(member_id);
CREATE INDEX IF NOT EXISTS idx_team_focus_sessions_member_id ON team_focus_sessions(member_id);
CREATE INDEX IF NOT EXISTS idx_team_focus_sessions_status ON team_focus_sessions(status);

-- Create RLS (Row Level Security) policies
ALTER TABLE team_conflicts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_mood_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_stress_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_learning_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_learning_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_reflection_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_decision_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_pulse_polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_pulse_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_distraction_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_role_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_motivation_drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_mentorship_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_leadership_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_burnout_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_anonymous_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_ai_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_micro_sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_private_vault ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_external_sync ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_attendance_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_weekly_mood ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_workload_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_roi_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_project_involvement ENABLE ROW LEVEL SECURITY;

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_team_conflicts_updated_at BEFORE UPDATE ON team_conflicts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_stress_alerts_updated_at BEFORE UPDATE ON team_stress_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_feedbacks_updated_at BEFORE UPDATE ON team_feedbacks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_learning_goals_updated_at BEFORE UPDATE ON team_learning_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_reflection_logs_updated_at BEFORE UPDATE ON team_reflection_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_decision_logs_updated_at BEFORE UPDATE ON team_decision_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_burnout_alerts_updated_at BEFORE UPDATE ON team_burnout_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_private_vault_updated_at BEFORE UPDATE ON team_private_vault FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_external_sync_updated_at BEFORE UPDATE ON team_external_sync FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_project_involvement_updated_at BEFORE UPDATE ON team_project_involvement FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 