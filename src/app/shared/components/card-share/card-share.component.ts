import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-card-share',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './card-share.component.html',
  styleUrl: './card-share.component.css'
})
export class CardShareComponent {
  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {}

  shareOn(platform: string) {
    console.log(`Compartiendo en ${platform}`);
    
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Título del evento');
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
        break;
      case 'email':
        window.location.href = `mailto:?subject=${title}&body=${url}`;
        break;
    }
  }

  copyLink() {
    this.clipboard.copy(window.location.href);
    this.snackBar.open('Enlace copiado al portapapeles', 'Cerrar', {
      duration: 2000,
    });
  }

  closeCard() {
  }
}
