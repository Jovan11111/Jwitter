import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:5001/api/post';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all posts.
   */
  getAllPosts() {
    return this.http.get<Post[]>(`${this.apiUrl}/allPosts`);
  }

  /**
   * Retrieves a specific post by its ID.
   */
  getPostById(postId: string) {
    return this.http.get<Post>(`${this.apiUrl}/getPost/${postId}`);
  }

  /**
   * Creates a new post.
   */
  createPost(title: string, content: string, userId: string) {
    console.log(title, content, userId);
    return this.http.post<boolean>(`${this.apiUrl}/createPost`, { title, content, user: userId });
  }

  /**
   * Deletes a post by its ID.
   */
  deletePost(postId: string) {
    return this.http.delete(`${this.apiUrl}/deletePost/${postId}`);
  }

  /**
   * Retrieves all posts by a specific user.
   */
  getUserPosts(userId: string) {
    return this.http.get<Post[]>(`${this.apiUrl}/userPosts/${userId}`);
  }
}
