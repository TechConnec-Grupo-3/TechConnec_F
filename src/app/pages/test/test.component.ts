import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MediaService } from '../../core/services/media.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, NgIf, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  private mediaService = inject(MediaService);
  private snackBar = inject(MatSnackBar);

  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isDragging = false;
  
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
  private readonly MAX_SIZE = 5 * 1024 * 1024; // 5MB

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.processFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      this.processFile(files[0]);
    }
  }

  private processFile(file: File): void {
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      this.showError('El archivo debe ser una imagen (JPG, PNG o GIF)');
      return;
    }

    if (file.size > this.MAX_SIZE) {
      this.showError('La imagen no debe superar los 5MB');
      return;
    }

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  uploadImage(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.mediaService.upload(formData).subscribe({
      next: (response) => {
        console.log('Imagen subida exitosamente:', response);
        this.showSuccess('Imagen subida correctamente');
        // Aquí puedes guardar la URL o filename devuelto
      },
      error: (error) => {
        console.error('Error al subir la imagen:', error);
        this.showError('Error al subir la imagen');
      }
    });
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  getFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}
