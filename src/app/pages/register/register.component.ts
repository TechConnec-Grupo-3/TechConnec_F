import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../shared/models/register-request.model';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,
    FormsModule, ReactiveFormsModule, MatIconModule, MatCardModule, RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  
  loginForm: FormGroup
  

  errorMessage = signal('');

  constructor() {

    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required], 
      interests: ['', Validators.required], 
    });


  }

  updateErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.loginForm.get('email')?.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const credentials: RegisterRequest = this.loginForm.value;
    credentials.role = "USER"

    console.log(credentials);

    this.authService.register(credentials).subscribe({
      next: () => {
        console.log('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: () => {
        console.log('Error en el registro. Por favor, intenta de nuevo.');
      },
    });


  }
}
