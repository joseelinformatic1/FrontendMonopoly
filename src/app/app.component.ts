import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { TableroComponent } from './components/tablero/tablero.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, TableroComponent, AddPlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
    this.authService.logout().subscribe({
      next: (res: any) => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}