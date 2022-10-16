import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { addDays } from 'date-fns';
import { Model } from 'mongoose';
import { VerificationTokenRelationType, VerificationTokenType } from 'src/global';
import { v4 } from 'uuid';
import { VerificationToken } from './verification-token.schema';

@Injectable()
export class VerificationTokenService {
  constructor(
    @InjectModel(VerificationToken.name)
    private readonly verificationTokenModel: Model<VerificationToken>
  ) {}

  async generateToken(options: {
    type: VerificationTokenType;
    relationId: string;
    relationType: VerificationTokenRelationType;
  }) {
    let verificationToken = await this.verificationTokenModel.findOne(options);

    if (!verificationToken) {
      verificationToken = await this.verificationTokenModel.create(options);
    }

    return verificationToken.update({ $set: { ...verificationToken, expires: addDays(new Date(), 1), token: v4() } });
  }

  async verifyToken(Token: string, deleteToken = true) {
    const token = await this.verificationTokenModel.findOne({ Token });

    if (!token) {
      throw new NotFoundException(`Token doesn't exist.`);
    }
    if (deleteToken) {
      await token.delete();
    }

    return token;
  }
}
