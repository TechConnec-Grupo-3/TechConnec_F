import { Routes } from '@angular/router';
import { EventEditComponent } from './pages/event-edit/event-edit.component';
import { EventManagmentComponent } from './pages/event-managment/event-managment.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TestComponent } from './pages/test/test.component';
import { ForgotPasswordComponent } from './pages/login/reset-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/login/reset-password/reset-password.component';
import { EventCreateComponent } from './pages/event-create/event-create.component';
import { ConocenosComponent } from './pages/public-content/conocenos/conocenos.component';
import { FunctionalitiesComponent } from './pages/public-content/functionalities/functionalities.component';
import { InicioComponent } from './pages/public-content/inicio/inicio.component';
import { ProfilePComponent } from './pages/profile-p/profile-p.component';
import { PaymentComponent } from './pages/public-content/pages/payment/payment.component';



export const routes: Routes = [
    { path: 'event-edit/:id', component: EventEditComponent },
    { path: '', component: HomeComponent,
      children: [
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        { path: 'inicio', component: InicioComponent },
        { path: 'conocenos', component: ConocenosComponent },
        { path: 'funcionalidades', component: FunctionalitiesComponent },
        { path: 'profile', component: ProfilePComponent }
      ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'test', component: TestComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
    { path: 'event-create', component: EventCreateComponent },
    { path: 'payment/:id', component: PaymentComponent }
    
];
