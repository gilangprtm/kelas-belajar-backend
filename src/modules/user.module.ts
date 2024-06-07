import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { SupabaseService } from '../services/supabase.service';
import { AuthService } from 'src/utility/auth.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, SupabaseService, AuthService],
})
export class UserModule {}
