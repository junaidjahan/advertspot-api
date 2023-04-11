import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared';
import { OrderDto } from './dtos';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrderService extends BaseService(Order) {
  constructor() {
    super();
  }

  async create(orderDto: OrderDto) {
    try {
      return this.model.create(orderDto);
    } catch (error) {
      throw error;
    }
  }
}
