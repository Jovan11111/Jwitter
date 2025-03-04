import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = ''
  password: string = ''

  login() {
    console.log(this.username)
    console.log(this.password)
  }
}
