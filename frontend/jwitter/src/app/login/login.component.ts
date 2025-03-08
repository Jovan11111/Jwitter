import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { log } from 'console';
import { UserServiceService } from '../services/user-service.service';
import { jwtDecode } from 'jwt-decode';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private us: UserServiceService, private router: Router){}

  ngOnInit(){
    if(localStorage.getItem('auth_token')){
      this.router.navigate(['/main']);
    }
  }

  username: string = ''
  password: string = ''
  message: string = ''
  login() {
    this.us.login(this.username, this.password).subscribe(
      (response) => {
        this.router.navigate(['/main'])
        localStorage.setItem('auth_token', response.token);
        console.log(jwtDecode(response.token));
      },
      (error) => {
        console.log("login failed");
        this.message = error.error.message
      }
    );
  }
}
