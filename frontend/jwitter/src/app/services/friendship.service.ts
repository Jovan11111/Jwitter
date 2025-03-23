import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { FriendshipRequest } from '../models/FriendshipRequest';

@Injectable({
  providedIn: 'root',
})
export class FriendshipService {
  private apiUrl = 'http://localhost:5002/api/friend';

  constructor(private http: HttpClient) {}

  /**
   * Sends a friendship request from sender to receiver.
   */
  sendFriendRequest(sender: string, receiver: string) {
    return this.http.post(`${this.apiUrl}/sendFrReq/${sender}/${receiver}`, {});
  }

  /**
   * Declines a friendship request by its ID.
   */
  declineFriendRequest(requestId: string) {
    return this.http.post(`${this.apiUrl}/declineFrReq/${requestId}`, {});
  }

  /**
   * Accepts a friendship request by its ID.
   */
  acceptFriendRequest(requestId: string) {
    return this.http.post(`${this.apiUrl}/acceptFrReq/${requestId}`, {});
  }

  /**
   * Gets all pending friendship requests for a given user.
   */
  getPendingRequests(userId: string) {
    return this.http.get<FriendshipRequest[]>(`${this.apiUrl}/getPendingFrReq/${userId}`);
  }

  /**
   * Retrieves all friends of a given user.
   */
  getUserFriends(userId: string) {
    return this.http.get<User[]>(`${this.apiUrl}/getUserFriends/${userId}`);
  }

  /**
   * Checks if two users are friends.
   */
  areTheyFriends(user1: string, user2: string) {
    return this.http.get<boolean>(`${this.apiUrl}/areTheyFriends/${user1}/${user2}`);
  }

  /**
   * Removes a friendship between two users.
   */
  removeFriend(user1: string, user2: string) {
    return this.http.delete(`${this.apiUrl}/removeFriend/${user1}/${user2}`);
  }
}
