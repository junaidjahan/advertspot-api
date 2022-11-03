import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared';
import { Gig } from '../gig/schemas/gig.schema';
import { GigDto } from './dtos';
@Injectable()
export class GigService extends BaseService(Gig) {
  async create(gigDto: GigDto) {
    return this.model.create(gigDto);
  }
}
