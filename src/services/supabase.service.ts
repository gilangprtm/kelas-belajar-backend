import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL or key is missing');
    }
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getSupabase(): SupabaseClient {
    return this.supabase;
  }

  async signInWithGoogle(): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw new Error(error.message);
    return data;
  }

  async verifyToken(token: string): Promise<any> {
    const { data, error } = await this.supabase.auth.getUser(token);
    if (error) throw new Error(error.message);
    return data;
  }
}
