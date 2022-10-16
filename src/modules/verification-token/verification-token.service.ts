import { Injectable, NotFoundException } from '@nestjs/common';
import { addDays } from 'date-fns';
import { VerificationTokenRelationType, VerificationTokenType } from 'src/global';
import { BaseService } from 'src/shared';
import { v4 } from 'uuid';
import { VerificationToken } from './verification-token.schema';

@Injectable()
export class VerificationTokenService extends BaseService(VerificationToken) {
  async generateToken(options: {
    type: VerificationTokenType;
    relationId: string;
    relationType: VerificationTokenRelationType;
  }) {
    let verificationToken = await this.model.findOne(options);

    if (!verificationToken) {
      verificationToken = await this.model.create(options);
    }

    return this.model.findByIdAndUpdate(verificationToken.id, {
      ...verificationToken,
      expires: addDays(new Date(), 1),
      token: v4()
    });
  }

  async verifyToken(Token: string, deleteToken = true) {
    const token = await this.model.findOne({ Token });

    if (!token) {
      throw new NotFoundException(`Token doesn't exist.`);
    }
    if (deleteToken) {
      await token.delete();
    }

    return token;
  }
}
