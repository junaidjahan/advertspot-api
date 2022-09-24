import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CurrentUser } from 'src/common/models';
import { JobDto } from './dtos/job.dto';

@Injectable()
export class JobRepository {
  constructor(@InjectModel('Job') private readonly jobModel: Model<JobDto>) {}

  async create(jobDto: JobDto, user: CurrentUser): Promise<JobDto> {
    console.log('UserId', user);

    const newJobModel = new this.jobModel({ ...jobDto, UserId: user.id });
    const job = await newJobModel.save();
    return job;
  }
}
