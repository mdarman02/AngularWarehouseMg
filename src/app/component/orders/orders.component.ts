import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/model/order.model';
import { OrderItem } from 'src/app/model/orderItem.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  selectedOrderItems: OrderItem[] = [];

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }else{
    this.loadOrders();
    }
  }

  loadOrders(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.orderService.getOrders(0, 10, token).subscribe({
        next: (response: { content: Order[], totalElements: number }) => {
          this.orders = response.content;
          this.orders.forEach(order => {
            order.totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
          });
        },


        

        error: (err: any) => {
          this.toastr.error('Failed to load orders');
        }
      });
    }
  }

  viewOrderDetails(orderId: number): void {
    // const order = this.orders.find(o => o.id === orderId);
    // if (order) {
    //   this.selectedOrderItems = order.items;
    // }
    this.router.navigate(['/orders', orderId]);
  }

  createNewOrder(): void {
    // Logic to navigate to create order page
    this.router.navigate(['/create-order']);
  }

  onOrderCreated(): void {
    this.loadOrders(); // Reload orders after a new order is created
  }
}