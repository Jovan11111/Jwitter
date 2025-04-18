import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../services/message.service';
import { User } from '../models/User';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FriendshipService } from '../services/friendship.service';

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

  constructor(
    private messageService: MessageService, 
    private route: ActivatedRoute,
    private friendService: FriendshipService
  ){}

  chatters: User[] = [];
  friends: User[] = [];
  loggedInUserId: string = '';
  showmsgs = false;
  selectedChatterId: string = '';
  searchTerm: string = '';
  filteredFriends: User[] = [];
  showSearchResults: boolean = false;

  ngOnInit(): void {
    this.selectedChatterId = this.route.snapshot.paramMap.get('id') ?? '';
    this.showmsgs = true;
    this.decodeToken();
    this.getChats();
    this.getFriends();
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

  private getFriends(): void{
    this.friendService.getUserFriends(this.loggedInUserId).subscribe({
      next: (usrs: User[]) => {
        this.friends = usrs;
        this.filteredFriends = usrs;
      },
      error: (err) => {
        console.error('Failed to load friends: ', err);
      }
    })
  }

  showchat(other: string){
    this.selectedChatterId = other;
  }

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredFriends = this.friends.filter(friend =>
      friend.username.toLowerCase().includes(term)
    );
    this.showSearchResults = term.length > 0;
  }
  

}
