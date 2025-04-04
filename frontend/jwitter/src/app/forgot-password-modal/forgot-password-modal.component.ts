import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-forgot-password-modal',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password-modal.component.html',
  styleUrl: './forgot-password-modal.component.css'
})
export class ForgotPasswordModalComponent {

  constructor(private userService: UserServiceService){}

  email: string = "";

  @Output() closeModal = new EventEmitter<void>();

  onClose(): void{
    this.closeModal.emit();
  }

  sendEmail(): void {
    this.userService.forgotPassword(this.email).subscribe({
      next: (obj: Object) => console.log("Sent email succesfully"),
      error: (err: any) => console.error("Failed to send an email")
    })
    
  }
}
