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

    const token = v4();

    await this.model.findByIdAndUpdate(verificationToken.id, {
      expires: addDays(new Date(), 1),
      token
    });

    return token;
  }

  async verifyToken(token: string, deleteToken = true) {
    const verificationToken = await this.model.findOne({ token });

    if (!verificationToken) {
      throw new NotFoundException(`Token doesn't exist.`);
    }

    deleteToken && (await verificationToken.delete());

    return verificationToken;
  }
}
