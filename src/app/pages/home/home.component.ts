import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { EventAsisttanceComponent } from '../event-asisttance/event-asisttance.component';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { EventManagmentComponent } from '../event-managment/event-managment.component';
import { EventNotificationComponent } from '../event-notification/event-notification.component';
import { SidebarProfileComponent } from '../../shared/components/sidebar-profile/sidebar-profile.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { EventCommentComponent } from "../event-comment/event-comment.component";
import { LoginComponent } from "../login/login.component";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgIf } from '@angular/common';
import { ProfileComponent } from "../../shared/components/profile/profile.component";
import { NavbarHomeComponent } from "../../shared/components/navbar-home/navbar-home.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, EventAsisttanceComponent, EventEditComponent, EventManagmentComponent,
    EventNotificationComponent, SidebarProfileComponent, MatSidenavModule, MatSidenavModule,
    MatNavList, MatButtonModule, MatLabel, EventCommentComponent, LoginComponent, NgScrollbarModule,
    EventNotificationComponent, NgIf, ProfileComponent, NavbarHomeComponent,
    RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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

}
