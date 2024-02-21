import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { NgModule } from '@angular/core';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { TableroComponent } from './components/tablero/tablero.component';

export const routes: Routes = [
    {path: 'login',component: LoginComponent},
    {path: 'home',component: HomeComponent},
    {path: 'profile',component: ProfileComponent},
    {path: 'add-player',component: AddPlayerComponent},
    {path: 'user',component: BoardUserComponent},
    {path: 'admin',component: BoardAdminComponent},
    {path: 'tablero',component: TableroComponent},
    {path: '**', redirectTo: 'home', pathMatch:'full'}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule{}