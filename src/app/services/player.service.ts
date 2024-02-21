import { Injectable } from '@angular/core';
import { Jugador } from '../components/add-player/add-player.component';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private jugadores: Jugador[] = [];

  

  constructor() {}

  turnoActual: number = 0;

  // Método para establecer la posición de un jugador
  

  // Método para obtener el jugador actual
  getJugadorActual(): Jugador {
    return this.jugadores[this.turnoActual];
  }

  // Método para avanzar al siguiente turno
  avanzarTurno() {
    this.turnoActual = (this.turnoActual + 1) % this.jugadores.length;
  }

  agregarJugador(jugador: Jugador) {
    jugador.contador = 0;
    this.jugadores.push(jugador);
    console.log("jugadores:" + this.jugadores);
  }

  eliminarJugador(jugador: Jugador) {
    const index = this.jugadores.findIndex(j => j.nombre === jugador.nombre);
    if (index !== -1) {
      this.jugadores.splice(index, 1);
    }
  }

  resetearJugadores() {
    this.jugadores = [];
  }

  // Método para establecer los jugadores
  setJugadores(jugadores: Jugador[]) {
    this.jugadores = jugadores;
  }

  // Método para obtener los jugadores
  getJugadores() {
    return this.jugadores;
  }
}
