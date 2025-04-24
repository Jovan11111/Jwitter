import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
export class PostcardComponent implements OnInit, OnDestroy{

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }
  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }
  
  showMenu: string | null = null;
  
  @Input() post !: Post;
  @Input() loggedInUserId !: string;
  @Input() showWholePost !: boolean;

  @Output() refresh = new EventEmitter<void>();
  
  isEditing: boolean = false;
  editedContent: string = '';


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

  /**
   * 
   */
  reportPost(postId: string) {
    console.log("TRATRAA");
    
    this.postService.reportPost(postId, this.loggedInUserId).subscribe({
      next: () => this.onRefresh(),
      error: (err) => {console.error('Failed to report a post: ', err);
      }
    })
  }

  /**
   * 
   */
  isOwner(): boolean {
    return this.loggedInUserId === this.post.user;
  }

  /**
   * 
   */
  toggleMenu(postId: string) {
    this.showMenu = this.showMenu === postId ? null : postId;
  }

  /**
   * 
   */
  closeMenu() {
    this.showMenu = null;
  }

  /**
   * 
   */
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.closeMenu();
    }
  }

  startEditing() {
    this.isEditing = true;
    this.editedContent = this.post.content;
  
    setTimeout(() => {
      const textarea = document.getElementById(`edit-area-${this.post._id}`) as HTMLTextAreaElement;
      textarea?.focus();
  
      const escListener = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          this.cancelEdit();
        }
      };
  
      textarea?.addEventListener('keydown', escListener);
    });
  }
  
  cancelEdit() {
    this.isEditing = false;
    this.editedContent = '';
  }
  
  saveEdit(post: Post) {
    post.content = this.editedContent;
    this.postService.editPost(post._id, this.editedContent).subscribe({
      next: () =>{
        this.isEditing = false;
        this.editedContent = '';
      }, 
      error: (err) =>{
        console.error("Failed to edit post: ", err);
      }
    })
  }
}
