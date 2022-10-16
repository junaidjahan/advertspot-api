import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/decorators';
import { CurrentUser } from 'src/global';
import { ProposalDto } from './dtos';
import { ProposalService } from './proposal.service';

@ApiTags('Proposal')
@Controller('proposal')
export class ProposalController {
  constructor(private proposalSrv: ProposalService) {}

  @Post()
  async create(@Body() proposal: ProposalDto, @GetCurrentUser() user: CurrentUser) {
    proposal.UserId = user.id;
    return this.proposalSrv.create(proposal);
  }
}
