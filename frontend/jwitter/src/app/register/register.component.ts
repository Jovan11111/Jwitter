import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [RouterLink, FormsModule, CommonModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  passwordConf: string = '';
  email: string = '';
  message: string = '';
  showPassword1: boolean = false;
  showPassword2: boolean = false;

  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  /**
   * Handles user registration.
   * On success, navigates to login page.
   * On failure, displays an error message.
   */
  register(): void {
    if(this.password === this.passwordConf){
      this.userService.register(this.username, this.password, this.email).subscribe(
        (response: any) => {
          console.log('Registration successful:', response.message);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Failed to register:', error);
          this.message = error.error.message || 'Registration failed. Please try again.';
        }
      );
    } else{
      this.message = "Password confirmation does not match the pasword"
    }
  }
}
