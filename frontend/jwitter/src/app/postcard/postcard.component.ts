import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../models/Post';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-postcard',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './postcard.component.html',
  styleUrl: './postcard.component.css'
})
export class PostcardComponent {
  @Input() post !: Post;
  @Input() loggedInUserId !: string;

  @Output() deletePost = new EventEmitter<string>();
  @Output() like = new EventEmitter<string>();
  @Output() dislike = new EventEmitter<string>();
  
  onDelete(): void {
    this.deletePost.emit(this.post._id);
  }

  onLike(): void {
    this.like.emit(this.post._id);
  }

  onDislike(): void {
    this.dislike.emit(this.post._id);
  }

  isOwner(): boolean {
    return this.loggedInUserId === this.post.user;
  }

}
