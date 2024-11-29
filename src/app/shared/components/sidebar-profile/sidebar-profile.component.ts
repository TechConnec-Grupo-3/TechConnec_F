import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar-profile',
  standalone: true,
  imports: [MatSidenavModule, MatNavList, MatButtonModule, MatLabel],
  templateUrl: './sidebar-profile.component.html',
  styleUrl: './sidebar-profile.component.css'
})
export class SidebarProfileComponent {
  onProfileClick() {
    console.log('Perfil clickeado');
  }

  onNotificationsClick() {
    console.log('Notificaciones clickeadas');
  }
}
