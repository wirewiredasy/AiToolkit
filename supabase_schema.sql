-- Supabase Database Schema for Suntyn AI Platform
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
    credits_remaining INTEGER DEFAULT 100,
    total_tools_used INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tool usage tracking
CREATE TABLE public.tool_usage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    tool_id TEXT NOT NULL,
    tool_category TEXT NOT NULL CHECK (tool_category IN ('pdf', 'image', 'media', 'government', 'developer')),
    processing_time INTEGER, -- in milliseconds
    success BOOLEAN DEFAULT true,
    file_size INTEGER, -- in bytes
    input_format TEXT,
    output_format TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User files management
CREATE TABLE public.user_files (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    cloudinary_public_id TEXT,
    cloudinary_url TEXT,
    tool_id TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'processing', 'completed', 'expired', 'deleted')),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 hour'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tool favorites
CREATE TABLE public.user_favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    tool_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, tool_id)
);

-- Usage statistics
CREATE TABLE public.usage_statistics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tool_id TEXT NOT NULL,
    total_uses INTEGER DEFAULT 0,
    successful_uses INTEGER DEFAULT 0,
    average_processing_time INTEGER DEFAULT 0,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(tool_id, date)
);

-- API keys and integrations
CREATE TABLE public.user_integrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    service_name TEXT NOT NULL CHECK (service_name IN ('cloudinary', 'openai', 'elevenlabs', 'replicate')),
    api_key_encrypted TEXT,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, service_name)
);

-- Storage buckets (create these in Supabase Storage)
-- 1. 'user-uploads' - for temporary file uploads
-- 2. 'processed-files' - for processed outputs
-- 3. 'user-avatars' - for profile pictures

-- Row Level Security (RLS) Policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_integrations ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policies for tool_usage
CREATE POLICY "Users can view own tool usage" ON public.tool_usage
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tool usage" ON public.tool_usage
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for user_files
CREATE POLICY "Users can view own files" ON public.user_files
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own files" ON public.user_files
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own files" ON public.user_files
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own files" ON public.user_files
    FOR DELETE USING (auth.uid() = user_id);

-- Policies for user_favorites
CREATE POLICY "Users can manage own favorites" ON public.user_favorites
    FOR ALL USING (auth.uid() = user_id);

-- Policies for user_integrations
CREATE POLICY "Users can manage own integrations" ON public.user_integrations
    FOR ALL USING (auth.uid() = user_id);

-- Functions and triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update user statistics
CREATE OR REPLACE FUNCTION public.update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update user profile with tool usage count
    UPDATE public.user_profiles 
    SET 
        total_tools_used = total_tools_used + 1,
        credits_remaining = GREATEST(credits_remaining - 1, 0),
        updated_at = NOW()
    WHERE id = NEW.user_id;
    
    -- Update daily statistics
    INSERT INTO public.usage_statistics (tool_id, total_uses, successful_uses)
    VALUES (NEW.tool_id, 1, CASE WHEN NEW.success THEN 1 ELSE 0 END)
    ON CONFLICT (tool_id, date) 
    DO UPDATE SET 
        total_uses = usage_statistics.total_uses + 1,
        successful_uses = usage_statistics.successful_uses + CASE WHEN NEW.success THEN 1 ELSE 0 END;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update statistics on tool usage
CREATE TRIGGER on_tool_usage_insert
    AFTER INSERT ON public.tool_usage
    FOR EACH ROW EXECUTE FUNCTION public.update_user_stats();

-- Function to clean up expired files
CREATE OR REPLACE FUNCTION public.cleanup_expired_files()
RETURNS void AS $$
BEGIN
    -- Mark expired files for deletion
    UPDATE public.user_files 
    SET status = 'expired'
    WHERE expires_at < NOW() AND status = 'active';
    
    -- Actual file deletion should be handled by a cron job or background process
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX idx_tool_usage_user_id ON public.tool_usage(user_id);
CREATE INDEX idx_tool_usage_tool_id ON public.tool_usage(tool_id);
CREATE INDEX idx_tool_usage_created_at ON public.tool_usage(created_at);
CREATE INDEX idx_user_files_user_id ON public.user_files(user_id);
CREATE INDEX idx_user_files_expires_at ON public.user_files(expires_at);
CREATE INDEX idx_user_files_status ON public.user_files(status);
CREATE INDEX idx_usage_statistics_tool_id ON public.usage_statistics(tool_id);
CREATE INDEX idx_usage_statistics_date ON public.usage_statistics(date);

-- Insert initial data
INSERT INTO public.usage_statistics (tool_id, total_uses, successful_uses, date)
SELECT 
    unnest(ARRAY[
        'pdf-merger', 'pdf-splitter', 'image-resizer', 'bg-remover', 
        'vocal-remover', 'audio-converter', 'json-formatter', 'qr-generator',
        'pan-validator', 'gst-validator', 'video-converter', 'image-converter'
    ]) as tool_id,
    0 as total_uses,
    0 as successful_uses,
    CURRENT_DATE as date
ON CONFLICT (tool_id, date) DO NOTHING;