import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-send-email-modal',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './send-email-modal.component.html',
  styleUrl: './send-email-modal.component.css'
})
export class SendEmailModalComponent {

  constructor(private emailService: EmailService){}

  title: string = "";
  content: string = "";
  @Input() emails: string[] = []
  @Input() loggedInUserId: string = ""
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }

  sendEmail(): void {
    this.emailService.sendEmail(this.emails, this.title, this.content).subscribe({
      next: () => {
        this.onClose();
      },
      error: (err) => {
        console.error("Failed to send email: ", err);
      }
    })
  }

}
