import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private us: UserServiceService, private router: Router){}
  
  username: string = ''
  password: string = ''
  email: string = ''
  message: string = ''
  register(){
    this.us.register(this.username, this.password, this.email).subscribe(
      (response: any) => {
        this.router.navigate(['/login'])
        console.log("Registration successfull", response.message);
      },
      (error) => {
        console.log("Failed to register");
        this.message = error.error.message
      }
    )
    
  }

}
