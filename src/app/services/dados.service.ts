import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  casillasCompradas: string[] = [];
  casillasSinBotonComprar: string[] = ['start', 'tax', 'prison', 'chest1', 'chest2', 'chest3', 'chance1', 'chance2', 'chance3', 'parking', 'go-prison', 'tax2'];

  // Objeto para mantener los contadores individuales de cada jugador
  contadoresJugadores: { [key: string]: number } = {};

  constructor() { }

  // Método para determinar si se debe mostrar el botón de comprar para una casilla específica
  mostrarBotonComprarParaCasilla(casilla: string): boolean {
    // Aquí determina las casillas para las cuales no deseas mostrar el botón de comprar
    return !this.casillasSinBotonComprar.includes(casilla);
  }

  // Método para lanzar los dados para un jugador específico
  lanzarDado(jugador: string): { contador: number, casilla: string, numeroTotal: number } {
    // Generar número aleatorio del 1 al 6
    const numeroAleatorio1 = Math.floor(Math.random() * 6) + 1;
    const numeroAleatorio2 = Math.floor(Math.random() * 6) + 1;

    console.log(numeroAleatorio1);
    console.log(numeroAleatorio2);

    const totalAnterior = this.contadoresJugadores[jugador] || 0;
    let total = (totalAnterior + numeroAleatorio1 + numeroAleatorio2) % 40;

    // Guardar el nuevo contador para el jugador
    this.contadoresJugadores[jugador] = total;

    // Obtener nombre de la casilla
    const casilla = this.obtenerNombreCasilla(total);

    return { contador: total, casilla: casilla, numeroTotal: total };
  }

  obtenerNombreCasilla(numeroCasilla: number): string {
    const name: string[] = ['start', 'mediterranean-ave', 'chest1', 'baltic-ave', 'tax', 'railroad', 'oriental-ave', 'chance1', 'vermount-ave', 'connecticut-ave', 'prison',
      'charles', 'electric', 'states-ave', 'virginia-ave', 'pensilvania', 'james', 'chest2', 'tenessee-ave', 'new-york-ave', 'parking',
      'kentucky-ave', 'chance2', 'indiana-ave', 'illinois-ave', 'Band0', 'atlantic-ave', 'ventnor-ave', 'water-works', 'marvin', 'go-prison',
      'pacific-ave', 'carolina-ave', 'chest3', 'pennsylvania-ave', 'shortline', 'chance3', 'park', 'tax2', 'broadwalk'];

    return name[numeroCasilla];
  }

  // Método para registrar la compra de una casilla
  comprarCasilla(casilla: string) {
    if (!this.casillasSinBotonComprar.includes(casilla)) {
      this.casillasCompradas.push(casilla);
      console.log("Casilla " + casilla + " añadida a casillas compradas");
    } else {
      console.log("La casilla " + casilla + " no se puede comprar");
    }
  }
}
