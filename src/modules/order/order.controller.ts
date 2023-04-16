import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDocument } from '../user/schemas/user.schema';
import { OrderDto } from './dtos';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() order: OrderDto) {
    return this.orderService.create(order);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all-buyer-orders')
  async getAllBuyerOrders(@CurrentUser() user: UserDocument) {
    return this.orderService.getAllBuyerOrders(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all-seller-orders')
  async getAllSellerOrders(@CurrentUser() user: UserDocument) {
    return this.orderService.getAllSellerOrders(user.id);
  }
}
