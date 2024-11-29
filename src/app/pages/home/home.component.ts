import { Component, inject, ViewChild } from '@angular/core';
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

import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CardDeleteUserComponent } from '../../shared/components/card-delete-user/card-delete-user.component';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { ProfilePComponent } from '../profile-p/profile-p.component';
import { EventListComponent } from "../event-list/event-list.component";
import { EventDetailsComponent } from "../event-details/event-details.component";
import { EventConsoleResponse } from '../../shared/models/event-console-response';
import { ConocenosComponent } from "../public-content/conocenos/conocenos.component";
import { FunctionalitiesComponent } from "../public-content/functionalities/functionalities.component";
import { InicioComponent } from "../public-content/inicio/inicio.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, EventAsisttanceComponent, EventEditComponent, EventManagmentComponent,
    EventNotificationComponent, SidebarProfileComponent, MatSidenavModule, MatSidenavModule,
    MatNavList, MatButtonModule, MatLabel, EventCommentComponent, LoginComponent, NgScrollbarModule,
    EventNotificationComponent, NgIf, ProfilePComponent,
    RouterLink, MatIcon, MatDivider, EventListComponent, EventDetailsComponent, ConocenosComponent, FunctionalitiesComponent, InicioComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('eventList') eventList!: EventListComponent;
  
  currentView: 'list' | 'details' | 'profile' | 'conocenos' | 'funcionalidades' | 'inicio' = 'inicio';
  selectedEventId?: number;

  onShowDetails(eventId: number) {
    this.selectedEventId = eventId;
    this.currentView = 'details';
  }

  onSearchResults(events: EventConsoleResponse[]) {
    this.currentView = 'list';
    if (this.eventList) {
      this.eventList.updateEvents(events);
    }
  }

  showProfile() {
    this.currentView = 'profile';
  }

  showEventList() {
    this.currentView = 'list';
  }

  showConocenos() {
    this.currentView = 'conocenos';
  }

  showFuncionalidades() {
    this.currentView = 'funcionalidades';
  }

  showInicio() {
    this.currentView = 'inicio';
  }
}
