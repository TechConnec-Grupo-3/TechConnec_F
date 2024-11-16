import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { NgModel } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CardEventComponent } from '../card-event/card-event.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar-home',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, 
    MatToolbar,MatButtonModule, CardEventComponent, NgFor, MatIconModule,
  RouterOutlet, RouterLink],
  templateUrl: './navbar-home.component.html',
  styleUrl: './navbar-home.component.css'
})
export class NavbarHomeComponent {

}
