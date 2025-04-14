import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  /**
   * Authenticates a user with provided credentials.
   */
  login(username: string, password: string) {
    return this.http.post<{ message: string; token: string }>(`${this.apiUrl}/login`, { username, password });
  }

  /**
   * Registers a new user.
   */
  register(username: string, password: string, email: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, password, email });
  }

  /**
   * Retrieves a user by their ID.
   */
  getUserById(userId: string) {
    return this.http.get<User>(`${this.apiUrl}/user/${userId}`);
  }

  /**
   * 
   */
  deleteProfile(userId: string, pass: string){
    return this.http.post(`${this.apiUrl}/deleteProfile`, {userr: userId, passwordd: pass});
  }

  /**
   * 
   */
  changePassword(user: string, pass: string){
    return this.http.post(`${this.apiUrl}/changePassword`, {userId: user, newPass: pass});
  }

  /**
   * 
   */
  forgotPassword(mail: string){
    return this.http.post(`${this.apiUrl}/forgotPassword`, {email: mail});
  }

  /**
   * 
   */
  resetPassword(token: string, newpass: string){
    return this.http.post(`${this.apiUrl}/resetPassword/${token}`, {newPassword: newpass});
  }

  /**
   * 
   */
  saveNotificationSettings(user: string, frReqNotifs: boolean, messageNotifs: boolean){
    return this.http.post(`${this.apiUrl}/saveNotificationSettings/${user}`, {frreq: frReqNotifs, msg: messageNotifs});
  }

  /**
   * 
   */
  saveVisibilitySettings(user: string, postV: string, likeV: string, friendV: string, emailV: string){
    return this.http.post(`${this.apiUrl}/saveVisibilitySettings/${user}`, {post: postV, like: likeV, friend: friendV, email: emailV});
  }

  searchUsers(query: string) {
    return this.http.get<User[]>(`${this.apiUrl}/searchUsers/${query}`);
  }
}
