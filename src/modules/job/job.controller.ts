import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { CurrentUser } from 'src/common/models';
import { UserSessioDto } from '../auth/dto';
import { JobDto } from './dtos/job.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post()
  async create(@Body() job: JobDto, @GetCurrentUser() user: CurrentUser) {
    console.log('Current', user);

    return this.jobService.create(job, user);
  }
}
