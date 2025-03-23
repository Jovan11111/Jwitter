import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:5003/api/message';

  constructor(private http: HttpClient) {}

  /**
   * Sends a message from id1 to id2.
   */
  sendMessage(senderId: string, receiverId: string, content: string) {
    return this.http.post<boolean>(`${this.apiUrl}/sendMessage/${senderId}/${receiverId}`, { content });
  }

  /**
   * Retrieves all messages between two users.
   */
  getMessages(id1: string, id2: string) {
    return this.http.get<Message[]>(`${this.apiUrl}/getMessages/${id1}/${id2}`);
  }

  /**
   * Edits a message by its ID.
   */
  editMessage(messageId: string) {
    return this.http.post<boolean>(`${this.apiUrl}/editMessage/${messageId}`, null);
  }

  /**
   * Deletes a message by its ID.
   */
  deleteMessage(messageId: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/deleteMessage/${messageId}`);
  }

  /**
   * Deletes the entire chat between two users.
   */
  deleteChat(userId1: string, userId2: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/deleteChat/${userId1}/${userId2}`);
  }
}
