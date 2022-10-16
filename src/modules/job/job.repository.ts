import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CurrentUser } from 'src/global';
import { RETURN_AFTER } from 'src/global/constants';
import { JobDto } from './dtos/job.dto';

@Injectable()
export class JobRepository {
  constructor(@InjectModel('Job') private readonly jobModel: Model<JobDto>) {}

  async create(jobDto: JobDto, user: CurrentUser): Promise<JobDto> {
    const newJobModel = new this.jobModel({ ...jobDto, UserId: user.id });
    const job = await newJobModel.save();
    return job;
  }

  async getBytId(id: string): Promise<JobDto> {
    const job = await this.jobModel.findById(id).exec();
    return job;
  }

  async getAll(): Promise<Array<JobDto>> {
    const jobs = await this.jobModel.find();
    return jobs;
  }

  async update(id: string, jobDto: Partial<JobDto>): Promise<JobDto> {
    const updateJob = await this.jobModel.findByIdAndUpdate(id, jobDto, RETURN_AFTER);
    return updateJob;
  }

  async delete(id: string): Promise<JobDto> {
    const deleteJob = await this.jobModel.findByIdAndDelete(id);
    return deleteJob;
  }
}
