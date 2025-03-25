import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl: string = "http://localhost:5004/api/comment"

  constructor(private http: HttpClient) {}

  /**
   * 
   */
  addComment(user: string, post: string, content: string){
    return this.http.post(`${this.apiUrl}/addComment`, {postId: post, userId: user, cont: content});
  }

  /**
   * 
   */
  deleteComment(comment_id: string){
    return this.http.delete(`${this.apiUrl}/deleteComment/${comment_id}`);
  }

  /**
   * 
   */
  replyToComment(parent_id: string){
    return this.http.post(`${this.apiUrl}/replyToComment/${parent_id}`, {});
  }

  /**
   * 
   */
  getPostComments(post_id: string){
    return this.http.get<Comment[]>(`${this.apiUrl}/getPostComments/${post_id}`);
  }

  /**
   * 
   */
  getUserComments(user_id: string){
    return this.http.get<Comment[]>(`${this.apiUrl}/getUserComments/${user_id}`);
  }

  /**
   * 
   */
  getCommentById(comment_id: string){
    return this.http.get<Comment>(`${this.apiUrl}/getCommentById/${comment_id}`);
  }
}
