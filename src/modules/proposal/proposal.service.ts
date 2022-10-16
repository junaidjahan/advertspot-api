import { Injectable } from '@nestjs/common';
import { ProposalDto } from './dtos';
import { ProposalRepository } from './proposal.repository';

@Injectable()
export class ProposalService {
  constructor(private proposalRespository: ProposalRepository) {}

  async create(proposalDto: ProposalDto) {
    return this.proposalRespository.create(proposalDto);
  }
}
