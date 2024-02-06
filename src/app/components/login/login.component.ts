import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule,Validator, Validators } from '@angular/forms';
ReactiveFormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  crear() {
    if (this.formulario.valid) {
      let formData = this.formulario.value;
      console.log(formData);
    } else {
      console.log("Formulario inválido");
    }
  }
  panelActive: boolean = false;

  togglePanel(event: Event) {
    event.preventDefault(); // Evitar la recarga de la página
    this.panelActive = !this.panelActive;
  }
}
