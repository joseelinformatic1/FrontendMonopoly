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
  
  constructor(private storageService: StorageService, private userService: UserService, private route : ActivatedRoute,private formBuilder: FormBuilder) { 


    this.profile= this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required,Validators.minLength(6)]
    })
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


  get modify(){
    return "";
  }
  
}