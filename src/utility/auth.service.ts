import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SupabaseService } from 'src/services/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}
  async validateToken(authHeader: string): Promise<any> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Bearer token not found');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const user = await this.getUser(decodedToken.email);
      return user;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUser(email: string): Promise<any> {
    const { data, error } = await this.supabaseService
      .getSupabase()
      .from('muser')
      .select('*')
      .eq('email', email)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
