import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { Conversation, ConversationSchema } from './schemas/conversation.schema';

@Module({
    controllers: [ConversationController],
    providers: [ConversationService],
    exports: [ConversationService],
    imports: [MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }])]
})
export class ConversationModule {}
