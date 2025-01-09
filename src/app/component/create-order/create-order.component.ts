import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product.model';
import { OrderItemDto } from 'src/app/model/orderItem.model';
import { OrderDto } from 'src/app/model/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  products: Product[] = [];
  orderItems: OrderItemDto[] = [];
  notes: string = '';
  totalAmount: number = 0;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }else{
    this.loadProducts();
    }
  }

  loadProducts(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.productService.getAllProducts(0, 100, token).subscribe({
        next: (response) => {
          this.products = response.content;
        },
        error: (err) => {
          this.toastr.error('Failed to load products');
        }
      });
    }
  }

  addOrderItem(productId: number, quantity: number): void {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      if (product.currentStock < quantity) {
        this.toastr.error('Insufficient stock for product: ' + product.name);
        return;
      }
      const orderItem: OrderItemDto = {
        productId: product.id,
        quantity: quantity,
        unitPrice: product.price
      };
      this.orderItems.push(orderItem);
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.orderItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  }

  createOrder(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const order: OrderDto = {
        totalAmount: this.totalAmount,
        status: 'PENDING',
        notes: this.notes,
        items: this.orderItems
      };
      this.orderService.createOrder(order, token).subscribe({
        next: () => {
          this.toastr.success('Order created successfully');
          this.reduceStock();
          // Navigate to orders page or reset form
        },
        error: (err) => {
          this.toastr.error('Failed to create order');
        }
      });
    }
  }

  reduceStock(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.orderItems.forEach(item => {
        const product = this.products.find(p => p.id === item.productId);
        if (product) {
          product.currentStock -= item.quantity;
          this.productService.updateProductStock(product.id, product.currentStock, token).subscribe({
            next: () => {
              // Stock updated successfully
            },
            error: (err) => {
              this.toastr.error('Failed to update stock for product: ' + product.name);
            }
          });
        }
      });
    }
  }

  addOrderItemAndCreateOrder(productId: number, quantity: number): void {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      if (product.currentStock < quantity) {
        this.toastr.error('Insufficient stock for product: ' + product.name);
        return;
      }
      const orderItem: OrderItemDto = {
        productId: product.id,
        quantity: quantity,
        unitPrice: product.price
      };
      this.orderItems.push(orderItem);
      this.calculateTotalAmount();
      this.createOrder();
    }
  }
  getProductById(productId: number): Product | undefined {
    return this.products.find(p => p.id === productId);
  }
}