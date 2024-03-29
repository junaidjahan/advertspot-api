import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { ConversationModule } from './modules/conversations/conversation.module';
import { GigModule } from './modules/gig/gig.module';
import { JobModule } from './modules/job/job.module';
import { MailModule } from './modules/mail/mail.module';
import { MediaModule } from './modules/media/media.module';
import { MessagesModule } from './modules/messages/message.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ProposalModule } from './modules/proposal/proposal.module';
import { UserModule } from './modules/user/user.module';
import { VerificationTokenModule } from './modules/verification-token/verification-token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    MailModule,
    VerificationTokenModule,
    UserModule,
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_STRING),
    MediaModule,
    JobModule,
    ProposalModule,
    GigModule,
    ConversationModule,
    MessagesModule,
    PaymentModule,
    OrderModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
