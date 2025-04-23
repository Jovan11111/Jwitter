import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = "http://localhost:5005/api/email"

  constructor(private http: HttpClient) { }

  sendEmail(to: string[], title: string, content: string){
    return this.http.post(`${this.apiUrl}/sendEmail`, {to: to, title: title, content: content});
  }
}
