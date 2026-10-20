-- ============================================================================
-- BLOSSOM PSYCHOTHERAPY & WELLNESS - SUPABASE DATABASE SCHEMA
-- Client: Shaanthini Jayaprakash (blossomtherapy06@gmail.com)
-- ============================================================================

-- 1. Create Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_code TEXT,
    client_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    concern TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'Tamil',
    session_mode TEXT NOT NULL DEFAULT 'Video Call',
    booking_date DATE NOT NULL,
    slot_time TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Confirmed',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Corporate Wellness Leads Table
CREATE TABLE IF NOT EXISTS public.corporate_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    employee_count TEXT,
    notes TEXT,
    status TEXT DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Self-Assessment Screeners Table (PHQ-9 / GAD-7)
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_type TEXT NOT NULL,
    client_name TEXT,
    phone TEXT,
    score INTEGER NOT NULL,
    severity TEXT NOT NULL,
    recommendation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures safe public insertion from frontend and secure administration
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corporate_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public can insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Public can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Public can update bookings" ON public.bookings;

DROP POLICY IF EXISTS "Public can insert corporate leads" ON public.corporate_leads;
DROP POLICY IF EXISTS "Public can view corporate leads" ON public.corporate_leads;

DROP POLICY IF EXISTS "Public can insert assessments" ON public.assessments;
DROP POLICY IF EXISTS "Public can view assessments" ON public.assessments;

-- Bookings Policies
CREATE POLICY "Public can insert bookings" 
ON public.bookings FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can view bookings" 
ON public.bookings FOR SELECT 
USING (true);

CREATE POLICY "Public can update bookings" 
ON public.bookings FOR UPDATE 
USING (true);

-- Corporate Leads Policies
CREATE POLICY "Public can insert corporate leads" 
ON public.corporate_leads FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can view corporate leads" 
ON public.corporate_leads FOR SELECT 
USING (true);

-- Assessment Policies
CREATE POLICY "Public can insert assessments" 
ON public.assessments FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can view assessments" 
ON public.assessments FOR SELECT 
USING (true);

-- Create index for quick searches and date filtering
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON public.bookings(created_at DESC);
