import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Componentes
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    [UpdateProfileComponent]
  ],
  exports: [
    UpdateProfileComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }