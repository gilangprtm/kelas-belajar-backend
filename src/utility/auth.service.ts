import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { User } from 'src/entity/user.entity';
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

  async getUser(email: string): Promise<User | null> {
    try {
      const { data, error } = await this.supabaseService
        .getSupabase()
        .from('muser')
        .select('*')
        .eq('email', email)
        .single();
      if (error) {
        if (error.code === 'PGRST116') {
          return null; // User not found
        } else {
          throw new Error(error.message);
        }
      }
      return data as User;
    } catch (error) {
      throw new Error('Failed to get user by email: ' + error.message);
    }
  }
}
