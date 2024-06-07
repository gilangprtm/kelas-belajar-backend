import { Module } from '@nestjs/common';
import { SupabaseService } from '../services/supabase.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
