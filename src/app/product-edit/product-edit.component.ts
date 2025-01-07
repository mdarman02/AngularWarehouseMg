import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = {
    id: 0, name: '', sku: '', category: '', price: 0, description: '',
    currentStock: 0
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the product ID from the route parameters
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
  }

  loadProduct(id: string): void {
    this.productService.getProductById(Number(id)).subscribe(
      (response) => {
        this.product = response;
      },
      (error) => {
        this.toastr.error('Failed to load product details');
      }
    );
  }

  onSubmit(): void {
    this.productService.updateProduct(this.product.id, this.product).subscribe(
      () => {
        this.toastr.success('Product updated successfully');
        this.router.navigate(['/products']);
      },
      (error) => {
        this.toastr.error('Failed to update product');
      }
    );
  }
}
