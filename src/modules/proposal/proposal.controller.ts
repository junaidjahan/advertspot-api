import { Body, Controller, Get, Param, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators';
import { UserType } from 'src/global';
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
  @UseGuards(JwtAuthGuard)
  @Get('proposals-by-id/:id')
  async getAll(@CurrentUser() user: UserDocument, @Param('id') id: string) {
    if (!user.userTypes.includes(UserType.BUYER)) {
      throw new UnauthorizedException('You are not authorized for current request.');
    }
    return this.proposalSrv.getAllById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('get-by-id/:id')
  async getById(@CurrentUser() user: UserDocument, @Param('id') id: string) {
    if (!user.userTypes.includes(UserType.BUYER)) {
      throw new UnauthorizedException('You are not authorized for current request.');
    }
    return this.proposalSrv.getById(id);
  }
}
