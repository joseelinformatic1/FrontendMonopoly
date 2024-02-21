import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { RouterLink } from '@angular/router';
export { Jugador };


interface Jugador {
  nombre: string;
  color: string;
  contador: number;
  posicion: number;
}

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent implements OnInit{

  ngOnInit(): void {}

  jugadores: Jugador[] = [];
  jugadoresParaDiv: Jugador[] = []; // Nueva lista para los jugadores en el div
  maximoJugadores: number = 4;
  minimoJugadores: number = 0;
  coloresDisponibles: string[] = ['yellow', 'green', 'blue', 'red', 'orange', 'black', 'brown', 'pink'];
  mostrarBotonJugar: boolean = false;
  mostrarDivPartida: boolean = false;
  numeroPartida: number = 0;
  partidaCreada: boolean = false;
  @Input() esAdmin: boolean = false;
  @Output() adminModeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() jugarPartidaClicked: EventEmitter<Jugador[]> = new EventEmitter<Jugador[]>();
  // Variable para controlar la visibilidad del botón de reset
  mostrarResetButton: boolean = false;



  constructor(private playerService: PlayerService) {}

  // Función para resetear los jugadores
  resetear(): void {
    this.jugadores = [];
    this.playerService.resetearJugadores();
    this.coloresDisponibles = ['yellow', 'green', 'blue', 'red', 'orange', 'black', 'brown', 'pink'];
    this.mostrarBotonJugar = false;
    this.mostrarResetButton = false;
  }

  toggleAdminMode() {
    this.esAdmin = !this.esAdmin;
    this.adminModeChanged.emit(this.esAdmin);
  }

  agregarJugador(nombre: string, color: string, event: Event) {
    event.preventDefault();
    if (this.jugadores.find(jugador => jugador.nombre === nombre)) {
      alert('There´s a player with that name.');
      return;
    }
    if (nombre.trim() && this.jugadores.length < this.maximoJugadores) {
      const indiceColor = this.coloresDisponibles.indexOf(color);
      if (indiceColor !== -1) {
        const jugador: Jugador = { nombre, color, contador: 0, posicion: 0 };
        this.jugadores.push(jugador);
        this.jugadoresParaDiv.push(jugador);
        this.playerService.agregarJugador(jugador); 
        this.coloresDisponibles.splice(indiceColor, 1);
        if (this.jugadores.length >= 2) {
          this.mostrarBotonJugar = true;
          this.mostrarResetButton = true;
        }
      } else {
        alert('The selected color is not available.');
      }
    } else {
      if (nombre == "") {
        alert("You need to insert a name to begin the game.")
      } else {
        alert('You cannot add more players to the game.');
      }
    }
  }

  get numeroJugadores(): number {
    return this.jugadores.length;
  }

  eliminarJugador(index: number) {
    const jugadorEliminado = this.jugadores[index];
    this.jugadores.splice(index, 1);
    this.playerService.eliminarJugador(jugadorEliminado);
    this.coloresDisponibles.push(jugadorEliminado.color);
    this.coloresDisponibles.sort();
    if (this.jugadores.length < 2) {
      this.mostrarBotonJugar = false;
    }
  }

  partidasJugadas: Jugador[][] = [];

  jugarPartida() {
    const jugadoresPartidaActual = this.jugadores.map(jugador => ({ ...jugador })); // Copia los jugadores actuales para evitar mutaciones
    this.partidasJugadas.push(jugadoresPartidaActual);
    this.numeroPartida = Math.floor(Math.random() * 1000) + 1;
    this.mostrarDivPartida = true;
    this.partidaCreada = true;
    
  }

  irTablero() {
    const jugadoresCopiados = structuredClone(this.jugadores);
    this.playerService.setJugadores(jugadoresCopiados);
    console.log('Jugadores enviados:', jugadoresCopiados);
  }
  
  
  

  eliminarPartidaGuardada() {
    // Aquí elimina los datos guardados y oculta el div
    // Por ejemplo, puedes restablecer el número de partida y vaciar la lista de jugadores para el div
    this.numeroPartida = 0;
    this.jugadoresParaDiv = [];
    this.mostrarDivPartida = false;
    this.partidaCreada = false;
    console.log("partida borrada exitosamente")
  }

}
