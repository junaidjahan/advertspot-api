import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://Junaid_Jahan:advertspot@cluster0.gisesie.mongodb.net/advertspot?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
