import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: (configService: ConfigService) => {
        const serviceAccount = JSON.parse(
          configService.get<string>('FIREBASE_SERVICE_ACCOUNT'),
        );

        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: 'https://kelas-belajar-87d24.firebaseio.com',
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseAdminModule {}
