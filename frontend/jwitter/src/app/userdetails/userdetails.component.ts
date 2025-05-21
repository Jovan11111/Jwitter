import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../models/User';
import { Post } from '../models/Post';
import { PostService } from '../services/post.service';
import { FriendshipService } from '../services/friendship.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  imports: [FormsModule, CommonModule, RouterModule, SidebarComponent],
  styleUrls: ['./userdetails.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: string = '';
  loggedInUserId: string = '';
  user: User = new User();
  userPosts: Post[] = [];
  userLikes: Post[] = [];
  friends: User[] = [];
  likeVisibility: string = "";
  postVisibility: string = "";
  friendVisibility: string = "";
  emailVisibility: string = "";
  /**
   * buttonType meaning: 
   *  - 0 : show add friend button
   *  - 1 : show fre req sent text
   *  - 2 : show send message button
   *  - 3 : show settings button
   */
  buttonType: number = 0;
  myProfile: boolean = false;
  activeTab: string = 'posts';

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private postService: PostService,
    private friendshipService: FriendshipService,
    private router: Router
  ) {}

  /**
   * On component init:
   * - Decodes logged-in user from token
   * - Fetches viewed user data, posts, and friends
   * - Checks friendship status
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') ?? '';

      const token = localStorage.getItem('auth_token');
      if (token) {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        this.loggedInUserId = decoded.userId;
        this.myProfile = this.userId === this.loggedInUserId;
      }
      this.loadUserDetails();
    });
  }

  /**
   * Loads user details by ID.
   */
  private loadUserDetails(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user: User) => {
        this.user = user
        this.emailVisibility = this.user.emailVisibility;
        this.loadFriendshipStatus();
      },
      error: (err) => console.error('Failed to load user', err)
    });
  }

  /**
   * Loads posts made by the user.
   */
  private loadUserPosts(): void {
    this.postService.getUserPosts(this.userId).subscribe({
      next: (posts: Post[]) => (this.userPosts = posts),
      error: (err) => console.error('Failed to load user posts', err)
    });
  }

  /**
   * 
   */
  private loadUserLikes(): void {
    this.postService.getUserLikes(this.userId, this.loggedInUserId).subscribe({
      next: (posts: Post[]) => (this.userLikes = posts),
      error: (err) => console.error('Failed to load user likes', err)
    })
  }

  /**
   * Loads friendship status with the viewed user.
   */
  private loadFriendshipStatus(): void {
    if (this.myProfile) {
      this.buttonType = 3;
      this.loadUserPosts();
      this.loadUserLikes();
      this.loadUserFriends();
      return;
    }

    this.friendshipService.areTheyFriends(this.userId, this.loggedInUserId).subscribe({
      next: (status: any) => {
        if (status.friendshipExists){
          this.buttonType = 2;
        } else if(status.frReqExists){
          this.buttonType = 1;
        }

        if(this.user.postVisibility === "everyone" || (this.user.postVisibility === "friends" && this.buttonType === 2)){
          this.loadUserPosts();
        }

        if(this.user.likeVisibility === "everyone" || (this.user.likeVisibility === "friends" && this.buttonType === 2)){
          this.loadUserLikes();
        }

        if(this.user.friendVisibility === "everyone" || (this.user.friendVisibility === "friends" && this.buttonType === 2)){
          this.loadUserFriends();
        }

        if(this.user.emailVisibility === "everyone" || this.user.emailVisibility === "friends" && this.buttonType === 2){} 
        else{
          this.user.email = "";
        }
      },
      error: (err) => console.error('Failed to check friendship status', err)
    });
  }

  /**
   * Loads the list of friends for the viewed user.
   */
  private loadUserFriends(): void {
    this.friendshipService.getUserFriends(this.userId).subscribe({
      next: (friends: User[]) => (this.friends = friends),
      error: (err) => console.error('Failed to load friends', err)
    });
  }

  /**
   * Sends a friend request from the logged-in user to the viewed user.
   */
  sendFriendRequest(): void {
    this.friendshipService.sendFriendRequest(this.loggedInUserId, this.userId).subscribe({
      next: () => this.ngOnInit(), 
      error: (err) => console.error('Failed to send friend request', err)
    });
  }

  /**
   * Removes a friend from the logged-in user's friend list.
   * @param friendId - ID of the friend to remove
   */
  removeFriend(friendId: string): void {
    this.friendshipService.removeFriend(this.loggedInUserId, friendId).subscribe({
      next: () => this.ngOnInit(), 
      error: (err) => console.error('Failed to remove friend', err)
    });
  }
}
