import { Component, ElementRef, input, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
export class MessageComponent implements OnInit, OnChanges {
  messages: Message[] = [];
  newContent: string = '';

  @Input() recipientUserId !: string;
  @Input() loggedInUserId !: string;

  @ViewChild('scrollContainer') scrollContainer !: ElementRef;

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
    
    this.loadMessages();

    this.messageService.listenForMessages().subscribe((newMsg: Message) => {
      if(
        (newMsg.sender === this.loggedInUserId && newMsg.receiver === this.recipientUserId) ||
        (newMsg.sender === this.recipientUserId && newMsg.receiver === this.loggedInUserId)
      ) {
        this.messages.push(newMsg);
        this.scrollToBottom()
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['recipientUserId'] && !changes['recipientUserId'].firstChange) {
      this.loadMessages();
    }
  }


  /**
   * Fetches messages between logged-in user and recipient.
   */
  private loadMessages(): void {
    this.messageService
      .getMessages(this.recipientUserId, this.loggedInUserId)
      .subscribe({
        next: (msgs: Message[]) => {
          this.messages = msgs; 
          setTimeout(() => {
            this.scrollToBottom();
          }, 0);
        },
        error: (err) => console.error('Failed to load messages:', err)
      });
  }

  /**
   * Sends a message and reloads message list.
   */
  sendMessage(): void {
    if (!this.newContent.trim()) return;
    this.messageService.sendMessage(this.loggedInUserId, this.recipientUserId, this.newContent);
    this.newContent = '';
    this.scrollToBottom();
  }

  /**
   * 
   */
  private scrollToBottom(): void {
    try{
      setTimeout(() =>{
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight
      }, 0);
    } catch{
      console.log("Failed to scroll");
    }
  }
}
