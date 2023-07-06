import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GigModule } from '../gig/gig.module';
import { JobModule } from '../job/job.module';
import { UserModule } from '../user/user.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schemas/order.schema';
import { Review, ReviewSchema } from './schemas/review.schema';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }, {name:Review.name, schema:ReviewSchema}]), UserModule, GigModule, JobModule]
})
export class OrderModule {}
