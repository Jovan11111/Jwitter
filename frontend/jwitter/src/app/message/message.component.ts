import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode, JwtPayload } from 'jwt-decode';

import { MessageService } from '../services/message.service';
import { Message } from '../models/Message';

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  imports: [RouterModule, CommonModule, FormsModule]
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  newContent: string = '';
  loggedInUserId: string = '';
  recipientUserId: string = '';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  /**
   * Initialize component:
   * - decode logged-in user ID
   * - get recipient user ID from route
   * - load message history
   */
  ngOnInit(): void {
    this.recipientUserId = this.route.snapshot.paramMap.get('id') || '';

    const token = localStorage.getItem('auth_token');
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      this.loggedInUserId = decoded.userId;
    }

    this.loadMessages();

    this.messageService.listenForMessages().subscribe((newMsg: Message) => {
      console.log("DOSLA PORUKA DING DONG");
      
      if(
        (newMsg.sender === this.loggedInUserId && newMsg.receiver === this.recipientUserId) ||
        (newMsg.sender === this.recipientUserId && newMsg.receiver === this.loggedInUserId)
      ) {
        this.messages.push(newMsg);
      }
    })
  }

  /**
   * Fetches messages between logged-in user and recipient.
   */
  private loadMessages(): void {
    this.messageService
      .getMessages(this.recipientUserId, this.loggedInUserId)
      .subscribe({
        next: (msgs: Message[]) => (this.messages = msgs),
        error: (err) => console.error('Failed to load messages:', err)
      });
  }

  /**
   * Sends a message and reloads message list.
   */
  sendMessage(): void {
    if (!this.newContent.trim()) return;
    this.newContent = '';
    this.messageService.sendMessage(this.loggedInUserId, this.recipientUserId, this.newContent)
  }
}
