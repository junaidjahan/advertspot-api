import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VerificationTokenType } from 'src/globals';
import { TokenVerificationModel } from './models/token-verification.model';
import { v4 } from 'uuid';

@Injectable()
export class TokenVerificationService {
  constructor(
    @InjectModel('TokenVerification')
    private readonly verificationTokenRepo: Model<TokenVerificationModel>
  ) {}

  async generateToken(Type: VerificationTokenType, UserId: string) {
    let token = await this.verificationTokenRepo.findOne({
      UserId,
      Type
    });

    if (!token) {
      token = await this.verificationTokenRepo.create({
        UserId,
        Type,
        Token: v4()
      });
    }

    return token;
  }

  async verifyToken(Token: string, deleteToken = true) {
    const token = await this.verificationTokenRepo.findOne({ Token });

    if (!token) {
      throw new NotFoundException(`Token doesn't exist.`);
    }
    if (deleteToken) {
      await this.verificationTokenRepo.deleteOne({ Token });
    }

    return token;
  }

  //   async deleteToken(id: string) {
  //     return this.verificationTokenRepo.delete(id);
  //   }
}
