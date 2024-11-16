import { Routes } from '@angular/router';
import { EventEditComponent } from './pages/event-edit/event-edit.component';
import { EventManagmentComponent } from './pages/event-managment/event-managment.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HomePublicComponent } from './pages/home-public/home-public.component';


export const routes: Routes = [
    { path: 'event-edit/:id', component: EventEditComponent },
    { path: '', component: HomePublicComponent },
    { path: 'home', component: HomeComponent },
    { path: 'conocenos', redirectTo: '/home', pathMatch: 'full'  },
    { path: 'funcionalidades', redirectTo: '/home', pathMatch: 'full'  },
    { path: 'registro', redirectTo: '/home', pathMatch: 'full'  },
    { path: 'login', component: LoginComponent }
];
