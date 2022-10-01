import { Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/common/dto';
import { response } from 'src/globals/functions';
import { ProposalDto } from './dtos';
import { ProposalRepository } from './proposal.repository';

@Injectable()
export class ProposalService {
  constructor(private proposalRespository: ProposalRepository) {}

  async create(proposalDto: ProposalDto): Promise<ResponseDto<ProposalDto>> {
    const proposal = await this.proposalRespository.create(proposalDto);
    return response({
      message: 'Proposal created successfully.',
      data: proposal,
    });
  }
}
