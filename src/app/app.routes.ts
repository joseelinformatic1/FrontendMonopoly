import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';


export const routes: Routes = [
    {path: 'login',component: LoginComponent},
    {path: 'home',component: HomeComponent},
    {path: 'profile',component: ProfileComponent},
    {path: 'user',component: BoardUserComponent},
    {path: 'admin',component: BoardAdminComponent},
    {path: '**', redirectTo: 'home', pathMatch:'full'}
];
