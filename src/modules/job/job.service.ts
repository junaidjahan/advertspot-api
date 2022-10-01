import { Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/common/dto';
import { CurrentUser } from 'src/common/models';
import { JobStatusType } from 'src/globals';
import { response } from 'src/globals/functions';
import { JobDto } from './dtos/job.dto';
import { JobRepository } from './job.repository';

@Injectable()
export class JobService {
  constructor(private jobRepository: JobRepository) {}

  async create(
    jobDto: JobDto,
    user: CurrentUser,
  ): Promise<ResponseDto<JobDto>> {
    const job = await this.jobRepository.create(jobDto, user);
    return response({
      message: 'Job created successfully.',
      data: job,
    });
  }

  async getById(id: string): Promise<ResponseDto<JobDto>> {
    const job = await this.jobRepository.getBytId(id);
    return response({
      data: job,
    });
  }

  async getAll(): Promise<ResponseDto<Array<JobDto>>> {
    const jobs = await this.jobRepository.getAll();
    return response({
      data: jobs,
    });
  }

  async update(
    id: string,
    jobDto: Partial<JobDto>,
  ): Promise<ResponseDto<JobDto>> {
    const updateJob = await this.jobRepository.update(id, jobDto);
    return response({
      message: 'Updated successfuly.',
      data: updateJob,
    });
  }

  async delete(id: string): Promise<ResponseDto<JobDto>> {
    const delegteJob = await this.jobRepository.delete(id);
    return response({
      message: 'Deleted successfully.',
      data: delegteJob,
    });
  }

  async updateStatus(
    id: string,
    status: JobStatusType,
  ): Promise<ResponseDto<JobDto>> {
    const job = await this.jobRepository.update(id, { Status: status });

    return response({
      message: 'Status updated successfully',
      data: job,
    });
  }

  async getJobsByUserId(userId: string) {
    const jobs = await this.jobRepository.getAll();

    const jobsByUserId = jobs.filter((job, index) => {
      return job.UserId === userId;
    });

    return response({
      message: 'All user jobs.',
      data: jobsByUserId,
    });
  }
}
