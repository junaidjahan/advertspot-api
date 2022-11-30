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
    const proposal = this.proposalModel.findById(id);
    return proposal;
  }
}
