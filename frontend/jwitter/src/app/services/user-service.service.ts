import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  private apiUrl = 'http://localhost:5000/api/auth'

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post<{message: string, token: string}>(`${this.apiUrl}/login`, {username, password});
  }

  register(username: string, password:string, email:string){
    return this.http.post(`${this.apiUrl}/register`, {username, password, email});
  }

  logout(){
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
