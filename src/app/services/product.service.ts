// filepath: /d:/project/AngularP/warehousemanagement/src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { StockMovement } from '../model/stock-movement.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/api/product'; // Your backend API URL

  constructor(private http: HttpClient) {}

  getAllProducts(page: number = 0, size: number = 10, token: string): Observable<{ content: Product[], totalElements: number }> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ content: Product[], totalElements: number }>(`${this.apiUrl}?page=${page}&size=${size}`, { headers });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
   
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  updateStock(stockMovement: StockMovement, token: string): Observable<void> {
    // const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/stock-movement`, stockMovement, { headers });
  }
  getTotalProducts(token: string): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<number>(`${this.apiUrl}/count`, { headers });
  }
  getTotalStockValue(token: string): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<number>(`${this.apiUrl}/total-stock-value`, { headers });
  }
  getLowStockProducts(token: string): Observable<Product[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product[]>(`${this.apiUrl}/low-stock`, { headers });
  }
  updateProductStock(id: number, stock: number, token: string): Observable<Product> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<Product>(`${this.apiUrl}/${id}/stock`, { stock }, { headers });
  }
}