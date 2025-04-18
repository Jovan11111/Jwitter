import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Post } from '../models/Post';
import { User } from '../models/User';
import { UserServiceService } from '../services/user-service.service';
import { PostService } from '../services/post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostcardComponent } from '../postcard/postcard.component';

@Component({
  selector: 'app-search-results',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    PostcardComponent
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit, OnChanges{
  
  @Input() query: string = ""
  @Input() loggedInUserId: string = ""

  posts : Post[] = []
  users : User[] = []
  activeTab: string = "posts"
  showWholePost: boolean = false

  constructor(private userService: UserServiceService, private postService: PostService){}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query'] && !changes['query'].firstChange) {
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    this.postService.searchPosts(this.query).subscribe({
      next: (psts: Post[]) => {
        this.posts = psts;
      },
      error: (err) => {
        console.error("Failed to get queried posts: ", err);
      }
    });

    this.userService.searchUsers(this.query).subscribe({
      next: (usrs: User[]) => {
        this.users = usrs;
      },
      error: (err) => {
        console.error("Failed to get queried users: ", err);
      }
    })
  }
  


}
