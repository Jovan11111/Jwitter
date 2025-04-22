import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PostcardComponent } from '../postcard/postcard.component';
import { PostService } from '../services/post.service';
import { Post } from '../models/Post';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { User } from '../models/User';
import { UserServiceService } from '../services/user-service.service';
import { error } from 'console';

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

@Component({
  selector: 'app-admin',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    PostcardComponent,
    SidebarComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent implements OnInit{

  constructor (private postService: PostService, private userService: UserServiceService){}

  appealedPosts: Post[] = [];
  loggedInUserId: string = "";
  showWholePost: boolean = true;
  allUsers: User[] = [];
  allPosts: Post[] = [];
  activeTab: string = "posts";

  ngOnInit(): void {
    this.decodeToken();
    this.getAllPosts();
    this.getAllUsers();
    this.postService.getAppealedPosts().subscribe({
      next: (psts: Post[]) => {
        this.appealedPosts = psts;
      },
      error: (err) => {
        console.error("Failed to get appealed posts");
      }
    })
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

  private getAllPosts(): void {
    this.postService.allPosts().subscribe({
      next: (psts: Post[]) => {
        this.allPosts = psts;
      },
      error: (err) => {
        console.error("Failed to load all posts: ", err);
      }
    })
  }

  private getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (usrs: User[]) => {
        this.allUsers = usrs
      },
      error: (err) => {
        console.error("Failed to load all users: ", err);
      }
    })
  }

  accept(postId: string){
    this.postService.acceptAppeal(postId).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.error("Failed to accept appeal: ", err);
      }
    })
  }

  decline(postId: string){
    this.postService.declineAppeal(postId).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.error("Failed to decline appeal: ", err);
      }
    })
  }

  saveUserRole(userId: string, role: string){
    this.userService.switchUserRole(userId, role).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.error("Failed to decline appeal: ", err);
      }
    })
  }
}
