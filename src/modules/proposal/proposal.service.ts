import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { JobService } from '../job/job.service';
import { UserService } from '../user/user.service';
import { ProposalDto } from './dtos';
import { ProposalRepository } from './proposal.repository';

@Injectable()
export class ProposalService {
  constructor(
    private proposalRespository: ProposalRepository,
    private userService: UserService,
    private jobService: JobService
  ) {}

  async create(proposalDto: ProposalDto) {
    const prop = await this.proposalRespository.alreadyExist(proposalDto);
    console.log('prop', prop);

    if (prop.length) {
      throw new ConflictException('Proposal already sent against this Job.');
    }
    return this.proposalRespository.create(proposalDto);
  }

  async getById(id: string) {
    const proposal = await this.proposalRespository.getById(id);
    const user = await this.userService.findById(proposal.UserId);
    const job = await this.jobService.getById(proposal.JobId);
    return {
      proposal,
      user,
      job
    };
  }

  async getAllById(id: string) {
    const proposals = await this.proposalRespository.getAll(id);
    const users = await this.userService.getAll();
    const data = proposals
      .map(proposal => {
        return users
          .filter(user => {
            if (user.id === proposal.UserId) {
              return user;
            }
          })
          .map(userData => {
            return {
              proposal,
              user: userData
            };
          });
      })
      .flat();

    return data;
  }
}
