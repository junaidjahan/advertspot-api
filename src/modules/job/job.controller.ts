import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators';
import { UserDocument } from '../user/schemas/user.schema';
import { JobDto } from './dtos/job.dto';
import { JobService } from './job.service';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post()
  async create(@Body() job: JobDto, @CurrentUser() user: UserDocument) {
    return this.jobService.create(job, user);
  }

  @Get()
  async getAll() {
    return this.jobService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.jobService.getById(id);
  }

  @Get('user-jobs/:id')
  async getJobsByUserId(@Param('id') id: string) {
    return this.jobService.getJobsByUserId(id);
  }

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
