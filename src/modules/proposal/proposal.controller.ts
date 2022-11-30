import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDocument } from '../user/schemas/user.schema';
import { ProposalDto } from './dtos';
import { ProposalService } from './proposal.service';

@ApiTags('Proposal')
@Controller('proposal')
export class ProposalController {
  constructor(private proposalSrv: ProposalService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() proposal: ProposalDto, @CurrentUser() user: UserDocument) {
    proposal.UserId = user.id;
    return this.proposalSrv.create(proposal);
  }
}
