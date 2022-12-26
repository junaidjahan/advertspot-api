import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDocument } from '../user/schemas/user.schema';
import { ConversationService } from './conversation.service';
import { ConversationDto } from './dto/conversations.dto';

@ApiTags('Conversation')
@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-conversations')
  async getConversations(@CurrentUser() currentUser) {
    return this.conversationService.getConversations(currentUser._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('get-conversation')
  async getConversation(@Body() data:ConversationDto,@CurrentUser() user) {
    data.people[1] = user._id;
    if(data.people[0] == data.people[1]){
      return {data:"error",message:'conversation not created due to same sender and receiver id'}
    }
    return this.conversationService.getOrCreate(data);
  }
}
