import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PostcardComponent } from '../postcard/postcard.component';
import { PostService } from '../services/post.service';
import { Post } from '../models/Post';
import { jwtDecode, JwtPayload } from 'jwt-decode';

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

  constructor (private postService: PostService){}

  appealedPosts: Post[] = [];
  loggedInUserId: string = "";
  showWholePost: boolean = true;

  ngOnInit(): void {
    this.decodeToken();
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
}
