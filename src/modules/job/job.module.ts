import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobController } from './job.controller';
import { JobRepository } from './job.repository';
import { JobService } from './job.service';
import { CitiesSchema } from './schemas/cities.schema';
import { JobSchema } from './schemas/job.schema';

@Module({
  controllers: [JobController],
  providers: [JobService, JobRepository],
  exports: [JobService],
  imports: [
    MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }]),
    MongooseModule.forFeature([{ name: 'Cities', schema: CitiesSchema }])
  ]
})
export class JobModule {}
