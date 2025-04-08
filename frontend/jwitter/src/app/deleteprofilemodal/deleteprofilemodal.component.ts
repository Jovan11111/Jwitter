import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-deleteprofilemodal',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './deleteprofilemodal.component.html',
  styleUrl: './deleteprofilemodal.component.css'
})
export class DeleteprofilemodalComponent {

  constructor(private userService: UserServiceService, private router: Router){}

  password: string = ""
  showPassword: boolean = false;
  @Input() loggedInUserId !: string;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void{
    this.closeModal.emit();
  }

  deleteProfile(){
    this.userService.deleteProfile(this.loggedInUserId, this.password).subscribe({
      next: (obj: Object) =>{
        localStorage.removeItem('auth_token');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Failed to delete profile: ", err);
      }
    })
  }
}
