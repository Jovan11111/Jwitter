import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  apiUrl = "http://localhost:5003/api/message"

  constructor(private http: HttpClient) {}

  sendMessage(id1: string, id2: string, cont: string){
    return this.http.post<boolean>(`${this.apiUrl}/sendMessage/${id1}/${id2}`, {content: cont})
  }

  getMessages(id1:string, id2: string){
    return this.http.get<Message[]>(`${this.apiUrl}/getMessages/${id1}/${id2}`)
  }

  editMessage(id:string){
    return this.http.post<boolean>(`${this.apiUrl}/editMessage/${id}`, null)
  }

  deleteMessage(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/deleteMessage/${id}`)
  }

  deleteChat(id1:string, id2:string){
    return this.http.delete<boolean>(`${this.apiUrl}/deleteChat/${id1}/${id2}`)
  }
}
