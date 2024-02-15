import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  casillasCompradas: string[] = [];

  constructor() { }

   // Método para determinar si se debe mostrar el botón de comprar para una casilla específica
   mostrarBotonComprarParaCasilla(casilla: string): boolean {
    // Aquí determina las casillas para las cuales no deseas mostrar el botón de comprar
    const casillasSinBotonComprar = ['start', 'tax', 'prison', 'chest1', 'chest2', 'chest3', 'chance1', 'chance2', 'chance3', 'parking', 'go-prison', 'tax2'];
    
    // Verifica si la casilla está en la lista de casillas sin botón de comprar
    return !casillasSinBotonComprar.includes(casilla);
  }

  lanzarDado(total: number): { contador: number, casilla: string, numeroTotal: number } {
    // Generar número aleatorio del 1 al 6
    const numeroAleatorio1 = Math.floor(Math.random() * 6) +1;
    const numeroAleatorio2 = Math.floor(Math.random() * 6) +1;

    console.log(numeroAleatorio1)
    console.log(numeroAleatorio2)
    
    let numeroAleatorio = numeroAleatorio1 + numeroAleatorio2;
    // Agregar número al contador y obtener el residuo con respecto a 40
    total = (total + numeroAleatorio) % 40;
    if(numeroAleatorio1 == numeroAleatorio2){
      console.log("NUMEROS IGUALES")
    }
    // Mostrar contador por la consola
    console.log("Contador actual:", total);

    // Obtener nombre de la casilla
    let casilla = this.obtenerNombreCasilla(total);

    return { contador: total, casilla: casilla, numeroTotal: total};
  }

  obtenerNombreCasilla(numeroCasilla: number): string {
    const name: string[] = ['start','mediterranean-ave','chest1','baltic-ave','tax','railroad','oriental-ave','chance1','vermount-ave','connecticut-ave','prison',
    'charles', 'electric', 'states-ave', 'virginia-ave', 'pensilvania', 'james','chest2','tenessee-ave','new-york-ave','parking', 
    'kentucky-ave','chance2','indiana-ave','illinois-ave','Band0','atlantic-ave','ventnor-ave','water-works','marvin','go-prison',
    'pacific-ave', 'carolina-ave','chest3','pennsylvania-ave','shortline','chance3','park','tax2','broadwalk'];


    return name[numeroCasilla];
  }

  // Método para registrar la compra de una casilla
  comprarCasilla(casilla: string) {
    this.casillasCompradas.push(casilla);
    // Agrega la casilla al array de casillas compradas
    console.log("casilla " + casilla + " añadida a compradas")

  }

}
