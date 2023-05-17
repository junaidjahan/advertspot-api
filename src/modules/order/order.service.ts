import { Injectable, NotFoundException } from '@nestjs/common';
import { JobStatus, OrderStatus, UserType } from 'src/global';
import { BaseService } from 'src/shared';
import { GigService } from '../gig/gig.service';
import { JobService } from '../job/job.service';
import { OrderDto } from './dtos';
import { Order } from './schemas/order.schema';
import OrdersModel from './types';
import { Gig } from '../gig/schemas/gig.schema';
import { JobSchema } from '../job/schemas/job.schema';
import mongoose from 'mongoose';
import { OrderByMonths } from './types/orders.contants';

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

  async getAllBuyerOrders(id: string) {
    const allOrders = await this.model.find({ buyerId: id });
    const orders = allOrders.map(async order => {
      let orderObj = new OrdersModel();
      if (order.gigId) {
        const gigDoc = await this.gigService.findByIdOrFail(order.gigId);
        let gig: Gig = JSON.parse(JSON.stringify(gigDoc));
        orderObj = {
          status: order.status,
          id: order.id,
          title: gig.title,
          description: gig.description,
          height: gig.height,
          width: gig.width,
          quantity: gig.quantity,
          amount: gig.price,
          proposals: null,
          userType: UserType.BUYER,
          orderEndMonth: order.orderEndMonth
        };
      } else if (order.jobId) {
        const jobDoc = await this.jobService.getById(order.jobId);
        let job = JSON.parse(JSON.stringify(jobDoc));
        orderObj = {
          status: order.status,
          id: order.id,
          title: job.Title,
          description: job.Description,
          height: job.Height,
          width: job.Width,
          quantity: job.Quantity,
          amount: job.Budget,
          proposals: job.Proposals,
          userType: UserType.BUYER,
          orderEndMonth: order.orderEndMonth
        };
      }
      return orderObj;
    });
    return Promise.all(orders);
  }

  async getAllSellerOrders(id: string) {
    const allOrders = await this.model.find({ sellerId: id });
    const orders = allOrders.map(async order => {
      let orderObj = {};
      if (order.gigId) {
        const gigDoc = await this.gigService.findByIdOrFail(order.gigId);
        let gig = JSON.parse(JSON.stringify(gigDoc));

        orderObj = {
          status: order.status,
          id: order.id,
          title: gig.title,
          description: gig.description,
          height: gig.height,
          width: gig.width,
          quantity: gig.quantity,
          amount: gig.price,
          proposals: null,
          userType: UserType.SELLER,
          orderEndMonth: order.orderEndMonth
        };
      } else if (order.jobId) {
        const jobDoc = await this.jobService.getById(order.jobId);
        let job = JSON.parse(JSON.stringify(jobDoc));

        orderObj = {
          status: order.status,
          id: order.id,
          title: job.Title,
          description: job.Description,
          height: job.Height,
          width: job.Width,
          quantity: job.Quantity,
          amount: job.Budget,
          proposals: job.Proposals,
          userType: UserType.SELLER,
          orderEndMonth: order.orderEndMonth
        };
      }
      return orderObj;
    });
    return Promise.all(orders);
  }

  async changeStatus(id: string, buyerId: string, status: string) {
    let order = await this.model.findById(id).exec();
    if (!order) {
      throw new NotFoundException('No data found.');
    }

    if (order.buyerId === buyerId) {
      await order.updateOne(
        {
          status: status,
          orderEndMonth: new Date().toLocaleString('default', { month: 'long' }),
          updatedAt: new Date()
        },
        { new: true }
      );
    }

    return order;
  }

  async orderCountByType(userId: string, type: string) {
    let ordersCount = {
      completed: 0,
      inProgress: 0,
      cancelled: 0
    };
    let orders =
      type === UserType.BUYER
        ? await this.model.find({ buyerId: userId })
        : await this.model.find({ sellerId: userId });
    if (!orders.length) {
      throw new NotFoundException('No data found.');
    }

    orders.forEach(order => {
      if (order.status === OrderStatus.CANCELLED) {
        ordersCount.cancelled += 1;
      } else if (order.status === OrderStatus.COMPLETED) {
        ordersCount.completed += 1;
      } else if (order.status === OrderStatus.IN_PROGRESS) {
        ordersCount.inProgress += 1;
      }
    });

    return [
      {
        name: 'Completed',
        value: ordersCount.completed
      },
      {
        name: 'In Progress',
        value: ordersCount.inProgress
      },
      {
        name: 'Cancelled',
        value: ordersCount.cancelled
      }
    ];
  }

  async ordersPlacedByMonth(userId: string, type: string) {
    let orders =
      type === UserType.BUYER
        ? await this.model.find({ buyerId: userId })
        : await this.model.find({ sellerId: userId });
    if (!orders.length) {
      return {};
    }

    const orderMonths: OrderByMonths = new OrderByMonths();
    const ordersByMonth = orders.map(order => {
      return {
        month: new Date(order.createdAt).toLocaleString('default', { month: 'short' }),
        amount: order.amount,
        buyerId: order.buyerId,
        sellerId: order.sellerId
      };
    });

    ordersByMonth.forEach(ord => {
      orderMonths[ord.month] += 1;
    });

    return orderMonths;
  }
  async amountSpentByMonth(userId: string, type: string) {
    let orders =
      type === UserType.BUYER
        ? await this.model.find({ buyerId: userId, status:OrderStatus.COMPLETED })
        : await this.model.find({ sellerId: userId,status:OrderStatus.COMPLETED  });
    if (!orders.length) {
      return {};
    }

    const orderMonths: OrderByMonths = new OrderByMonths();
    const ordersByMonth = orders.map(order => {
      return {
        month: new Date(order.createdAt).toLocaleString('default', { month: 'short' }),
        amount: order.amount,
        buyerId: order.buyerId,
        sellerId: order.sellerId
      };
    });

    ordersByMonth.forEach(ord => {
      orderMonths[ord.month] += parseInt(ord.amount)
    });

    return orderMonths;
  }
}
