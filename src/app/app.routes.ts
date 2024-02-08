import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HolamundoComponent } from './components/holamundo/holamundo.component';

export const routes: Routes = [
    {path: 'login',component: LoginComponent},
    {path: 'prueva',component: HolamundoComponent},
];
