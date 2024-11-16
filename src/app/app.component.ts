import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EventManagmentComponent } from "./pages/event-managment/event-managment.component";
import { EventEditComponent } from './pages/event-edit/event-edit.component';
import { EventAsisttanceComponent } from './pages/event-asisttance/event-asisttance.component';
import { EventNotificationComponent } from './pages/event-notification/event-notification.component';
import { LoginComponent } from './pages/login/login.component';
import { CardEventComponent } from "./shared/components/card-event/card-event.component";
import { CardNotificationComponent } from "./shared/components/card-notification/card-notification.component";
import { EventCommentComponent } from "./pages/event-comment/event-comment.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { HomeComponent } from './pages/home/home.component';
import { SidebarProfileComponent } from "./shared/components/sidebar-profile/sidebar-profile.component";

import { ProfileComponent } from "./shared/components/profile/profile.component";
import { CardDeleteComponent } from "./shared/components/card-delete/card-delete.component";
import { CardShareComponent } from './shared/components/card-share/card-share.component';
import { HomePublicComponent } from './pages/home-public/home-public.component';
import { CartComponent } from "./pages/home/purchases/cart/cart.component";
import { TestComponent } from './pages/home/test/test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventManagmentComponent, EventEditComponent, EventAsisttanceComponent,
    EventNotificationComponent, LoginComponent, CardEventComponent, CardNotificationComponent, EventCommentComponent,
    EventCommentComponent, NavbarComponent, HomeComponent, SidebarProfileComponent,
    TestComponent, ProfileComponent, CardDeleteComponent, CardShareComponent,
    RouterLink, HomePublicComponent, CartComponent, TestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'event-api';
}
