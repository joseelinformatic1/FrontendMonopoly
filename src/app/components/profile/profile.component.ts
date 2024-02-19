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
      nickname: [null, Validators.required], // Añade esto si quieres mostrar/editar el nickname
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]]
    });
    
  }


  ngOnInit(): void {
    // Asumiendo que el nickname se obtiene de alguna fuente válida
    const nickname = this.storageService.getUser()?.nickname;
  
    if (nickname) {
      this.userService.getUserProfile(nickname).subscribe({
        next: (userProfile) => {
          this.currentUser = userProfile;
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
      this.userService.updateUserProfile(this.profile.value).subscribe({
        next: (response) => {
          console.log('Perfil actualizado con éxito', response);
          // Actualiza `currentUser` con los datos actualizados si es necesario
          // Mostrar alguna notificación al usuario sobre el éxito de la operación
        },
        error: (error) => {
          console.error('Error al actualizar el perfil', error);
          // Mostrar alguna notificación al usuario sobre el fallo de la operación
        }
      });
    }
  }
}