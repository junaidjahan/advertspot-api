import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnyObject } from 'src/global';
import { BaseService } from 'src/shared';
import { Gig } from '../gig/schemas/gig.schema';
import { UserDocument } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { GigDto } from './dtos';
@Injectable()
export class GigService extends BaseService(Gig) {
  constructor(private userService: UserService) {
    super();
  }

  async create(gigDto: GigDto) {
    return this.model.create(gigDto);
  }

  async getSellerGigs(id: string) {
    return this.model.find({ sellerId: id });
  }

  async getAll(filter: AnyObject) {
    const { pageNo, pageSize, title, category } = filter;
    const count = await this.model.find().count();
    const gigs = await this.model
      .find(category.length ? { Type: category } : {})
      .skip(pageSize > 0 ? (pageNo - 1) * pageSize : 0)
      .limit(pageSize > 0 ? pageSize : count + 1);
    const users = await this.userService.getAll();
    const data = gigs
      .map(gig => {
        return users
          .filter(user => {
            if (user.id === gig.sellerId) {
              return user;
            }
          })
          .map(userData => {
            return {
              gig: gig,
              user: userData
            };
          });
      })
      .flat();
    return { data, count };
  }
}
