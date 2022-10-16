import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FilterQuery, Model } from 'mongoose';

type Constructor<I> = new (...args: any[]) => I;
type Doc<T> = T & Document<string>;

export function BaseService<T>(entity: Constructor<T>) {
  class BaseServiceHost {
    @InjectModel(entity.name)
    readonly model: Model<T & Document<string>>;

    async findOneOrFail(filter: FilterQuery<Doc<T>>) {
      try {
        return this.model.findOne(filter);
      } catch {
        throw new NotFoundException('No data found.');
      }
    }
  }

  return BaseServiceHost;
}
