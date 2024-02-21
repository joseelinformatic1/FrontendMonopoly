import { Component, Input, OnInit, } from '@angular/core';
import { DadosService } from '../../services/dados.service';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddPlayerComponent } from '../add-player/add-player.component';
import { Jugador } from '../add-player/add-player.component';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-tablero',
  standalone: true,
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
  imports: [CommonModule],
  animations: [
    trigger('girarCarta', [
      transition('void => *', [
        style({ transform: 'rotateY(0deg) rotateZ(0deg)' }),
        animate('6s', style({ transform: 'rotateY(710deg) rotateZ(0deg)' }))
      ])
    ])
  ]
})
export class TableroComponent implements OnInit{


  ajuego: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39];
  ahtml: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39];
  name: string[] = ['start','mediterranean-ave','chest1','baltic-ave','tax','railroad','oriental-ave','chance1','vermount-ave','connecticut-ave','prison',
  'charles', 'electric', 'states-ave', 'virginia-ave', 'pensilvania', 'james','chest2','tenessee-ave','new-york-ave','parking', 
  'kentucky-ave','chance2','indiana-ave','illinois-ave','Band0','atlantic-ave','ventnor-ave','water-works','marvin','go-prison',
  'pacific-ave', 'carolina-ave','chest3','pennsylvania-ave','shortline','chance3','park','tax2','broadwalk'];  



  soldVisible: boolean = false;
  animacionActiva: boolean = false;
  total = 0;
  casillaActual = '';
  totalNuevo = 0;
  numeroTotal = 0;
  casillaActiva = 0;
  rutaImagen: string = '';
  casillaSeleccionadaParaAgregarImagen: string = '';
  texto: string = '';
  jugadores: any[] = [];

  jugadorActual: Jugador;


  constructor(private dadosService: DadosService, private playerService: PlayerService) { 

    this.jugadorActual = this.playerService.getJugadorActual();
  }

  ngOnInit(): void {
    this.jugadores = this.playerService.getJugadores();
    console.log(this.jugadores);
  }

  avanzarTurno() {
    // Avanzar al siguiente turno cuando sea necesario
    this.playerService.avanzarTurno();
    // Actualizar el jugador actual
    this.jugadorActual = this.playerService.getJugadorActual();
    console.log("turno de " + this.jugadorActual.nombre);
    
  }

  obtenerJugadores() {
    this.jugadores = this.playerService.getJugadores();
  }

  // Método para determinar si se debe mostrar el botón de comprar
  mostrarBotonComprarParaCasilla(casilla: string): boolean {
    return this.dadosService.mostrarBotonComprarParaCasilla(this.casillaActual);
  }

  toggleAnimacion() {
    this.animacionActiva = !this.animacionActiva;
    if (!this.animacionActiva) {
      this.soldVisible = false; // Oculta la imagen si la animación se desactiva
    }
  }

  onButtonClick(): void {
    // Accede al elemento .sold-image después de que la vista se haya renderizado completamente
    const soldImageElement = document.querySelector('.sold-image') as HTMLElement;
    if (soldImageElement) {
      soldImageElement.style.opacity = '0';
    }

    const resultado = this.dadosService.lanzarDado(this.jugadorActual.nombre); // Pasar el nombre del jugador actual
    const totalNuevo = resultado.contador; // Obtener el nuevo contador del resultado
    this.casillaActual = resultado.casilla;
    this.casillaActiva = resultado.numeroTotal;

    this.texto = `Has caído en la casilla ${this.casillaActual}`;
    console.log("Casilla:", this.casillaActual);
    this.rutaImagen = 'assets/img/cards/' + this.casillaActual + '.png'; 
    this.agregarImagenEnCasilla(this.casillaActual);

    this.jugadorActual.contador = totalNuevo; // Actualizar el contador del jugador actual
    console.log("casilla del jugador " + this.jugadorActual.nombre, + " " + totalNuevo);
}


  onCasillaClick(id: string): void {
    // Obtener el número de casilla a partir del ID
    let numeroCasilla = this.ajuego[this.name.indexOf(id)];
    let nombreCasilla = this.name[numeroCasilla];

    console.log(`Casilla: ${numeroCasilla}, Nombre: ${nombreCasilla}`);
    
  }

  agregarImagenEnCasilla(nombreCasilla: string): void {
    // Encuentra el índice de la casilla en el array ajuego
    const indiceCasilla = this.name.indexOf(nombreCasilla);
    
  }

  // Método para realizar la compra de una casilla
  comprarCasilla() {
    // Llama al método del servicio para registrar la compra de la casilla
    this.dadosService.comprarCasilla(this.casillaActual);
  }

  casillaTieneFicha(jugador: Jugador, casilla: string): boolean {
    return jugador.posicion.toString() === casilla;
  }

  
  



  // funcion comentada porque si no se empareja con otras funciones como la de onCasillaClick y no se muestra la casilla correcta
  // funcionCasillas(): void {
  //   for(let j=14, i=0; j<=39; j=j+2, i++){
  //     let cont=0;
  //     this.ajuego[j] = j-2-i;
  //     this.ahtml[this.ajuego[j]] = j;
      
  //     console.log("ajuego[ " + j + "] = " + this.ajuego[j]);
  //   }
  // }

  

}
