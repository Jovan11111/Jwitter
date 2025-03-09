import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { FriendshipRequest } from '../models/FriendshipRequest';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  apiUrl = 'http://localhost:5002/api/friend'
  constructor(private http: HttpClient) { }

  sendFrReq(sender: string, receiver: string){
    return this.http.post(`${this.apiUrl}/sendFrReq/${sender}/${receiver}`, {})
  }
  declineFrReq(frid: string){
    return this.http.post(`${this.apiUrl}/declineFrReq/${frid}`, {})
  }
  acceptFrReq(frid: string){
    return this.http.post(`${this.apiUrl}/acceptFrReq/${frid}`, {})
  }
  getPendingFrReq(user_id: string){
    return this.http.get<FriendshipRequest[]>(`${this.apiUrl}/getPendingFrReq/${user_id}`)
  }
  getUserFriends(user_id: string){
    return this.http.get<User[]>(`${this.apiUrl}/getUserFriends/${user_id}`)
  }
  areTheyFriends(user1: string, user2: string){
    return this.http.get<boolean>(`${this.apiUrl}/areTheyFriends/${user1}/${user2}`)
  }

}
