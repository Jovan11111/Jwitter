import { Component, OnInit } from '@angular/core';
import { Post } from '../models/Post';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../services/post.service';
import { PostcardComponent } from '../postcard/postcard.component';

@Component({
  selector: 'app-appealdeletedpost',
  imports: [
      FormsModule,
      CommonModule,
      RouterModule,
      PostcardComponent
    ],
  templateUrl: './appealdeletedpost.component.html',
  styleUrl: './appealdeletedpost.component.css'
})
export class AppealdeletedpostComponent implements OnInit{
  
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService){}

  deletedPost: Post = new Post;
  showWholePost: boolean = true;
  loggedInUserId: string = "";
  appealSubmitted: boolean = false;

  ngOnInit(): void {
    const deletedPostId = this.activatedRoute.snapshot.paramMap.get('pid') || ''
    this.loggedInUserId = this.activatedRoute.snapshot.paramMap.get('uid') || ''
    this.postService.getPostById(deletedPostId).subscribe({
      next: (p: Post) =>{
        this.deletedPost = p;
      },
      error: (err) =>{
        console.error("Failed to get post: ", err);
      }
    })
  }

  appeal(): void {
    this.appealSubmitted = true;
  }

}
