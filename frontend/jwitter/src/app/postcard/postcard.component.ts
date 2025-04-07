import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../models/Post';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-postcard',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './postcard.component.html',
  styleUrl: './postcard.component.css'
})
export class PostcardComponent{

  constructor(private postService: PostService) {}
  
  
  @Input() post !: Post;
  @Input() loggedInUserId !: string;
  @Input() showWholePost !: boolean;

  @Output() refresh = new EventEmitter<void>();
  
  onRefresh(): void{
    this.refresh.emit()
  }
  /**
   * Deletes a post by its ID.
   * @param postId - ID of the post to delete
   */
  deletePost(postId: string): void {
    this.postService.deletePost(postId).subscribe({
      next: () => this.onRefresh(),
      error: (err) => console.error('Error deleting post:', err)
    });
  }

  /**
   * 
   */
  likePost(postId: string): void{
    this.postService.likePost(this.loggedInUserId, postId).subscribe({
      next: () => this.onRefresh(),
      error: (err) => console.log('Error handling request: ', err)
    });
  }

  /**
   * 
   */
  dislikePost(postId: string): void{
    this.postService.dislikePost(this.loggedInUserId, postId).subscribe({
      next: () => this.onRefresh(),
      error: (err) => {console.log('Error handling request: ', err);
      }
    });
  }

  isOwner(): boolean {
    return this.loggedInUserId === this.post.user;
  }

}
