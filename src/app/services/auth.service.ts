// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Store the token in localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Retrieve the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Remove the token from localStorage
  removeToken(): void {
    localStorage.removeItem('authToken');
  }
}
