import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: Order | undefined;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrderDetails();
  }

  fetchOrderDetails(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('authToken');
    if (orderId && token) {
      this.orderService.getOrderById(+orderId, token).subscribe({
        next: (order) => {
          this.order = order;
        },
        error: (err) => {
          console.error('Failed to fetch order details', err);
        }
      });
    }
  }
}
