import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { UserDetailsComponent } from './userdetails/userdetails.component';
import { MessageComponent } from './message/message.component';
import { PostdetailsComponent } from './postdetails/postdetails.component';
import { LogoutComponent } from './logout/logout.component';
import { ChatsComponent } from './chats/chats.component';
import { SettingsComponent } from './settings/settings.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

export const routes: Routes = [

    {path : 'login', component: LoginComponent},
    {path : 'register', component: RegisterComponent},
    {path : 'logout', component: LogoutComponent},
    {path : '', redirectTo:'/login', pathMatch: 'full'},
    {path : 'main', component: MainComponent},
    {path : 'messages/:id', component: MessageComponent},
    {path : 'userdetails/:id', component: UserDetailsComponent},
    {path : 'postdetails/:id', component: PostdetailsComponent},
    {path : 'chats', component: ChatsComponent},
    {path : 'settings', component: SettingsComponent},
    {path : 'reset-password/:token', component: ResetpasswordComponent}
];
