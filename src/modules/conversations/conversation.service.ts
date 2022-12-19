import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnyObject } from 'src/global';
import { BaseService } from 'src/shared';
import { ConversationDto } from './dto/conversations.dto';
import { Conversation } from './schemas/conversation.schema';
@Injectable()
export class ConversationService extends BaseService(Conversation) {
  constructor() {
    super();
  }

  async getOrCreate(conversationDto: ConversationDto) {
    try{
      // let existing  = await this.model.findOne({
      //   people:{$all:[conversationDto.people[0],conversationDto.people[1]]
      // }).populate({

      // })

      let newConversation = await this.model.create(conversationDto);
      return newConversation;
    }
    catch(e){
      throw(e);
    }
  }

  // async getSellerGigs(id: string) {
  //   return this.model.find({ sellerId: id });
  // }

  // async getAll(filter: AnyObject) {
  //   const { pageNo, pageSize, title, category } = filter;
  //   const count = await this.model.find().count();
  //   const gigsDocuments = await this.model
  //     .find(category.length ? { category } : {})
  //     .skip(pageSize > 0 ? (pageNo - 1) * pageSize : 0)
  //     .limit(pageSize > 0 ? pageSize : count + 1);
  //   const users = await this.userService.getAll();
  //   const gigs = gigsDocuments.filter(gig => {
  //     return gig.title.includes(title);
  //   });

  //   const data = gigs
  //     .map(gig => {
  //       return users
  //         .filter(user => {
  //           if (user.id === gig.sellerId) {
  //             return user;
  //           }
  //         })
  //         .map(userData => {
  //           return {
  //             gig: gig,
  //             user: userData
  //           };
  //         });
  //     })
  //     .flat();
  //   return { data, count };
  // }

  // async getById(id: string) {
  //   const gig = await this.model.findById(id);
  //   const user = await this.userService.findByIdOrFail(gig.sellerId);
  //   return {
  //     gig,
  //     user
  //   };
  // }
}
