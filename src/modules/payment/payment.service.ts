import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentDto } from './dtos/payment.dto';

@Injectable()
export class PaymentService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KET, { apiVersion: '2022-11-15' });
  }

  createPayment(paymentRequestBody: PaymentDto): Promise<any> {
    return this.stripe.paymentIntents.create({
      amount: paymentRequestBody.Amount,
      currency: paymentRequestBody.Currency,
      automatic_payment_methods: {
        enabled: true
      }
    });
  }
}
