import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Get('update-status/:id')
  async updateStatus(@CurrentUser() user: UserDocument, @Param('id') id: string, @Query('status') status: string) {
    return await this.orderService.changeStatus(id, user.id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-order-count/:userType')
  async orderCount(@CurrentUser() user: UserDocument, @Param('userType') type: string) {
    return await this.orderService.orderCountByType(user.id, type);
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders-by-month/:userType')
  async orderByMonth(@CurrentUser() user: UserDocument, @Param('userType') type: string) {
    return await this.orderService.ordersPlacedByMonth(user.id, type);
  }
}
