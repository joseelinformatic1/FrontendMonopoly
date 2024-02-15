import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent implements OnInit{

  ngOnInit(): void {}

  jugadores: string[] = [];
  agregarJugador(nombre: string, event: Event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    if (this.jugadores.length < 4 && nombre.trim() !== '') {
      this.jugadores.push(nombre);
    }
    console.log(this.jugadores)
  }
  
    eliminarJugador(index: number) {
      this.jugadores.splice(index, 1);
    }
  
    get numeroJugadores(): number {
      return this.jugadores.length;
      
    }
  
    get maximoJugadores(): number {
      return 4;
    }
  
    get minimoJugadores(): number {
      return 0;
    }
}
