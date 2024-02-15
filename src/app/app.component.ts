import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HttpClient } from '@angular/common/http';
import { TableroComponent } from './components/tablero/tablero.component';
import { AddPlayerComponent } from "./components/add-player/add-player.component";


HttpClient
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LoginComponent, TableroComponent, AddPlayerComponent]
})
export class AppComponent {
  title = 'CursoAngular';
}
