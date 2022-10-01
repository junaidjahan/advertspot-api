import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProposalController } from './proposal.controller';
import { ProposalRepository } from './proposal.repository';
import { ProposalService } from './proposal.service';
import { ProposalSchema } from './schemas/proposal.schema';

@Module({
  controllers: [ProposalController],
  providers: [ProposalService, ProposalRepository],
  exports: [ProposalService],
  imports: [
    MongooseModule.forFeature([{ name: 'Proposal', schema: ProposalSchema }]),
  ],
})
export class ProposalModule {}
