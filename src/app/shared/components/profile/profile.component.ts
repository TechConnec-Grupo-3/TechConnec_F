import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  interests: string[] = [
    'Desarrollo Web',
    'Inteligencia Artificial',
    'UX/UI Design',
    'Cloud Computing',
    'Blockchain'
  ];

  skills: string[] = [
    'Angular',
    'TypeScript',
    'Node.js',
    'Python',
    'AWS',
    'Docker'
  ];
}
