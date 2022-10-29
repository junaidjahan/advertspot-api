import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators';
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
  async create(@Body() job: JobDto, @CurrentUser() user: UserDocument) {
    job.UserId = user.id;
    return this.jobService.create(job);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@CurrentUser() user: UserDocument) {
    return this.jobService.getAll(user);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.jobService.getById(id);
  }

  // @Get('user-jobs/:id')
  // async getJobsByUserId(@Param('id') id: string) {
  //   return this.jobService.getJobsByUserId(id);
  // }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<JobDto>) {
    return this.jobService.update(id, body);
  }
  @Put('update-status/:id')
  async updateStatus(@Param('id') id: string, @Body() body: Partial<JobDto>) {
    return this.jobService.updateStatus(id, body.Status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.jobService.delete(id);
  }
}
