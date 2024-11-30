import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user.model';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: User | null = null;
  userId: number | null = null;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    // Aquí deberías obtener el ID del usuario del servicio de autenticación
    this.userId = this.authService.getCurrentUserId(); // Este valor debería venir de tu sistema de autenticación
    if (this.userId!=null) {
      this.loadUserProfile(this.userId);
      //console.log(this.userId);
    }
    
  }

  loadUserProfile(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.userProfile = user;
      },
      error: (error) => {
        console.error('Error al cargar el perfil:', error);
      }
    });
  }

  // Convierte el string de intereses en un array
  getInterestsList(): string[] {
    if (!this.userProfile?.interests) return [];
    return this.userProfile.interests.split(',').map(interest => interest.trim());
  }

  // Convierte el string de habilidades en un array
  getSkillsList(): string[] {
    if (!this.userProfile?.skills) return [];
    return this.userProfile.skills.split(',').map(skill => skill.trim());
  }
}
