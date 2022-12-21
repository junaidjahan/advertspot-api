import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exception } from 'handlebars';
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
    try {
      let existing = await this.model
        .find({
          people: {
            $all: [conversationDto.people[0], conversationDto.people[1]]
          }
        })
        .populate({
          path: 'people',
          model: 'User',
          select: ['firstName', 'lastName', 'email']
        });

      if (existing.length!=0) {
        console.log("existing",existing);
        return {data:existing,message:"fetched"};
      }

      let newConversation = await(await this.model.create(conversationDto)).populate({
        path: 'people',
        model: 'User',
        select: ['firstName', 'lastName', 'email']
      });;
      return {data:[newConversation],message:"created"};


    } catch (e) {
      throw e;
    }
  }

  async getConversations(userId:string){
    try{
      let rooms = await this.model
        .find({
          people: { $all: [userId] }
        })
        .populate({
          path: 'people',
          model: 'User',
          select: ['firstName', 'lastName', 'email']
        });;
        if(rooms.length>0){
          return { data: rooms, message: 'fetched' };
        }
        return { data: rooms, message: 'Not Found' };
        
    }
    catch (e){
      throw e;
    }
    
  }

  
}
