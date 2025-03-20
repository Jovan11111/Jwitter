import { Component, OnInit } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Message } from '../models/Message';
import { MessageService } from '../services/message.service';
import { CommonModule } from '@angular/common';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  user_Id: string;
}

@Component({
  selector: 'app-message',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit{

  constructor(private actRoute: ActivatedRoute, private msgSer: MessageService){}
  messages: Message[] = []
  user_id: string = ""
  logged_user_id: string = ""
  newContent: string = ""

  ngOnInit(): void {
    this.user_id = this.actRoute.snapshot.paramMap.get('id') ?? ''
    const authToken = localStorage.getItem("auth_token");
    if(authToken){
      const decoded = jwtDecode<CustomJwtPayload>(authToken)
      this.logged_user_id = decoded.user_Id
    }

    this.msgSer.getMessages(this.user_id, this.logged_user_id).subscribe({
      next: (msgs: Message[]) => {
        this.messages = msgs
      }
    })
  }

  sendMessage(){
    this.msgSer.sendMessage(this.logged_user_id, this.user_id, this.newContent).subscribe({
      next: (issent: boolean) => {
        this.ngOnInit();
      }
    })
  }

}
