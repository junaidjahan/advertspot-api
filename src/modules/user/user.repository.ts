import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './models/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
  ) {}

  async create(userData: UserModel) {
    const userExist = await this.userModel.findOne({ Email: userData.Email });
    if (userExist) return 'User already exist';

    const newUserModel = new this.userModel(userData);
    const user = await newUserModel.save();
    return user;
  }

  async find(email: string) {
    const user = await this.userModel.find({ Email: email });
    return user;
  }
}
