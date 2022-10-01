import { Body, Controller, Post } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { CurrentUser } from 'src/common/models';
import { ProposalDto } from './dtos';
import { ProposalService } from './proposal.service';

@Controller('proposal')
export class ProposalController {
  constructor(private proposalSrv: ProposalService) {}

  @Post()
  async create(
    @Body() proposal: ProposalDto,
    @GetCurrentUser() user: CurrentUser,
  ) {
    proposal.UserId = user.id;
    return this.proposalSrv.create(proposal);
  }
}
