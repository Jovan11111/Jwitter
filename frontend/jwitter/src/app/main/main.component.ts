import { Component, OnInit } from '@angular/core';
import { LogoutComponent } from '../logout/logout.component';
import {Post} from '../models/Post'
import { PostService } from '../services/post.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FriendshipRequest } from '../models/FriendshipRequest';
import { FriendshipService } from '../services/friendship.service';

interface CustomJwtPayload extends JwtPayload {
  user_Id: string;
}


@Component({
  selector: 'app-main',
  imports: [LogoutComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent{

  constructor(private postServ: PostService, private friendServ: FriendshipService){}
  posts: Post[] = []

  newPostTitle: string = ""
  newPostContent: string = ""
  logged_user_id: string = ""
  friendshipRequests: FriendshipRequest[] = []

  ngOnInit(){
    this.postServ.allPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        console.log("Posts fetched:", this.posts); 
      },
      error: (err) => {
        console.log("Error fetching data: ", err);
      }
    });
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      const decoded = jwtDecode<CustomJwtPayload>(authToken);
      this.logged_user_id = decoded.user_Id;
    }
    this.friendServ.getPendingFrReq(this.logged_user_id).subscribe({
      next: (frreq: FriendshipRequest[]) => {
        this.friendshipRequests = frreq
      }
    })
  }

  addPost(){
    this.postServ.createPost(this.newPostTitle, this.newPostContent, this.logged_user_id).subscribe({
      next: (data: boolean) => {
        if(data){
          this.ngOnInit();
        }else{
          console.log("Failed to create a post");
          
        }
      }
    })
  }

  deletePost(id: string){
    this.postServ.deletePost(id).subscribe({
      next: () => {
        this.ngOnInit();
      }
    })
  }

  acceptfrreq(id: string){
    this.friendServ.acceptFrReq(id)
  }

  declinefrreq(id: string){
    this.friendServ.declineFrReq(id)

  }
}
