import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { EventComponent } from './event/event.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'users', component: UsersComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'event', component: EventComponent },
  { path: '**', redirectTo: '' }
];
