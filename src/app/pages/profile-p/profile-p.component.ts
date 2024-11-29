import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { CardDeleteUserComponent } from '../../shared/components/card-delete-user/card-delete-user.component';
import { EventEditComponent } from "../event-edit/event-edit.component";
import { EventAsisttanceComponent } from "../event-asisttance/event-asisttance.component";
import { MatDivider } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { EventCommentComponent } from '../event-comment/event-comment.component';
import { SidebarProfileComponent } from '../../shared/components/sidebar-profile/sidebar-profile.component';
import { MatButtonModule } from '@angular/material/button';
import { EventNotificationComponent } from '../event-notification/event-notification.component';
import { MatNavList } from '@angular/material/list';
import { LoginComponent } from '../login/login.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { EventManagmentComponent } from '../event-managment/event-managment.component';
import { ProfileComponent } from '../../shared/components/profile/profile.component';

@Component({
  selector: 'app-profile-p',
  standalone: true,
  imports: [NavbarComponent, EventAsisttanceComponent, EventEditComponent, EventManagmentComponent,
    EventNotificationComponent, SidebarProfileComponent, MatSidenavModule, MatSidenavModule,
    MatNavList, MatButtonModule, MatLabel, EventCommentComponent, LoginComponent, NgScrollbarModule,
    EventNotificationComponent, NgIf, ProfileComponent,
    RouterLink, MatIcon, MatDivider],
  templateUrl: './profile-p.component.html',
  styleUrl: './profile-p.component.css'
})
export class ProfilePComponent {
  private dialog = inject(MatDialog);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  currentPage: string = 'event-edit';

  cambiarEstadoA() {
    this.currentPage = 'event-edit';
  }

  cambiarEstadoB() {
    this.currentPage = 'event-assitance';
  }

  cambiarEstadoC() {
    this.currentPage = 'event-notification';
  }

  cambiarEstadoD() {
    this.currentPage = 'event-managment';
  }

  cambiarEstadoE() {
    this.currentPage = 'profile';
  }

  openDeleteAccountDialog(): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.snackBar.open('Error: No se pudo identificar el usuario', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    const dialogRef = this.dialog.open(CardDeleteUserComponent, {
      width: '400px',
      disableClose: true,
      data: { userName: this.authService.getUser()?.firstName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAccount(userId);
      }
    });
  }

  private deleteAccount(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.snackBar.open('Cuenta eliminada correctamente', 'Cerrar', {
          duration: 3000
        });
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al eliminar la cuenta:', error);
        this.snackBar.open('Error al eliminar la cuenta', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }
}
