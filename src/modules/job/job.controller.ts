import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators';
import { AnyObject } from 'src/global';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDocument } from '../user/schemas/user.schema';
import { JobDto } from './dtos/job.dto';
import { JobService } from './job.service';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() job: JobDto, @CurrentUser() user: UserDocument, @Req() req: Express.Request) {
    job.UserId = user.id;
    return this.jobService.create(job);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Query() filterQuery: any) {
    const filter = JSON.parse(filterQuery.filter);
    return this.jobService.getAll(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-by-id/:id')
  async getById(@Param('id') id: string) {
    return this.jobService.getById(id);
  }

  @Get('cities')
  async getAllCities() {
    return this.jobService.getAllCities();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-jobs')
  async getJobsByUserId(@CurrentUser() user: UserDocument) {
    return this.jobService.getJobsByUserId(user.id);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: Partial<JobDto>) {
    return this.jobService.update(id, body);
  }
  @Put('update-status/:id')
  async updateStatus(@Param('id') id: string, @Body() body: Partial<JobDto>) {
    return this.jobService.updateStatus(id, body.Status);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.jobService.delete(id);
  }
}
