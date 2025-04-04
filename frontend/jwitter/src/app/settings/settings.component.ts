import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { DeleteprofilemodalComponent } from '../deleteprofilemodal/deleteprofilemodal.component';
import { ChangepasswordmodalComponent } from '../changepasswordmodal/changepasswordmodal.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

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
  
  loggedInUserId: string = '';
  changePasswordModalOpen: boolean = false;
  deleteProfileModalOpen: boolean =  false;
  
  ngOnInit(): void {
    this.decodeToken();
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

}
