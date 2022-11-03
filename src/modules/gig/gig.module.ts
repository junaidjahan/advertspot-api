import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GigController } from './gig.controller';
import { GigService } from './gig.service';
import { Gig, GigSchema } from './schemas/gig.schema';

@Module({
  controllers: [GigController],
  providers: [GigService],
  exports: [GigService],
  imports: [MongooseModule.forFeature([{ name: Gig.name, schema: GigSchema }])]
})
export class GigModule {}
