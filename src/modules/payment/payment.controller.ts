import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaymentDto } from './dtos/payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  createPayments(@Res() response: Response, @Body() paymentRequestBody: PaymentDto) {
    this.paymentService
      .createPayment(paymentRequestBody)
      .then(res => {
        response.status(HttpStatus.CREATED).json(res);
      })
      .catch(err => {
        response.status(HttpStatus.BAD_REQUEST).json(err);
      });
  }
}
