import { Component } from '@angular/core';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-main',
  imports: [LogoutComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  posts: Post[] = []
  ngOnInit(){
    
  }
}
