import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl = 'http://localhost:5001/api/post'
  constructor(private http: HttpClient) { }

  allPosts(){
    return this.http.get<Post[]>(`${this.apiUrl}/allPosts`)
  }

  getPost(postid: string){
    return this.http.get<Post>(`${this.apiUrl}/getPost/${postid}`)
  }

  createPost(title: string, content: string, user: string){
    console.log(user);
    return this.http.post<boolean>(`${this.apiUrl}/createPost`, {title, content, user})
  }

  deletePost(postid: string){
    return this.http.delete(`${this.apiUrl}/deletePost/${postid}`)
  }

  userPosts(userid: string){
    return this.http.get<Post[]>(`${this.apiUrl}/userPosts/${userid}`)
  }
}
