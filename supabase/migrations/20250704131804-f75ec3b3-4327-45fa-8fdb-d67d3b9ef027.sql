-- Populate analytics_metrics with sample data for last 30 days
INSERT INTO analytics_metrics (metric_name, metric_type, metric_value, metric_date, metadata) VALUES
-- User metrics
('daily_active_users', 'user', 125, CURRENT_DATE, '{"source": "system"}'),
('daily_active_users', 'user', 142, CURRENT_DATE - INTERVAL '1 day', '{"source": "system"}'),
('daily_active_users', 'user', 118, CURRENT_DATE - INTERVAL '2 days', '{"source": "system"}'),
('daily_active_users', 'user', 156, CURRENT_DATE - INTERVAL '3 days', '{"source": "system"}'),
('daily_active_users', 'user', 134, CURRENT_DATE - INTERVAL '4 days', '{"source": "system"}'),
('daily_active_users', 'user', 167, CURRENT_DATE - INTERVAL '5 days', '{"source": "system"}'),
('daily_active_users', 'user', 145, CURRENT_DATE - INTERVAL '6 days', '{"source": "system"}'),

-- Revenue metrics
('daily_revenue', 'revenue', 450.50, CURRENT_DATE, '{"currency": "USD"}'),
('daily_revenue', 'revenue', 623.75, CURRENT_DATE - INTERVAL '1 day', '{"currency": "USD"}'),
('daily_revenue', 'revenue', 389.25, CURRENT_DATE - INTERVAL '2 days', '{"currency": "USD"}'),
('daily_revenue', 'revenue', 567.00, CURRENT_DATE - INTERVAL '3 days', '{"currency": "USD"}'),
('daily_revenue', 'revenue', 712.30, CURRENT_DATE - INTERVAL '4 days', '{"currency": "USD"}'),

-- Conversion metrics  
('conversion_rate', 'conversion', 12.5, CURRENT_DATE, '{"type": "questionnaire_to_roadmap"}'),
('conversion_rate', 'conversion', 15.2, CURRENT_DATE - INTERVAL '1 day', '{"type": "questionnaire_to_roadmap"}'),
('conversion_rate', 'conversion', 11.8, CURRENT_DATE - INTERVAL '2 days', '{"type": "questionnaire_to_roadmap"}'),
('conversion_rate', 'conversion', 14.6, CURRENT_DATE - INTERVAL '3 days', '{"type": "questionnaire_to_roadmap"}'),

-- Tool engagement metrics
('tool_views', 'engagement', 856, CURRENT_DATE, '{"category": "ai_tools"}'),
('tool_views', 'engagement', 923, CURRENT_DATE - INTERVAL '1 day', '{"category": "ai_tools"}'),
('tool_views', 'engagement', 745, CURRENT_DATE - INTERVAL '2 days', '{"category": "ai_tools"}'),
('tool_views', 'engagement', 1012, CURRENT_DATE - INTERVAL '3 days', '{"category": "ai_tools"}'),

-- Subscription metrics
('new_subscriptions', 'subscription', 8, CURRENT_DATE, '{"tier": "pro"}'),
('new_subscriptions', 'subscription', 12, CURRENT_DATE - INTERVAL '1 day', '{"tier": "pro"}'),
('new_subscriptions', 'subscription', 6, CURRENT_DATE - INTERVAL '2 days', '{"tier": "pro"}'),
('new_subscriptions', 'subscription', 15, CURRENT_DATE - INTERVAL '3 days', '{"tier": "pro"}'),

-- Template downloads
('template_downloads', 'content', 34, CURRENT_DATE, '{"type": "free"}'),
('template_downloads', 'content', 28, CURRENT_DATE - INTERVAL '1 day', '{"type": "free"}'),
('template_downloads', 'content', 42, CURRENT_DATE - INTERVAL '2 days', '{"type": "free"}'),
('template_downloads', 'content', 19, CURRENT_DATE - INTERVAL '3 days', '{"type": "free"}'),

-- Premium template purchases  
('premium_template_purchases', 'content', 7, CURRENT_DATE, '{"type": "premium"}'),
('premium_template_purchases', 'content', 11, CURRENT_DATE - INTERVAL '1 day', '{"type": "premium"}'),
('premium_template_purchases', 'content', 5, CURRENT_DATE - INTERVAL '2 days', '{"type": "premium"}'),
('premium_template_purchases', 'content', 9, CURRENT_DATE - INTERVAL '3 days', '{"type": "premium"}');