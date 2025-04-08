import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router, RouterModule } from '@angular/router';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-changepasswordmodal',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './changepasswordmodal.component.html',
  styleUrl: './changepasswordmodal.component.css'
})
export class ChangepasswordmodalComponent {
  constructor(private userService: UserServiceService, private router: Router){}

  oldPass: string = "";
  newPass: string = "";
  newPassConf: string = "";
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  showPassword3: boolean = false;

  @Input() loggedInUserId !: string;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void{
    this.closeModal.emit();
  }

  changePassword(){
    if(this.newPass && this.oldPass && this.newPassConf){
      if(this.newPass === this.newPassConf){
        this.userService.changePassword(this.loggedInUserId, this.newPass).subscribe({
          next: (obj: Object) =>{
            localStorage.removeItem('auth_token');
            this.router.navigate(['/login']);
          },
          error: (err: any) => {
            console.log("Failed to change password", err);
          }
        })
      } else{
        console.log("Confirmation of new pass not good");
      }
    } else{
      console.log("Enter all valid data");
    }
  }
}
