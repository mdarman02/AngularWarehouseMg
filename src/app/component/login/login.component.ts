import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/model/login.dto';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private logInService: LoginService, private router: Router,private auth:AuthService) { }

  login() {
    const loginDto = new LoginDto(this.email, this.password);
    this.logInService.login(loginDto).subscribe(
      (response) => {
        // Handle successful login
        this.auth.setToken(response.token);
        this.successMessage = 'Login successful';
        this.errorMessage = '';
        const token = response.token;

        // localStorage.setItem('authToken', token);  // Save token to local storage
        this.router.navigate(['/dashboard']);  // Redirect to dashboard (or any other route)
      },
      (error) => {
        // Handle error (invalid login)
        this.errorMessage = 'Invalid email or password';
        this.successMessage = '';
      }
    );
  }
}

