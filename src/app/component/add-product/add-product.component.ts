import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = {
    id: 0,
    name: '',
    sku: '',
    category: '',
    price: 0,
    description: '',
    currentStock: 0
  };

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    public router: Router
  ) { }

  addProduct(): void {
    this.productService.createProduct(this.product).subscribe({
      next: () => {
        this.toastr.success('Product added successfully');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.toastr.error('Failed to add product');
      }
    });
  }
}