import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent implements OnInit {
  ajuego: number[] = [];
  ahtml: number[] = [];
  name: string[] = [];
  total: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.initializeArrays();
  }

  initializeArrays() {
    for (let i = 0; i < 40; i++) {
      this.ajuego.push(i);
      this.ahtml.push(i);
    }

    this.name = ['start', 'mediterranean-ave', 'chest', 'baltic-ave', 'tax', 'railroad', 'oriental-ave', 'chance', 'vermount-ave', 'connecticut-ave', 'prison',
      'charles', 'electric', ' states-ave', 'virginia-ave', 'pensilvania', 'james', 'chest', 'tenessee-ave', 'new-york-ave', 'parking',
      'kentucky-ave', 'chance', 'indiana-ave', 'illinois-ave', 'Band0', 'atlantic-ave', 'ventnor-ave', 'water-works', 'marvin', 'go-prison',
      'pacific-ave', 'carolina-ave', 'chest', 'pennsylvania-ave', 'shortline', 'chance', 'park', 'tax', 'broadwalk'];
  }

  rollDice() {
    // Generar número aleatorio del 1 al 6
    const numeroAleatorio = Math.floor(Math.random() * 6) + 1;

    // Agregar número al contador y obtener el residuo con respecto a 40
    this.total = (this.total + numeroAleatorio) % 40;

    // Si el total es 0, establecerlo en 40
    if (this.total === 0) {
      this.total = 40;
    }

    // Mostrar contador por la consola
    console.log("Contador actual:", this.total);
  }

  selectCasilla(index: number) {
    const numeroCasilla = this.ajuego[index];
    const nombreCasilla = this.name[numeroCasilla];
    console.log("Casilla:"+ {numeroCasilla} +"Nombre:"+ {nombreCasilla});
  }
}


