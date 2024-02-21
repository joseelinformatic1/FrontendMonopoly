import { RouterLink, RouterOutlet } from '@angular/router';
import { Component,OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { TableroComponent } from '../tablero/tablero.component';
import { AddPlayerComponent } from '../add-player/add-player.component';
StorageService

@Component({
  selector: 'app-header',
  standalone: true,

  imports: [RouterOutlet, LoginComponent, AddPlayerComponent,RouterLink],

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  usersListVisible: boolean = false;

  esAdmin: boolean = false;

  toggleAdminMode() {
    this.esAdmin = !this.esAdmin;
  }

  toggleAdminModeFromChild(esAdmin: boolean) {
    this.esAdmin = esAdmin;
  }
  
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
     
    }
  }

  logout(): void {
    this.authService.logout();
    this.storageService.removeToken();
    this.isLoggedIn = false;
    window.location.reload(); // Opcional: Recargar la aplicación para limpiar el estado
  }
}