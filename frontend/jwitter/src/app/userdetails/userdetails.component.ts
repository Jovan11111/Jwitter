import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../models/User';
import { Post } from '../models/Post';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { FriendshipService } from '../services/friendship.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

interface CustomJwtPayload extends JwtPayload {
  user_Id: string;
}

@Component({
  selector: 'app-userdetails',
  imports: [FormsModule, CommonModule, RouterModule, BrowserModule],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent implements OnInit{

  constructor(private actRoute: ActivatedRoute, private userServ: UserServiceService, private postServ: PostService, private friendServ: FriendshipService){}
  logged_user_id: string = ""
  user_id: string = ""
  user: User = new User()
  user_posts: Post[] = []
  showbutton: boolean = true
  friends: User[] = []
  myprofile: boolean = false
  ngOnInit() {
    
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
      console.log(authToken);
      this.logged_user_id = decoded.user_Id;
    }
    if(this.user_id === this.logged_user_id) this.myprofile = true;
    
    this.friendServ.areTheyFriends(this.user_id, this.logged_user_id).subscribe({
      next: (aretheyfriends: any) => {
        if(aretheyfriends.friendshipexists) this.showbutton = false
        if(aretheyfriends.frreqexists) this.showbutton = false
      }
    })

    this.friendServ.getUserFriends(this.user_id).subscribe({
      next: (fr: User[]) => {
        this.friends = fr
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

  removeFriend(frid: string){
    this.friendServ.removeFriend(this.logged_user_id, frid).subscribe({
      next: (obj: any) => {
        this.ngOnInit();
      }
    })
  }

}
