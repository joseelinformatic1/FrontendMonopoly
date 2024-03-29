import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';


import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true, // Correct property name
  imports: [CommonModule, ReactiveFormsModule], // Quita HttpClient de aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Correct property name
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  register: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isSuccesful = false;
  isSignUpFailed = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.loginForm= this.formBuilder.group({
      nickname:['',Validators.required],
      password:['',Validators.required,Validators.minLength(6)]
    }),
    this.register = this.formBuilder.group({
      nickname: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator(6)]],
    });
    
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nickname:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(6)]],
    })
    this.register = this.formBuilder.group({
      nickname: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator(6)]],
    });
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      // Usar optional chaining para evitar errores si .roles es undefined
      this.roles = this.storageService.getUser()?.roles || [];
      this.router.navigate(['home']);
    }
  }
  passwordValidator(minLength: number): any {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      const errors: string[] = [];

      const errorMessages: Record<string, string> = {
        missingNumber: 'one number',
        missingSpecialCharacter: 'one special character',
        missingLowerCase: 'one lowercase letter',
        missingUpperCase: 'one uppercase letter',
        minLength: `${minLength} characters long`,
      };

      const validations: Record<string, RegExp | ((value: string) => boolean)> =
        {
          missingNumber: /[0-9]/,
          missingSpecialCharacter: /[-_!@#$%^&*(),.?":{}|<>]/,
          missingLowerCase: /[a-z]/,
          missingUpperCase: /[A-Z]/,
          minLength: (value: string) => value.length >= minLength,
        };

      for (const [key, validation] of Object.entries(validations)) {
        if (typeof validation === 'function') {
          if (!validation(value)) {
            errors.push(errorMessages[key]);
          }
        } else {
          if (!(validation as RegExp).test(value)) {
            errors.push(errorMessages[key]);
          }
        }
      }

      return errors.length ? errors : null;
    };
  }




  onSubmitLogin(): void {
    if(this.loginForm.invalid){
      return;
    }
    let {nickname,password} = this.loginForm.value;
    this.authService.login(nickname,password).subscribe({
      next:data =>{
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.router.navigate(['home']);
      },
      error:err =>{
        this.errorMessage  = err.error ? err.erro.message: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
        this.isLoginFailed = true;
      }
    })
  }


  onSubmitRegister(): void {
    if (this.register.invalid) {
      console.log('Formulario inválido');
      return;
    }
  
    let nickname = this.register.get('nickname')?.value;
    let nombre = this.register.get('nombre')?.value;
    let email = this.register.get('email')?.value;
    let password = this.register.get('password')?.value;
    
    this.authService.register(nickname, nombre, email, password).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccesful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error.message || 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
        this.isSignUpFailed = true;
      },
    });
  }
  

  // Custom validator for password
 
  
  get RegisterPasswordErrors(): string[] {
    let passwordControl = this.register.get('password');
    return passwordControl ? this.passwordValidator(6)(passwordControl) : [];
  }

  get RegisterNicknameValid() {
    return (
      this.register.get('nickname')!.invalid &&
      this.register.get('nickname')!.touched
    );
  }

  get RegisterNameValid() {
    return (
      this.register.get('nombre')!.invalid &&
      this.register.get('nombre')!.touched
    );
  }

  get RegisterEmailValid() {
    return (
      this.register.get('email')!.invalid &&
      this.register.get('email')!.touched
    );
  }

  get RegisterPasswordValid() {
    return (
      this.register.get('password')!.invalid &&
      this.register.get('password')!.touched
    );
  }





  get PasswordErrors(): string[] {
    let passwordControl = this.loginForm.get('password');
    return passwordControl ? this.passwordValidator(6)(passwordControl) : [];
  }

  get NicknameValid() {
    return (
      this.loginForm.get('nickname')!.invalid &&
      this.loginForm.get('nickname')!.touched
    );
  }

  get NameValid() {
    return (
      this.loginForm.get('nombre')!.invalid &&
      this.loginForm.get('nombre')!.touched
    );
  }

  get EmailValid() {
    return (
      this.loginForm.get('email')!.invalid &&
      this.loginForm.get('email')!.touched
    );
  }

  get PasswordValid() {
    return (
      this.loginForm.get('password')!.invalid &&
      this.loginForm.get('password')!.touched
    );
  }

  panelActive: boolean = false;

  togglePanel(event: Event) {
    event.preventDefault(); // Prevent page reload
    this.panelActive = !this.panelActive;
  }
}
