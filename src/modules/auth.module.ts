import { Module } from '@nestjs/common';
import { SupabaseService } from 'src/services/supabase.service';
import { AuthService } from 'src/utility/auth.service';
import { SupabaseModule } from './supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [],
  providers: [AuthService, SupabaseService],
  exports: [AuthService],
})
export class AuthModule {}
