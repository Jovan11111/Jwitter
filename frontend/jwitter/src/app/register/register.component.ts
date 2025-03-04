import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = ''
  password: string = ''
  email: string = ''
  register(){
    console.log(this.username);
    console.log(this.password);
    console.log(this.email);
    
  }

}
