import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenVerificationSchema } from './schemas/token-verification.schema';
import { TokenVerificationService } from './token-verification.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'TokenVerification', schema: TokenVerificationSchema }])],
  exports: [TokenVerificationService],

  providers: [TokenVerificationService]
})
export class TokenVerificationModule {}
