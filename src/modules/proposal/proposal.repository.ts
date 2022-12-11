import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProposalDto } from './dtos';

@Injectable()
export class ProposalRepository {
  constructor(@InjectModel('Proposal') private readonly proposalModel: Model<ProposalDto>) {}

  async create(proposalDto: ProposalDto): Promise<ProposalDto> {
    const newProposalModel = new this.proposalModel(proposalDto);
    const proposal = await newProposalModel.save();
    return proposal;
  }

  async getById(id: string) {
    const proposal = await this.proposalModel.findById(id);
    return proposal;
  }

  async alreadyExist({ JobId, UserId }: ProposalDto) {
    console.log('Job', JobId);
    console.log('User', UserId);

    const proposal = await this.proposalModel.find({ JobId, UserId });
    return proposal;
  }

  async getAll(id: string) {
    const proposals = await this.proposalModel.find({ JobId: id.toString() });
    console.log('Prop', proposals);

    return proposals;
  }
}
