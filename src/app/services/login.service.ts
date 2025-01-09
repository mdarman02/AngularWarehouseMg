import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto } from '../model/login.dto';
import { TokenResponseDto } from '../model/token-response.dto';


@Injectable({
    providedIn: 'root'
  })
  export class LoginService {
  
    private apiUrl = 'http://localhost:8081/api/auth'; // Your API URL
  
    constructor(private http: HttpClient) { }
  
    login(loginDto: LoginDto): Observable<TokenResponseDto> {
      return this.http.post<TokenResponseDto>(`${this.apiUrl}/login`, loginDto);
    }
 
  }