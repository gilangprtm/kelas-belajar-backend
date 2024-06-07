import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { KelasModule } from './modules/kelas.module';
import { SupabaseModule } from './modules/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAdminModule } from './modules/firebase-admin.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './utility/jwt.guard';
import { AuthModule } from './modules/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    KelasModule,
    SupabaseModule,
    FirebaseAdminModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
