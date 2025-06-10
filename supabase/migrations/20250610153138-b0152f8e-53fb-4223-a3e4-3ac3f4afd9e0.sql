
-- Fix RLS error by enabling Row Level Security on analytics_metrics table
ALTER TABLE public.analytics_metrics ENABLE ROW LEVEL SECURITY;

-- Create policy for analytics_metrics (since this is analytics data, we'll allow admins to see all and users to see their own data if user_id exists)
CREATE POLICY "Admin users can view all analytics metrics" 
  ON public.analytics_metrics 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Allow system/service level inserts for analytics (no user context needed)
CREATE POLICY "Allow system inserts for analytics metrics" 
  ON public.analytics_metrics 
  FOR INSERT 
  WITH CHECK (true);

-- Allow system updates for analytics
CREATE POLICY "Allow system updates for analytics metrics" 
  ON public.analytics_metrics 
  FOR UPDATE 
  USING (true);
