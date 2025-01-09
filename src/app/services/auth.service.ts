// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

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

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }


  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
