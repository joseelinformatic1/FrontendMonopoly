import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
<<<<<<< Updated upstream
import { HttpClient } from '@angular/common/http';
import { TableroComponent } from './components/tablero/tablero.component';
=======
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { TableroComponent } from './components/tablero/tablero.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';

>>>>>>> Stashed changes

HttpClient
@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< Updated upstream
  imports: [RouterOutlet,LoginComponent,TableroComponent],
=======
  imports: [RouterOutlet, LoginComponent, TableroComponent, AddPlayerComponent],
>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CursoAngular';
}
