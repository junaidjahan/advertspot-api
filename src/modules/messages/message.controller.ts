import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessagesService } from './message.service';

@ApiTags('Messages')
@Controller('message')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post()
  async message() {
    return this.messageService.trigger('chat', 'message', {});
  }
}
