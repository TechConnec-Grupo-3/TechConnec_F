import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatDatepickerModule, NgFor,
    MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      interests: ['', Validators.required],
      skills: ['', Validators.required],
      link: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (profile) => {
          this.profileForm.patchValue({
            name: profile.name,
            interests: profile.interests,
            skills: profile.skills,
          link: profile.link
        });
      },
      error: (error) => {
        console.error('Error al cargar el perfil:', error);
      }
    });
  }}

  onSubmit(): void {
    if (this.profileForm.valid) {
      const userId = this.authService.getCurrentUserId();
      if (userId) {
        this.userService.updateUserProfile(userId, this.profileForm.value).subscribe({
          next: () => {
            console.log('Perfil actualizado con éxito');
            this.snackBar.open('Perfil actualizado con éxito', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/profile']);
          },
        error: (error) => {
          console.error('Error al actualizar el perfil:', error);
          console.log(this.profileForm.value)
        }
      });
    }
  }
}
}
