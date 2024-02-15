import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Jugador {
  nombre: string;
  color: string;
}

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent implements OnInit{

  ngOnInit(): void {}

  jugadores: Jugador[] = [];
  maximoJugadores: number = 4;
  minimoJugadores: number = 0;
  coloresDisponibles: string[] = ['yellow', 'green', 'blue', 'red', 'orange', 'black', 'brown', 'pink'];

  agregarJugador(nombre: string, color: string, event: Event) {
    event.preventDefault();
    if (this.jugadores.find(jugador => jugador.nombre === nombre)) {
      alert('Ya hay un jugador con ese nombre.');
      return;
    }
    if (nombre.trim() && this.jugadores.length < this.maximoJugadores) {
      const indiceColor = this.coloresDisponibles.indexOf(color);
      if (indiceColor !== 0) {
        this.jugadores.push({ nombre, color });
        this.coloresDisponibles.splice(indiceColor, 1); // Deletes the selected color of the colors' list
      } else {
        alert('El color seleccionado no está disponible.');
      }
    }
  }

  eliminarJugador(index: number) {
    const jugadorEliminado = this.jugadores[index];
    this.jugadores.splice(index, 1);
    this.coloresDisponibles.push(jugadorEliminado.color); // Return the deleted color to the availables' colors list 
    this.coloresDisponibles.sort(); // Ordenar la lista de colores disponibles
  }

  get numeroJugadores(): number {
    return this.jugadores.length;
  }
}
