import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true, // Correct property name
  imports: [CommonModule, ReactiveFormsModule], // Quita HttpClient de aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Correct property name
})
@Injectable()
export class LoginComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    
   }
 /*  uploadFile(file: File): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });

    return this.http.post(apiUrl, formData, { headers: headers });

  }*/

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {}
  createForm() {
    this.formulario = this.formBuilder.group({
      nickname: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator()]]
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
    event.preventDefault(); // Prevent page reload
    this.panelActive = !this.panelActive;
  }
}
