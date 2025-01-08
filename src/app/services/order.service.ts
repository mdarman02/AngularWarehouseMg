import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order, OrderDto } from "../model/order.model";

@Injectable({
    providedIn: 'root'
  })
  export class OrderService {
  
    private apiUrl = 'http://localhost:8081/api/orders';
  
    constructor(private http: HttpClient) {}
  
    getOrders(page: number, size: number, token: string): Observable<{ content: Order[], totalElements: number }> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<{ content: Order[], totalElements: number }>(`${this.apiUrl}?page=${page}&size=${size}`, { headers });
      }
      createOrder(orderDto: OrderDto, token: string): Observable<Order> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<Order>(this.apiUrl, orderDto, { headers });
      }

      getOrderById(id: number, token: string): Observable<Order> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<Order>(`${this.apiUrl}/${id}`, { headers });
      }
  }