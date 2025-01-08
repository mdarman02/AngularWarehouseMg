import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalProducts: number = 0; // Example value, replace with actual data
  totalStockValue: number = 0; // Example value, replace with actual data
  lowStockProducts: Product[] = []; // Example value, replace with actual data
  recentOrders: number = 10; // Example value, replace with actual data
  showLowStockTable: boolean = false;


  constructor( private productService: ProductService,
    private authService: AuthService) {
   
   }

  ngOnInit(): void {
    this.fetchTotalProducts();
    this.fetchTotalStockValue();
    this.fetchLowStockProducts();
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
  toggleLowStockTable(): void {
    this.showLowStockTable = !this.showLowStockTable;
  }
}
