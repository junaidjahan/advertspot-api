import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VerificationToken, VerificationTokenSchema } from './verification-token.schema';
import { VerificationTokenService } from './verification-token.service';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: VerificationToken.name, schema: VerificationTokenSchema }])],
  exports: [VerificationTokenService],
  providers: [VerificationTokenService]
})
export class VerificationTokenModule {}
