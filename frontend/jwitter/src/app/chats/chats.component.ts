import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../services/message.service';
import { User } from '../models/User';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

@Component({
  selector: 'app-chats',
  imports: [CommonModule, RouterModule, FormsModule, MessageComponent, SidebarComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit{

  constructor(private messageService: MessageService, private route: ActivatedRoute){}

  chatters: User[] = [];
  loggedInUserId: string = '';
  showmsgs = false;
  selectedChatterId: string = '';

  ngOnInit(): void {
    this.selectedChatterId = this.route.snapshot.paramMap.get('id') ?? '';
    if(this.selectedChatterId != "0") this.showmsgs = true;
    this.decodeToken();
    this.getChats();
  }

  private decodeToken(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      this.loggedInUserId = decoded.userId;
    }
  }

  private getChats(){
    this.messageService.getChatters(this.loggedInUserId).subscribe({
      next: (users: User[]) => {
        this.chatters = users;
      },
      error: (err) => {
        console.error('Failed to load chatters:', err);
      }
    });
  }

  showchat(other: string){
    this.showmsgs = true;
    this.selectedChatterId = other;
  }

}
