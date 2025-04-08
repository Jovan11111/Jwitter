import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FriendshipRequest } from '../models/FriendshipRequest';
import { FriendshipService } from '../services/friendship.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  @Input() loggedInUserId!: string;
  sidebarCollapsed = false;
  requestsPanelOpen = false;
  friendshipRequests: FriendshipRequest[] = [];

  constructor(private friendshipService: FriendshipService) {}

  ngOnInit(): void {
    this.loadFriendRequests();
    this.loadSidebarState();
  }

  private loadSidebarState(): void {
    const sdbrst = localStorage.getItem('sidebarState')
    if(sdbrst){
      if(sdbrst === "false"){
        this.sidebarCollapsed = false;
      } else{
        this.sidebarCollapsed = true
      }
    } else{
      this.sidebarCollapsed = false
    }
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    if(this.sidebarCollapsed){
      this.requestsPanelOpen = false;
    }
    if(this.sidebarCollapsed){
      localStorage.setItem('sidebarState', "true");
    } else{
      localStorage.setItem('sidebarState', "false");
    }
  }

  toggleRequestsPanel() {
    this.requestsPanelOpen = !this.requestsPanelOpen;
    if (this.requestsPanelOpen) {
      this.loadFriendRequests();
    }
  }

  private loadFriendRequests(): void {
    this.friendshipService.getPendingRequests(this.loggedInUserId).subscribe({
      next: (requests: FriendshipRequest[]) => (this.friendshipRequests = requests),
      error: (err) => console.error('Error fetching friend requests:', err)
    });
  }

  /**
   * Accepts a friend request by ID.
   * @param requestId - ID of the friend request
   */
  acceptFriendRequest(requestId: string): void {
    this.friendshipService.acceptFriendRequest(requestId).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error('Error accepting friend request:', err)
    });
  }

  /**
   * Declines a friend request by ID.
   * @param requestId - ID of the friend request
   */
  declineFriendRequest(requestId: string): void {
    this.friendshipService.declineFriendRequest(requestId).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error('Error declining friend request:', err)
    });
  }

}
