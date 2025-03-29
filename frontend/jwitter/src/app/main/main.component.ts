import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { FriendshipService } from '../services/friendship.service';
import { Post } from '../models/Post';
import { FriendshipRequest } from '../models/FriendshipRequest';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from '../logout/logout.component';
import { PostcardComponent } from '../postcard/postcard.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [
    LogoutComponent,
    FormsModule,
    CommonModule,
    RouterModule,
    PostcardComponent,
    SidebarComponent
  ]
})
export class MainComponent implements OnInit {
  posts: Post[] = [];
  friendshipRequests: FriendshipRequest[] = [];
  newPostTitle: string = '';
  newPostContent: string = '';
  loggedInUserId: string = '';
  sidebarCollapsed = false;

  constructor(
    private postService: PostService,
    private friendshipService: FriendshipService
  ) {}

  /**
   * On component init:
   * - Decodes logged-in user ID
   * - Fetches all posts
   * - Fetches incoming friend requests
   */
  ngOnInit(): void {
    this.decodeToken();
    this.loadPosts();
    this.loadFriendRequests();
  }

  /**
   * Decodes JWT token and sets the logged-in user ID.
   */
  private decodeToken(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      this.loggedInUserId = decoded.userId;
    }
  }

  /**
   * Loads all posts from backend.
   */
  private loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts: Post[]) => (this.posts = posts),
      error: (err) => console.error('Error fetching posts:', err)
    });
  }

  /**
   * Loads pending friendship requests.
   */
  private loadFriendRequests(): void {
    this.friendshipService.getPendingRequests(this.loggedInUserId).subscribe({
      next: (requests: FriendshipRequest[]) => (this.friendshipRequests = requests),
      error: (err) => console.error('Error fetching friend requests:', err)
    });
  }

  /**
   * Adds a new post using form input.
   */
  addPost(): void {
    this.postService
      .createPost(this.newPostTitle, this.newPostContent, this.loggedInUserId)
      .subscribe({
        next: (success: boolean) => {
          if (success) {
            this.resetForm();
            this.ngOnInit(); // reload data
          } else {
            console.warn('Failed to create post');
          }
        },
        error: (err) => console.error('Error creating post:', err)
      });
  }

  /**
   * Deletes a post by its ID.
   * @param postId - ID of the post to delete
   */
  deletePost(postId: string): void {
    this.postService.deletePost(postId).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error('Error deleting post:', err)
    });
  }

  /**
   * Accepts a friend request by ID.
   * @param requestId - ID of the friend request
   */
  acceptFriendRequest(requestId: string): void {
    this.friendshipService.acceptFriendRequest(requestId).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error('Error accepting friend request:', err)
    });
  }

  /**
   * Declines a friend request by ID.
   * @param requestId - ID of the friend request
   */
  declineFriendRequest(requestId: string): void {
    this.friendshipService.declineFriendRequest(requestId).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error('Error declining friend request:', err)
    });
  }

  /**
   * Resets the form fields after a successful post.
   */
  private resetForm(): void {
    this.newPostTitle = '';
    this.newPostContent = '';
  }

  /**
   * 
   */
  likePost(postId: string): void{
    this.postService.likePost(this.loggedInUserId, postId).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.log('Error handling request: ', err)
    });
  }

  /**
   * 
   */
  dislikePost(postId: string): void{
    this.postService.dislikePost(this.loggedInUserId, postId).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => {console.log('Error handling request: ', err);
      }
    });
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
