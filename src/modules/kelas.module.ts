import { Module } from '@nestjs/common';
import { SupabaseService } from '../services/supabase.service';
import { KelasController } from 'src/controllers/kelas.controller';
import { KelasService } from 'src/services/kelas.service';
import { AuthService } from 'src/utility/auth.service';

@Module({
  imports: [],
  controllers: [KelasController],
  providers: [KelasService, SupabaseService, AuthService],
})
export class KelasModule {}
