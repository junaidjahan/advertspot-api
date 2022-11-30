import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { GigController } from './gig.controller';
import { GigService } from './gig.service';
import { Gig, GigSchema } from './schemas/gig.schema';

@Module({
  controllers: [GigController],
  providers: [GigService],
  exports: [GigService],
  imports: [MongooseModule.forFeature([{ name: Gig.name, schema: GigSchema }]), UserModule]
})
export class GigModule {}
