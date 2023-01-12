import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDocument } from '../user/schemas/user.schema';
import { GigDto } from './dtos';
import { GigService } from './gig.service';

@ApiTags('Gig')
@Controller('gig')
export class GigController {
  constructor(private gigService: GigService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() gig: GigDto, @CurrentUser() user: UserDocument) {
    gig.sellerId = user.id;
    return this.gigService.create(gig);
  }

  @UseGuards(JwtAuthGuard)
  @Get('seller-gigs')
  async getSellerGigs(@CurrentUser() user: UserDocument) {
    return this.gigService.getSellerGigs(user.id);
  }

  @Get()
  async getAll(@Query() filterQuery: any) {
    const filter = JSON.parse(filterQuery.filter);
    return this.gigService.getAll(filter);
  }

  @Get('get-by-id/:id')
  async getById(@Param('id') id: string) {
    return this.gigService.getById(id);
  }

  @Get('get-by-sellerId/:id')
  async getBySellerId(@Param('id') id: string, @Query() filterQuery: any) {
    return this.gigService.getBySellerId(id, filterQuery);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // async getAll(@CurrentUser() user: UserDocument) {
  //   return this.jobService.getAll(user);
  // }

  // @Get(':id')
  // async getById(@Param('id') id: string) {
  //   return this.jobService.getById(id);
  // }

  // @Get('user-jobs/:id')
  // async getJobsByUserId(@Param('id') id: string) {
  //   return this.jobService.getJobsByUserId(id);
  // }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() body: Partial<JobDto>) {
  //   return this.jobService.update(id, body);
  // }
  // @Put('update-status/:id')
  // async updateStatus(@Param('id') id: string, @Body() body: Partial<JobDto>) {
  //   return this.jobService.updateStatus(id, body.Status);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.jobService.delete(id);
  // }
}
