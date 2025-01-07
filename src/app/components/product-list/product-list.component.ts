import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  totalElements: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  loading: boolean = false;
  error: string = '';

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    const token = this.authService.getToken();

    if (token) {
      this.productService.getAllProducts(this.currentPage, this.pageSize, token).subscribe({
        next: (response) => {
          this.products = response.content; // Ensure this is an array
          this.totalElements = response.totalElements;
          this.totalPages = Math.ceil(this.totalElements / this.pageSize);
          this.loading = false;
        },
        error: (err) => {
          if (err.status === 403) {
            this.toastr.error('Access denied. Please log in again.');
            this.router.navigate(['/login']);
          } else {
            this.toastr.error('Failed to load products');
          }
          this.loading = false;
        }
      });
    } else {
      this.error = 'No token found';
      this.loading = false;
    }
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  editProduct(productId: number): void {
    this.router.navigate(['/edit-product', productId]);
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.toastr.success('Product deleted successfully');
          this.loadProducts();
        },
        error => {
          this.toastr.error('Failed to delete the product');
        }
      );
    }
  }
}