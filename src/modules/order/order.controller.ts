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

  // @UseGuards(JwtAuthGuard)
  // @Get('seller-gigs')
  // async getSellerGigs(@CurrentUser() user: UserDocument) {
  //   return this.gigService.getSellerGigs(user.id);
  // }

  // @Get()
  // async getAll(@Query() filterQuery: any) {
  //   const filter = JSON.parse(filterQuery.filter);
  //   return this.gigService.getAll(filter);
  // }

  // @Get('get-by-id/:id')
  // async getById(@Param('id') id: string) {
  //   return this.gigService.getById(id);
  // }

  // @Get('get-by-sellerId/:id')
  // async getBySellerId(@Param('id') id: string, @Query() filterQuery: any) {
  //   return this.gigService.getBySellerId(id, filterQuery);
  // }
}
