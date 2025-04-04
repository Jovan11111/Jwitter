import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [RouterLink, FormsModule, CommonModule, ForgotPasswordModalComponent],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  message: string = '';
  forgotPasswordModalOpen: boolean = false;

  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  /**
   * Redirects to /main if already authenticated.
   */
  ngOnInit(): void {
    if (localStorage.getItem('auth_token')) {
      this.router.navigate(['/main']);
    }
  }

  /**
   * Attempts to log in the user using the entered credentials.
   * On success, stores the token and redirects to /main.
   * On failure, shows error message.
   */
  login(): void {
    this.userService.login(this.username, this.password).subscribe(
      (response) => {
        localStorage.setItem('auth_token', response.token);
        console.log(jwtDecode(response.token));
        this.router.navigate(['/main']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.message = error.error.message || 'Login failed. Please try again.';
      }
    );
  }

  openForgotPasswordModal(): void{
    this.forgotPasswordModalOpen = true;
  }
  closeForgotPasswordModal(): void{
    this.forgotPasswordModalOpen = false;
  }
}
