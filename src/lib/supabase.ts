import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

export interface MemberRegistration {
  id?: string;
  full_name: string;
  whatsapp: string;
  email: string;
  county: string;
  created_at?: string;
}

export interface Event {
  id?: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  image?: string;
  category?: string;
  attendees?: string;
  featured?: boolean;
  created_at?: string;
}

