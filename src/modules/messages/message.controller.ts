import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessagesService } from './message.service';
import { MessageDto } from './dto/message.dto';
import { Body, Get, Param } from '@nestjs/common/decorators';

@ApiTags('Messages')
@Controller('message')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async message(@Body() data: MessageDto) {
    return this.messageService.CreateMessage(data);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async Messages(@Param('id') conversationId: string) {
    return this.messageService.getMessages(conversationId);
  }
}
