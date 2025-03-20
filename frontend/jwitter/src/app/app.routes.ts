import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { MessageComponent } from './message/message.component';

export const routes: Routes = [

    {path : 'login', component: LoginComponent},
    {path : 'register', component: RegisterComponent},
    {path : '', redirectTo:'/login', pathMatch: 'full'},
    {path : 'main', component: MainComponent},
    {path : 'messages/:id', component: MessageComponent},
    {path : 'userdetails/:id', component: UserdetailsComponent}
];
