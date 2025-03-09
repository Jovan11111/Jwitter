import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../models/User';
import { Post } from '../models/Post';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { FriendshipService } from '../services/friendship.service';
import { FriendshipRequest } from '../models/FriendshipRequest';
import { log } from 'node:console';

interface CustomJwtPayload extends JwtPayload {
  user_Id: string;
}

@Component({
  selector: 'app-userdetails',
  imports: [CommonModule],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent implements OnInit{

  constructor(private actRoute: ActivatedRoute, private userServ: UserServiceService, private postServ: PostService, private friendServ: FriendshipService){}
  logged_user_id: string = ""
  user_id: string = ""
  user: User = new User()
  user_posts: Post[] = []
  usersarefriends: boolean = true
  ngOnInit(): void {
    this.user_id = this.actRoute.snapshot.paramMap.get('id') ?? ''
    this.userServ.getUserById(this.user_id).subscribe({
      next: (userResp: User) => {
        this.user = userResp
      }
    })

    this.postServ.userPosts(this.user_id).subscribe({
      next: (userPosts: Post[]) =>{
        this.user_posts = userPosts
      }
    })

    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      const decoded = jwtDecode<CustomJwtPayload>(authToken);
      this.logged_user_id = decoded.user_Id;
    }
    this.friendServ.areTheyFriends(this.user_id, this.logged_user_id).subscribe({
      next: (aretheyfriends: boolean) => {
        this.usersarefriends = ! aretheyfriends
        console.log(this.usersarefriends);
        
      }
    })


  }

  sendFrReq(){
    this.friendServ.sendFrReq(this.logged_user_id, this.user_id).subscribe({
      next: (sent: Object) => {
        this.ngOnInit()
      }
    })
  }

}
