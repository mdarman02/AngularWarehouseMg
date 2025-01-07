import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/model/user.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.successMessage = '';
      return;
    }

    const userDto = new UserDto(0, this.firstname, this.lastname, this.email, this.password);
    this.userService.registerUser(userDto).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.errorMessage = '';
        this.successMessage = 'Registration successful! Please login.';
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
        this.errorMessage = 'Registration failed. Please try again.';
        this.successMessage = '';
      }
    );
  }
}
