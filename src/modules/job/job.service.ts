import { Injectable } from '@nestjs/common';
import { JobStatus } from 'src/global';
import { UserDocument } from '../user/schemas/user.schema';
import { JobDto } from './dtos/job.dto';
import { JobRepository } from './job.repository';

@Injectable()
export class JobService {
  constructor(private jobRepository: JobRepository) {}

  async create(jobDto: JobDto) {
    return this.jobRepository.create(jobDto);
  }

  async getById(id: string) {
    return this.jobRepository.getBytId(id);
  }

  async getAll(user: UserDocument) {
    return this.jobRepository.getAll(user);
  }

  async update(id: string, jobDto: Partial<JobDto>) {
    return this.jobRepository.update(id, jobDto);
  }

  async delete(id: string) {
    return this.jobRepository.delete(id);
  }

  async updateStatus(id: string, status: JobStatus) {
    return this.jobRepository.update(id, { Status: status });
  }

  // async getJobsByUserId(userId: string) {
  //   const jobs = await this.jobRepository.getAll();

  //   return jobs.filter((job, index) => {
  //     return job.UserId === userId;
  //   });
  // }
}
