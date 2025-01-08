import { Component, OnInit } from '@angular/core';
// import { Product } from '../model/product.model';
// import { ProductService } from '../services/product.service';
// import { ToastrService } from 'ngx-toastr'; 
// import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
// export class ProductListComponent implements OnInit {
//   products: Product[] = [];
//   totalElements: number = 0;
//   currentPage: number = 0;
//   pageSize: number = 10;
//   totalPages: number = 0;

//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.fetchProducts();
//   }

//   fetchProducts(): void {
//     this.productService.getAllProducts(this.currentPage, this.pageSize).subscribe(response => {
//       this.products = response.content;
//       this.totalElements = response.totalElements;
//       this.totalPages = Math.ceil(this.totalElements / this.pageSize);
//     });
//   }

//   onPageChange(page: number): void {
//     if (page >= 0 && page < this.totalPages) {
//       this.currentPage = page;
//       this.fetchProducts();
//     }
//   }

//   deleteProduct(id: number): void {
//     this.productService.deleteProduct(id).subscribe(() => {
//       this.fetchProducts();
//     });
//   }
// }
// export class ProductListComponent implements OnInit {
//   products: Product[] = [];
//   totalElements: number = 0;
//   currentPage: number = 1;
//   pageSize: number = 10;
//   totalPages: number = 0;
//   token: string = '';

//   constructor(
//     private productService: ProductService,private toastr: ToastrService,private router: Router 
//   ) {}

//   ngOnInit(): void {
//     this.token = localStorage.getItem('authToken') || '';
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.productService.getAllProducts(this.currentPage - 1, this.pageSize,this.token).subscribe(response => {
//       this.products = response.content;
//       this.totalElements = response.totalElements;
//       this.totalPages = Math.ceil(this.totalElements / this.pageSize);
//     });
//   }

//   onPageChange(page: number): void {
//     this.currentPage = page;
//     this.loadProducts();
//   }

//   //  Define the editProduct method
//    editProduct(productId: number): void {
//     // Navigate to the product edit page
//     this.router.navigate(['/edit-product', productId]);
//   }

//   // Implement the deleteProduct method
//   deleteProduct(productId: number): void {
//     if (confirm('Are you sure you want to delete this product?')) {
//       this.productService.deleteProduct(productId).subscribe(
//         () => {
//           // After deleting, reload the products
//           this.toastr.success('Product deleted successfully');
//           this.loadProducts();
//         },
//         error => {
//           // Handle error here
//           this.toastr.error('Failed to delete the product');
//         }
//       );
//     }
//   }
// }





// export class ProductListComponent implements OnInit {

//   products: any[] = [];
//   loading: boolean = false;
//   error: string = '';
//   totalPages: number = 0;

//   constructor(private http: HttpClient, private authService: AuthService) { }

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.loading = true;
//     const token = this.authService.getToken();

//     // If the token is found, make the request to the product API
//     if (token) {
//       this.http.get<any[]>('http://localhost:8081/api/product?page=0&size=10')
//         .subscribe({
//           next: (data) => {
//             if (data && Array.isArray(data.products)) {
//               this.products = data.products;
//               this.totalPages = data.totalPages;  // Assuming the response contains a 'totalPages' field
//               this.loading = false;
//             } else {
//               this.error = 'Invalid response format';
//               this.loading = false;
//             }
//           },
//           error: (err) => {
//             this.error = 'Failed to load products';
//             this.loading = false;
//           }
//         });
//     } else {
//       this.error = 'No token found';
//       this.loading = false;
//     }
//   }
// }

export class ProductListComponent implements OnInit {

  products: any[] = [];
  loading: boolean = false;
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  totalElements: number = 0;

  constructor(private http: HttpClient, private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    const token = this.authService.getToken();

    // If the token is found, make the request to the product API
    if (token) {
      this.http.get<any>(`http://localhost:8081/api/product?page=${this.currentPage - 1}&size=10`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).subscribe({
        next: (data) => {
          if (data && data.content && Array.isArray(data.content)) {
            this.products = data.content; // Get the products from the 'content' field
            this.totalElements = data.totalElements; // Total elements
            this.totalPages = data.totalPages; // Total pages based on response
            this.loading = false;
          } else {
            // Handle case if the response structure is not as expected
            this.error = 'Invalid response format. "content" is missing or not an array.';
            this.loading = false;
          }
        },
        error: (err) => {
          this.error = 'Failed to load products';
          this.loading = false;
        }
      });
    } else {
      this.error = 'No token found';
      this.loading = false;
    }
  }

  // Pagination change handler
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();  // Reload products based on the new page
  }

  deleteProduct(productId: number): void {
    const token = this.authService.getToken();

    if (token && confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`http://localhost:8081/api/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).subscribe({
        next: () => {
          this.toastr.success('Product deleted successfully');
          this.loadProducts(); // Reload the products after deletion
        },
        error: (err) => {
          this.toastr.error('Failed to delete the product');
        }
      });
    }
  }
}