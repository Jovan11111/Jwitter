import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { DeleteprofilemodalComponent } from '../deleteprofilemodal/deleteprofilemodal.component';
import { ChangepasswordmodalComponent } from '../changepasswordmodal/changepasswordmodal.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../models/User';
import e from 'express';

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule, RouterModule, DeleteprofilemodalComponent, ChangepasswordmodalComponent, SidebarComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{
  
  constructor(private userService: UserServiceService) {}

  loggedInUserId: string = '';
  changePasswordModalOpen: boolean = false;
  deleteProfileModalOpen: boolean =  false;
  friendshipNotifications = true;
  messageNotifications = true;

  postVisibility: string = "";
  likeVisibility: string = "";
  friendVisibility: string = "";
  emailVisibility: string = "";
  
  user: User = new User();
  
  ngOnInit(): void {
    this.decodeToken();
    this.getUser();
  }

  /**
   * Decodes JWT token and sets the logged-in user ID.
   */
  private decodeToken(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      this.loggedInUserId = decoded.userId;
      
    }
  }

  private getUser(){
    this.userService.getUserById(this.loggedInUserId).subscribe({
      next: (usr: User) =>{        
        this.user = usr;
        this.friendshipNotifications = usr.frReqNotifs;
        this.messageNotifications = usr.messageNotifs;
        this.postVisibility = usr.postVisibility;
        this.likeVisibility = usr.likeVisibility;
        this.friendVisibility = usr.friendVisibility;
        this.emailVisibility = usr.emailVisibility;
      },
      error: (err: any) =>{
        console.error("Failed to get user: ", err);
      }
    })
  }

  openChangePasswordModal(): void {
    this.changePasswordModalOpen = true;
  }
  openDeleteProfileModal(): void {
    this.deleteProfileModalOpen = true;
  }
  closeDeleteProfileModal(): void {
    this.deleteProfileModalOpen = false;
  }
  closeChangePasswordModal(): void {
    this.changePasswordModalOpen = false
  }
  toggleFriendshipNotifications(): void {
    this.friendshipNotifications = !this.friendshipNotifications;
  }
  toggleMessageNotifications(): void {
    this.messageNotifications = !this.messageNotifications;
  }

  saveNotificationSettings(): void {
    this.userService.saveNotificationSettings(this.loggedInUserId, this.friendshipNotifications, this.messageNotifications).subscribe({
      next: () => {
        console.log("Saved");
      }, 
      error: (err: any) =>{
        console.error("Failed to save: ",err);
      }
    })
  }

  saveVisibilitySettings(): void {
    this.userService.saveVisibilitySettings(this.loggedInUserId, this.postVisibility, this.likeVisibility, this.friendVisibility, this.emailVisibility).subscribe({
      next: () => {
        console.log("saved");
      },
      error: (err: any) =>{
        console.error("Failed to save: ", err);
        
      }
    })
  }
}
