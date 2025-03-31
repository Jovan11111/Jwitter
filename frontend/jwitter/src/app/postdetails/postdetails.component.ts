import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { PostService } from '../services/post.service';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { CommentService } from '../services/comment.service';
import { error } from 'console';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PostcardComponent } from '../postcard/postcard.component';

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

@Component({
  selector: 'app-postdetails',
  imports: [FormsModule, CommonModule, RouterModule, SidebarComponent, PostcardComponent],
  templateUrl: './postdetails.component.html',
  styleUrl: './postdetails.component.css'
})
export class PostdetailsComponent implements OnInit{

  loggedInUserId: string = "";
  openedPostId: string = "";
  openedPost: Post = new Post();
  comments: Comment[] = [];
  newCommentContent: string = "";
  showAddComment: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.openedPostId = this.route.snapshot.paramMap.get('id') ?? '';
    this.decodeToken();
    this.loadPost();
    this.getPostComments();
  }

  private decodeToken(): void {
    const token = localStorage.getItem('auth_token');
    if(token){
      const decoded = jwtDecode<CustomJwtPayload>(token);
      this.loggedInUserId = decoded.userId;
    }
  }

  private loadPost(): void{
    this.postService.getPostById(this.openedPostId).subscribe({
      next: (post: Post) => {
        this.openedPost = post;
      },
      error: (err) => {
        console.log("Error loading the post: ", err);
      }
    })
  }

  private getPostComments(): void{
    this.commentService.getPostComments(this.openedPostId).subscribe({
      next: (coms: Comment[]) => {
        this.comments = coms;
      },
      error: (err) => {
        console.log("Error getting comments");
      }
    })
  }

  addComment(): void{
    this.commentService.addComment(this.loggedInUserId, this.openedPostId, this.newCommentContent).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.log('Failed to add content: ', err)
    });
    this.newCommentContent = "";
    this.showAddComment = false;
  }

  toggleAddComment(): void{
    this.showAddComment = !this.showAddComment;
  }
}
