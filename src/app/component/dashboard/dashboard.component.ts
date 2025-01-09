import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { Product } from 'src/app/model/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalProducts: number = 0; // Example value, replace with actual data
  totalOrders: number = 0; // Example value, replace with actual data
  totalStockValue: number = 0; // Example value, replace with actual data
  lowStockProducts: Product[] = []; // Example value, replace with actual data
  recentOrders: Order[] = [];; // Example value, replace with actual data
  showLowStockTable: boolean = false;
  showRecentOrdersTable: boolean = false;


  constructor( private productService: ProductService,
    private authService: AuthService,private orderService: OrderService
    ,private router: Router  
  ) {
   
   }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }else{
        this.fetchTotalProducts();
    this.fetchTotalStockValue();
    this.fetchLowStockProducts();
    this.fetchTotalOrders();
    }
    
    // Fetch data from the backend and update the properties
  }

  fetchTotalProducts(): void {
    const token = this.authService.getToken();
    if (token) {
      this.productService.getTotalProducts(token).subscribe({
        next: (total: number) => {
          this.totalProducts = total;
        },
        error: (err: any) => {
          console.error('Failed to fetch total products', err);
        }
      });
    }
  }
  
  fetchTotalOrders(): void {
    const token = this.authService.getToken();
    if (token) {
      this.orderService.getTotalOrders(token).subscribe({
        next: (total: number) => {
          this.totalOrders = total;
        },
        error: (err: any) => {
          console.error('Failed to fetch total orders', err);
        }
      });
    }
  }

  fetchTotalStockValue(): void {
    const token = this.authService.getToken();
    if (token) {
      this.productService.getTotalStockValue(token).subscribe({
        next: (totalValue: number) => {
          this.totalStockValue = totalValue;
        },
        error: (err: any) => {
          console.error('Failed to fetch total stock value', err);
        }
      });
    }
  }
  fetchLowStockProducts(): void {
    const token = this.authService.getToken();
    if (token) {
      this.productService.getLowStockProducts(token).subscribe({
        next: (products: Product[]) => {
          this.lowStockProducts = products;
        },
        error: (err: any) => {
          console.error('Failed to fetch low stock products', err);
        }
      });
    }
  }


  toggleRecentOrdersTable(): void {
    this.showRecentOrdersTable = !this.showRecentOrdersTable;
    if (this.showRecentOrdersTable) {
      this.fetchRecentOrders();
    }
  }

  fetchRecentOrders(): void {
    const token = this.authService.getToken();
    if (token) {
      this.orderService.getRecentOrders(token, 5).subscribe({
        next: (orders: Order[]) => {
          this.recentOrders = orders;
        },
        error: (err: any) => {
          console.error('Failed to fetch recent orders', err);
        }
      });
    }
  }



  toggleLowStockTable(): void {
    this.showLowStockTable = !this.showLowStockTable;
  }
}
