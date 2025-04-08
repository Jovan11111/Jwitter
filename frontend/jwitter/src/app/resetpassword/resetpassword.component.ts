import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';
  message: string = '';
  showPassword1: boolean = false;
  showPassword2: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserServiceService, private router: Router) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = "Passwords do not match!";
      return;
    }

    this.userService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        console.log("Changes the password");
        this.router.navigate(['/login']);
      },
      error: (err) =>{
        console.error("Failed to change the password: ", err);
        
      }
    });
  }

}
