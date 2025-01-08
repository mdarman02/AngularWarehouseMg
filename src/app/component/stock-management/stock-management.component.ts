import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Product } from "src/app/model/product.model";
import { StockMovement } from "src/app/model/stock-movement.model";
import { AuthService } from "src/app/services/auth.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css']
})
export class StockManagementComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  stockMovement: StockMovement = {
    productId: 0,
    quantity: 0,
    reason: '',
    movementType: ''
  };

  isLoading = false;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts(0, 100, localStorage.getItem('authToken') || '').subscribe({
      next: (response) => {
        this.products = response.content;
      },
      error: (err) => {
        this.toastr.error('Failed to load products');
      }
    });
  }

  openAddStockModal(product: Product): void {
    this.selectedProduct = product;
    this.stockMovement.productId = product.id;
    this.stockMovement.quantity = 0;
    this.stockMovement.reason = '';
    this.stockMovement.movementType = ''; // Set an initial movement type
  }

  addStock(): void {
    const token = this.authService.getToken();

    if (token) {
      // Prepare the body with stockMovement details
      const requestBody = {
        productId: this.stockMovement.productId,
        quantity: this.stockMovement.quantity,
        reason: this.stockMovement.reason
      };

      // Make the POST request to add stock
      this.http.post('http://localhost:8081/api/stock/add', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).subscribe({
        next: () => {
          // After successfully adding stock, update stock in your productService
          this.productService.updateStock(this.stockMovement, token || '');

          // Show a success message
          this.toastr.success('Stock added successfully');

          // Reload the products
          this.loadProducts();
        },
        error: (err) => {
          // Show an error message if the request fails
          console.error(err);
          this.toastr.error('Stock added successfully');
        }
      });
    }
  }

  // addStock(): void {
  //   const token = this.authService.getToken();

  //   if (token && this.stockMovement.quantity > 0 && this.stockMovement.reason) {
  //     this.isLoading = true;
  //     const requestBody = {
  //       productId: this.stockMovement.productId,
  //       quantity: this.stockMovement.quantity,
  //       reason: this.stockMovement.reason
  //     };

  //     // Make the POST request to add stock
  //     this.http.post('http://localhost:8081/api/stock/add', requestBody, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }).subscribe({
  //       next: (response) => {
  //         this.productService.updateStock(this.stockMovement, token || '');
  //         this.toastr.success('Stock added successfully');
  //         this.loadProducts();
  //         this.closeModal();
  //       },
  //       error: (err) => {
  //         console.error(err);
  //         this.toastr.error('Failed to add the stock');
  //       },
  //       complete: () => {
  //         this.isLoading = false;
  //       }
  //     });
  //   } else {
  //     this.toastr.error('Please provide valid stock details.');
  //   }
  // }

  removeStock(): void {
    if (this.selectedProduct && this.stockMovement.quantity > 0 && this.stockMovement.reason) {
      // Set the movementType to 'Remove' for stock removal
      this.stockMovement.movementType = 'Remove';

      const token = this.authService.getToken();

      if (token) {
        // Prepare the body with stockMovement details for removal
        const requestBody = {
          productId: this.stockMovement.productId,
          quantity: this.stockMovement.quantity,
          reason: this.stockMovement.reason
        };

        // Make the POST request to remove stock
        this.http.put('http://localhost:8081/api/stock/reduceStock', requestBody, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).subscribe({
          next: () => {
            // After successfully removing stock, update stock in the productService
            this.productService.updateStock(this.stockMovement, token || '');

            // Show a success message
            this.toastr.success('Stock removed successfully');

            // Reload the products
            this.loadProducts();

            // Close the modal
            this.closeModal();
          },
          error: (err) => {
            // Show an error message if the request fails
            this.toastr.error('Failed to remove the stock');
          }
        });
      }
    } else {
      // Show an error if quantity or reason is missing
      this.toastr.error('Please provide valid quantity and reason.');
    }
  }


  closeModal(): void {
    // Logic to close the modal
    const modalElement = document.getElementById('addStockModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.setAttribute('style', 'display: none');
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  }
}


