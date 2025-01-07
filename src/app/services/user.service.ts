import { Injectable } from "@angular/core";
import { UserDto } from "../model/user.dto";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
    private apiUrl = 'http://localhost:8081/api/auth'; // Your backend API URL
  
    constructor(private http: HttpClient) { }
  
    registerUser(userDto: UserDto): Observable<string> {
      return this.http.post<string>(`${this.apiUrl}/register`, userDto);
    }
  }