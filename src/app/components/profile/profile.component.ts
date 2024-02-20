import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { UserPayload } from '../../interfaces/UserPayload';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import {   FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl, } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-profile',
    standalone: true,
    
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [HeaderComponent,ReactiveFormsModule,CommonModule]
})
export class ProfileComponent implements OnInit {
  currentUser: UserPayload | null = null;
  profile: FormGroup;
  modify = true;
  constructor(private storageService: StorageService, private userService: UserService, private route : ActivatedRoute,private formBuilder: FormBuilder) { 


    this.profile = this.formBuilder.group({
    // Añade esto si quieres mostrar/editar el nickname
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]]
    });
    
  }


  ngOnInit(): void {
    let nickname = this.storageService.getUser()?.nickname;
  
    if (nickname) {
      this.userService.getUserProfile(nickname).subscribe({
        next: (userProfile) => {
          this.currentUser = userProfile;
          // Aquí actualizas el formulario con los datos obtenidos
          this.profile.patchValue({
            nombre: userProfile.nombre,
            email: userProfile.email
          });
        },
        error: (error) => {
          console.error('Hubo un error al obtener el perfil del usuario', error);
        }
      });
    } else {
      console.error('Nickname es undefined, asegúrate de que el usuario está correctamente logueado y tiene un nickname');
    }
  }

  toggleModify() {
    this.modify = !this.modify; // Esto alternará correctamente el valor de modify
    console.log("Modo modificar:", this.modify);
  }
  
  
  updateUser() {
    if (this.profile.valid) {
      const nickname = this.storageService.getUser()?.nickname; // Obtiene el nickname del usuario
      if (nickname) {
        // Verifica si el formulario tiene valores antes de crear userData
        const nombreValue = this.profile.get('nombre')?.value;
        const emailValue = this.profile.get('email')?.value;
        
        // Si alguno de los valores es null o undefined, maneja la situación adecuadamente
        if (nombreValue == null || emailValue == null) {
          console.error('Los datos del formulario no son válidos');
          // Manejar el error aquí, posiblemente mostrando un mensaje al usuario
          return;
        }
        
        // Si los valores son válidos, crea el objeto userData
        const userData = {
          nombre: nombreValue,
          email: emailValue
        };
        
        // Llama al servicio para actualizar el perfil con los datos del usuario
        this.userService.updateUserProfile(nickname, userData).subscribe({
          next: (response) => {
            console.log('Perfil actualizado con éxito', response);
            // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
          },
          error: (error) => {
            console.error('Error al actualizar el perfil', error);
            // Manejar el error, posiblemente mostrando un mensaje al usuario
          }
        });
      } else {
        console.error('No se pudo obtener el nickname del usuario para la actualización');
        // Manejar este caso de error, tal vez redirigir al login
      }
    }
  }
  
  
  
}