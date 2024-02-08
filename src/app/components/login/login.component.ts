import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true, // Correct property name
  imports: [CommonModule, ReactiveFormsModule], // Quita HttpClient de aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Correct property name
})

export class LoginComponent implements OnInit{

  formulario!: FormGroup;
  isLoogendIN = false;
  isLoginFailed=false;
  errorMessage='';
  isSuccesful = false;
  isSignUpFailed = false;
  roles:string[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService) {
    
   }

  

  ngOnInit(): void {
    this.createForm();
  }
  

  createForm() {
    this.formulario = this.formBuilder.group({
      nickname: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator()]]
    });
  }
  onSubmit(): void {
    const nickname = this.formulario.get('nickname')?.value;
    const password = this.formulario.get('password')?.value;

    this.authService.login(nickname, password).subscribe({
      next: data => {
      
        console.log(data); // Puedes hacer algo con la respuesta del servicio
      },
      error: err => {
        console.error(err); // Maneja el error como desees
      }
    });
  }

  // Custom validator for password
  passwordValidator(): any {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialCharacter = /[-_!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      
      if (!hasNumber || !hasSpecialCharacter || !hasLowerCase) {
        return { invalidPassword: true };
      }
      
      return null;
    };
  }

  crear(): void {
    const nickname = this.formulario.get('nickname')?.value;
    const nombre = this.formulario.get('nombre')?.value;
    const email = this.formulario.get('email')?.value;
    const password = this.formulario.get('password')?.value;
    this.authService.register(nickname,nombre,email,password).subscribe({
      next: data =>{
        console.log(data);
        this.isSuccesful = true;
        this.isSignUpFailed = false;
      },
      error:err =>{
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });

    if (this.formulario.valid) {
      let formData = this.formulario.value;
      console.log(formData);
    } else {
      console.log("Formulario inválido");
    }
  }

  panelActive: boolean = false;

  togglePanel(event: Event) {
    event.preventDefault(); // Prevent page reload
    this.panelActive = !this.panelActive;
  }
}
