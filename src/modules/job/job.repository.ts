import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnyObject } from 'src/global';
import { RETURN_AFTER } from 'src/global/constants';
import { UserDocument } from '../user/schemas/user.schema';
import { CitiesDto } from './dtos/cities.dto';
import { JobDto } from './dtos/job.dto';

@Injectable()
export class JobRepository {
  constructor(
    @InjectModel('Job') private readonly jobModel: Model<JobDto>,
    @InjectModel('Cities') private readonly citiesModel: Model<CitiesDto>
  ) {}

  async create(jobDto: JobDto): Promise<JobDto> {
    const newJobModel = new this.jobModel({ ...jobDto });
    const job = await newJobModel.save();
    return job;
  }

  async getBytId(id: string): Promise<JobDto> {
    const job = await this.jobModel.findById(id).exec();
    if (!job) throw new NotFoundException('Job not found!');
    return job;
  }

  async getByUserId(id: string): Promise<JobDto[]> {
    const job = await this.jobModel.find({ UserId: id }).sort({_id:-1}).exec();
    return job;
  }

  async getAll(filter: AnyObject) {
    const { pageNo, pageSize, title, category } = filter;
    const count = await this.jobModel.find().count();
    const jobsDucuments = await this.jobModel
      .find(category.length ? { Type: category } : {})
      .skip(pageSize > 0 ? (pageNo - 1) * pageSize : 0)
      .limit(pageSize > 0 ? pageSize : count + 1)
      .sort({_id:-1})
    const jobs = jobsDucuments.filter(job => {
      return job.Title.includes(title);
    });

    return { jobs, count };
  }

  async update(id: string, jobDto: Partial<JobDto>): Promise<JobDto> {
    const updateJob = await this.jobModel.findByIdAndUpdate(id, jobDto, RETURN_AFTER);
    return updateJob;
  }

  async incrementProposal(id: string) {
    const job = await this.getBytId(id);
    job.Proposals += 1;
    const updatedJob = await this.jobModel.findByIdAndUpdate(id, job);
    return updatedJob;
  }

  async delete(id: string): Promise<JobDto> {
    const deleteJob = await this.jobModel.findByIdAndDelete(id);
    return deleteJob;
  }

  async getAllCities() {
    const cities = await this.citiesModel.find();
    return cities;
  }
}
