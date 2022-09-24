import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  exports: [UserService, UserRepository],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
