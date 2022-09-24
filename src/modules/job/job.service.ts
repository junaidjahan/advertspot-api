import { Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/common/dto';
import { CurrentUser } from 'src/common/models';
import { response } from 'src/globals/functions';
import { UserSessioDto } from '../auth/dto/user-session.dto';
import { JobDto } from './dtos/job.dto';
import { JobRepository } from './job.repository';

@Injectable()
export class JobService {
  constructor(private jobRepository: JobRepository) {}

  async create(
    jobDto: JobDto,
    user: CurrentUser,
  ): Promise<ResponseDto<JobDto>> {
    console.log('In serv', user);

    const job = await this.jobRepository.create(jobDto, user);
    return response({
      message: 'Job created successfully.',
      data: job,
    });
  }
}
