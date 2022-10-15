import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards';
import { JobModule } from './modules/job/job.module';
import { MediaModule } from './modules/media/media.module';
import { ProposalModule } from './modules/proposal/proposal.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://Junaid_Jahan:advertspot@cluster0.gisesie.mongodb.net/advertspot?retryWrites=true&w=majority'
    ),
    AuthModule,
    MediaModule,
    JobModule,
    ProposalModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
