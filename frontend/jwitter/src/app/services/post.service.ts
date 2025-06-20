import { HttpClient, HttpParams } from '@angular/common/http';
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
  getVisiblePosts(id: string) {
    return this.http.get<Post[]>(`${this.apiUrl}/visiblePosts/${id}`);
  }

  /**
   * Retrieves a specific post by its ID.
   */
  getPostById(postId: string, loggedInUserId: string) {
    
    return this.http.get<Post>(`${this.apiUrl}/getPost/${postId}/${loggedInUserId}`);
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

  /**
   * Updates the database so like is added or removed
   */
  likePost(user: string, post: string){
    return this.http.post(`${this.apiUrl}/like`, {userId: user, postId: post});
  }

  /**
   * Updates the database so dislike is added or removed
   */
  dislikePost(user: string, post: string){
    return this.http.post(`${this.apiUrl}/dislike`, {userId: user, postId: post});
  }

  /**
   * 
   */
  getUserLikes(user: string, loggedInUserId: string){
    return this.http.get<Post[]>(`${this.apiUrl}/getUserLikes/${user}/${loggedInUserId}`);
  }

  /**
   * 
   */
  reportPost(post: string, user: string){
    return this.http.post(`${this.apiUrl}/reportPost/${post}`, {reportedBy: user});
  }

  /**
   * 
   */
  searchPosts(query: string, loggedInUserId: string){
    return this.http.get<Post[]>(`${this.apiUrl}/searchPosts/${query}/${loggedInUserId}`);
  }

  /**
   * 
   */
  appealPost(postId: string){
    return this.http.post(`${this.apiUrl}/appeal/${postId}`, null);
  }

  /**
   * 
   */
  acceptAppeal(postId: string){
    return this.http.post(`${this.apiUrl}/acceptAppeal/${postId}`, null);
  }

  /**
   * 
   */
  declineAppeal(postId: string){
    return this.http.post(`${this.apiUrl}/declineAppeal/${postId}`, null);
  }

  /**
   * 
   */
  getAppealedPosts(){
    return this.http.get<Post[]>(`${this.apiUrl}/getAppealedPosts`);
  }

  /**
   * 
   */
  allPosts(){
    return this.http.get<Post[]>(`${this.apiUrl}/allPosts`);
  }

  /**
   * 
   */
  editPost(pid: string, content: string){
    return this.http.post(`${this.apiUrl}/editPost`, {postId: pid, newCont: content});
  }
}
