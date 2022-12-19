import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  @Get('get-conversations/:id')
  async getConversations(@Param('id') id: string) {
    return "your id is "+id;
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-conversation')
  async getConversation(@Body() data:ConversationDto) {
    return this.conversationService.getOrCreate(data);
  }
}
