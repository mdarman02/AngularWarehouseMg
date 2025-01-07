// filepath: /d:/project/AngularP/warehousemanagement/src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/api/product'; // Your backend API URL

  constructor(private http: HttpClient) {}

  getAllProducts(page: number = 0, size: number = 10, token: string): Observable<{ content: Product[], totalElements: number }> {

    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const headers = new HttpHeaders().set('Authorization', token);
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
}