import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { Database } from '../types/database';

type UserProfile = Database['public']['Tables']['users']['Row'];
type UsersInsert = Database['public']['Tables']['users']['Insert'];
type UsersUpdate = Database['public']['Tables']['users']['Update'];

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        ensureProfileExists(session.user).finally(() => fetchProfile(session.user!.id));
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await ensureProfileExists(session.user);
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user ID:', userId);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        throw error;
      }
      
      console.log('Profile data:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const ensureProfileExists = async (authedUser: User) => {
    try {
      const { data: rows, error } = await supabase
        .from('users')
        .select('id')
        .eq('id', authedUser.id)
        .limit(1);

      if (error) return;
      if (rows && rows.length > 0) return;

      const metadata = authedUser.user_metadata || {};
      const payload: UsersInsert = {
        id: authedUser.id,
        email: authedUser.email || '',
        full_name: String(metadata.full_name || ''),
        phone: metadata.phone ? String(metadata.phone) : null,
        gender: (metadata.gender as any) || 'other',
        date_of_birth: metadata.date_of_birth ? String(metadata.date_of_birth) : null,
        role: (metadata.role as any) || 'passenger',
      };

      await (supabase as any).from('users').insert(payload);
    } catch (_e) {
      // best-effort; ignore to avoid blocking auth flow
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('Attempting to sign in with:', email);
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Sign in error details:', error);
      throw error;
    }
    
    console.log('Sign in successful:', data);
  };

  const signUp = async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email: String(email || '').trim(),
      password: String(password || '').trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          full_name: String(userData.full_name || ''),
          phone: String(userData.phone || ''),
          gender: String(userData.gender || ''),
          date_of_birth: String(userData.date_of_birth || ''),
          role: String(userData.role || 'passenger'),
        },
      },
    });

    if (error) throw error;

    // Only insert profile if a session exists (avoids RLS failure when email confirmation is required)
    if (data.user && data.session) {
      const insertPayload: UsersInsert = {
        id: data.user.id,
        email: String(email || ''),
        full_name: String(userData.full_name || ''),
        phone: userData.phone ? String(userData.phone) : null,
        gender: (userData.gender as any) || 'other',
        date_of_birth: userData.date_of_birth ? String(userData.date_of_birth) : null,
        role: (userData.role as any) || 'passenger',
      };
      const { error: profileError } = await (supabase as any).from('users').insert(insertPayload);

      if (profileError) throw profileError;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    // Ensure local state is cleared immediately
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    // Add updated_at timestamp
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Profile update error:', error);
      throw error;
    }

    // Update local profile state with the returned data
    if (data) {
      setProfile(data);
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
