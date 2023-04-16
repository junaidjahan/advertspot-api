import { Injectable } from '@nestjs/common';
import { JobStatus } from 'src/global';
import { BaseService } from 'src/shared';
import { GigService } from '../gig/gig.service';
import { JobService } from '../job/job.service';
import { OrderDto } from './dtos';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrderService extends BaseService(Order) {
  constructor(private gigService: GigService, private jobService: JobService) {
    super();
  }

  async create(orderDto: OrderDto) {
    try {
      const order = await this.model.create(orderDto);
      if (order.jobId) {
        this.jobService.updateStatus(order.jobId, JobStatus.IN_PROGRESS);
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllBuyerOrders(id: String) {
    const allOrders = await this.model.find({ buyerId: id });
    const orders = allOrders.map(async order => {
      let orderObj = {};
      if (order.gigId) {
        const gigDoc = await this.gigService.findByIdOrFail(order.gigId);
        let gig = JSON.parse(JSON.stringify(gigDoc));
        gig['status'] = order.status;
        orderObj = gig;
      } else if (order.jobId) {
        const jobDoc = await this.jobService.getById(order.jobId);
        let job = JSON.parse(JSON.stringify(jobDoc));
        job['status'] = order.status;
        orderObj = job;
      }
      return orderObj;
    });
    return Promise.all(orders);
  }

  async getAllSellerOrders(id: String) {
    const allOrders = await this.model.find({ sellerId: id });
    const orders = allOrders.map(async order => {
      let orderObj = {};
      if (order.gigId) {
        const gigDoc = await this.gigService.findByIdOrFail(order.gigId);
        let gig = JSON.parse(JSON.stringify(gigDoc));
        gig['status'] = order.status;
        orderObj = gig;
      } else if (order.jobId) {
        const jobDoc = await this.jobService.getById(order.jobId);
        let job = JSON.parse(JSON.stringify(jobDoc));
        job['status'] = order.status;
        orderObj = job;
      }
      return orderObj;
    });
    return Promise.all(orders);
  }
}
