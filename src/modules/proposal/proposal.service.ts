import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { ProposalDto } from './dtos';
import { ProposalRepository } from './proposal.repository';

@Injectable()
export class ProposalService {
  constructor(private proposalRespository: ProposalRepository) {}

  async create(proposalDto: ProposalDto) {
    const prop = this.proposalRespository.getById(proposalDto.JobId);
    if (prop) {
      throw new ConflictException('Proposal already sent against this Job.');
    }
    return this.proposalRespository.create(proposalDto);
  }
}
