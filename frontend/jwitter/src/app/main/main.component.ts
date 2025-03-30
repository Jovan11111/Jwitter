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
import { AddpostmodalComponent } from '../addpostmodal/addpostmodal.component';

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    PostcardComponent,
    SidebarComponent,
    AddpostmodalComponent
  ]
})
export class MainComponent implements OnInit {
  posts: Post[] = [];
  friendshipRequests: FriendshipRequest[] = [];
  newPostTitle: string = '';
  newPostContent: string = '';
  loggedInUserId: string = '';
  sidebarCollapsed = false;
  modalOpen = false;

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
   * Adds a new post using form input.
   */
  addPost(): void {
    this.postService
      .createPost(this.newPostTitle, this.newPostContent, this.loggedInUserId)
      .subscribe({
        next: (success: boolean) => {
          if (success) {
            this.resetForm();
            this.ngOnInit();
          } else {
            console.warn('Failed to create post');
          }
        },
        error: (err) => console.error('Error creating post:', err)
      });
  }

  /**
   * Resets the form fields after a successful post.
   */
  private resetForm(): void {
    this.newPostTitle = '';
    this.newPostContent = '';
  }

  openModal(): void {
    this.modalOpen = true;
  }
  
  closeModal(): void {
    this.modalOpen = false;
  }

  submitPostFromModal(postData: { title: string; content: string }): void {
    this.postService.createPost(postData.title, postData.content, this.loggedInUserId)
      .subscribe({
        next: (success: boolean) => {
          if (success) {
            this.loadPosts(); 
            this.closeModal();
          } else {
            console.warn('Failed to create post');
          }
        },
        error: (err) => console.error('Error creating post:', err)
      });
  }
  
}
