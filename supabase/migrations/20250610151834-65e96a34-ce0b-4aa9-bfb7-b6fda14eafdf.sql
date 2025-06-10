
-- Fix security warnings by setting search_path for all functions
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$function$;

CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  SELECT role FROM public.user_roles WHERE user_id = _user_id ORDER BY created_at DESC LIMIT 1;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user_role()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_template_rating()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
  UPDATE public.roadmap_templates 
  SET 
    rating = (
      SELECT COALESCE(AVG(rating::numeric), 0)::decimal(2,1)
      FROM public.template_reviews 
      WHERE template_id = COALESCE(NEW.template_id, OLD.template_id)
    ),
    reviews_count = (
      SELECT COUNT(*)
      FROM public.template_reviews 
      WHERE template_id = COALESCE(NEW.template_id, OLD.template_id)
    ),
    updated_at = now()
  WHERE id = COALESCE(NEW.template_id, OLD.template_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

CREATE OR REPLACE FUNCTION public.increment_template_downloads()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
  UPDATE public.roadmap_templates 
  SET downloads_count = downloads_count + 1,
      updated_at = now()
  WHERE id = NEW.template_id;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user_referral_code()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  new_code TEXT;
BEGIN
  LOOP
    new_code := generate_referral_code();
    BEGIN
      INSERT INTO public.referral_codes (user_id, code)
      VALUES (NEW.id, new_code);
      EXIT;
    EXCEPTION WHEN unique_violation THEN
      -- Code already exists, try again
      NULL;
    END;
  END LOOP;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_referral_code()
 RETURNS text
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::INTEGER, 1);
  END LOOP;
  RETURN result;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_user_stats()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  INSERT INTO public.user_stats (user_id, total_roadmaps, last_activity)
  VALUES (NEW.user_id, 1, now())
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    total_roadmaps = user_stats.total_roadmaps + 1,
    last_activity = now(),
    updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_review_helpful_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.is_helpful = true THEN
    UPDATE public.tool_reviews 
    SET helpful_count = helpful_count + 1 
    WHERE id = NEW.review_id;
  ELSIF TG_OP = 'DELETE' AND OLD.is_helpful = true THEN
    UPDATE public.tool_reviews 
    SET helpful_count = helpful_count - 1 
    WHERE id = OLD.review_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.is_helpful = true AND NEW.is_helpful = false THEN
      UPDATE public.tool_reviews 
      SET helpful_count = helpful_count - 1 
      WHERE id = NEW.review_id;
    ELSIF OLD.is_helpful = false AND NEW.is_helpful = true THEN
      UPDATE public.tool_reviews 
      SET helpful_count = helpful_count + 1 
      WHERE id = NEW.review_id;
    END IF;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$function$;
