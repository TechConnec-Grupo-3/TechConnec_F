import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from "./shared/components/profile/profile.component";
import { CardShareComponent } from './shared/components/card-share/card-share.component';
import { CardDeleteComponent } from './shared/components/card-delete/card-delete.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileComponent, CardShareComponent, CardDeleteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tech-event';
}
