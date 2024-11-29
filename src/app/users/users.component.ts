import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="users-container">
      <div class="users-grid">
        <div class="user-card" *ngFor="let user of users">
          <div class="avatar-container">
            <img [src]="user.avatar" [alt]="user.name" class="user-avatar">
            <div class="role-badge" [class.admin-badge]="user.role === 'Admin'">
              {{ user.role }}
            </div>
          </div>
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p><i class="fas fa-id-badge"></i> ID: {{ user.id }}</p>
            <p><i class="fas fa-envelope"></i> {{ user.email }}</p>
          </div>
          <div class="user-actions">
            <button class="edit-btn" (click)="editUser(user)">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button class="delete-btn" (click)="deleteUser(user)">
              <i class="fas fa-trash"></i> Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .users-container {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: calc(100vh - 64px);
      
    }

    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .user-card {
      background: white;
      border-radius: 15px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .user-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .avatar-container {
      position: relative;
      margin-bottom: 1rem;
    }

    .user-avatar {
      width: 120px;
      height: 120px;
      border-radius: 60px;
      border: 4px solid #2ecc71;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .user-card:hover .user-avatar {
      transform: scale(1.05);
    }

    .role-badge {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #3498db;
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .admin-badge {
      background: #2ecc71;
    }

    .user-info {
      text-align: center;
      margin: 1rem 0;
      width: 100%;
    }

    .user-info h3 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
      font-size: 1.4rem;
    }

    .user-info p {
      color: #7f8c8d;
      margin: 0.3rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .user-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .edit-btn, .delete-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .edit-btn {
      background: #3498db;
      color: white;
    }

    .delete-btn {
      background: #e74c3c;
      color: white;
    }

    .edit-btn:hover, .delete-btn:hover {
      transform: scale(1.05);
      opacity: 0.9;
    }
  `]
})
export class UsersComponent {
  users: User[] = [
    { 
      id: 1, 
      name: 'Juan Pérez', 
      email: 'juan@example.com', 
      role: 'Usuario', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan1'
    },
    { 
      id: 2, 
      name: 'María García', 
      email: 'maria@example.com', 
      role: 'Admin', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria2'
    },
    { 
      id: 3, 
      name: 'Carlos López', 
      email: 'carlos@example.com', 
      role: 'Usuario', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos3'
    },
    { 
      id: 4, 
      name: 'Ana Martínez', 
      email: 'ana@example.com', 
      role: 'Usuario', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana4'
    },
    { 
      id: 5, 
      name: 'Pedro Sánchez', 
      email: 'pedro@example.com', 
      role: 'Admin', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro5'
    }
  ];

  generateAvatarUrl(name: string, id: number): string {
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, '');
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanName}${id}`;
  }

  addUser(user: Partial<User>) {
    const newId = this.users.length + 1;
    const newUser: User = {
      id: newId,
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'Usuario',
      avatar: this.generateAvatarUrl(user.name || '', newId)
    };
    this.users.push(newUser);
  }

  editUser(user: User) {
    Swal.fire({
      title: 'Editar Usuario',
      html: `
      <img src="${user.avatar}" alt="${user.name}" class="edit-avatar">
      <input id="name" class="swal2-input" value="${user.name}">
      <input id="email" class="swal2-input" value="${user.email}">
      <select id="role" class="swal2-select">
        <option value="Usuario" ${user.role === 'Usuario' ? 'selected' : ''}>Usuario</option>
        <option value="Admin" ${user.role === 'Admin' ? 'selected' : ''}>Admin</option>
      </select>
    `,
      customClass: {
        popup: 'edit-user-popup'
      },
      didOpen: () => {
        const style = document.createElement('style');
        style.textContent = `
        .edit-avatar { width: 80px; height: 80px; border-radius: 50%; margin-bottom: 1rem; }
        .edit-user-popup { padding: 1rem; max-width: 430px; }
        .swal2-select { width: 100%; margin: 0.5rem 0; }
      `;
        document.head.appendChild(style);
      },
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2ecc71',
      cancelButtonColor: '#d33',
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const role = (document.getElementById('role') as HTMLSelectElement).value;
        
        return {
          ...user,
          name,
          email,
          role,
          avatar: this.generateAvatarUrl(name, user.id)
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUser = result.value;
        this.users = this.users.map(u => u.id === user.id ? updatedUser : u);
        
        Swal.fire({
          icon: 'success',
          title: '¡Usuario Actualizado!',
          text: `${updatedUser.name} ha sido actualizado exitosamente`,
          confirmButtonColor: '#2ecc71'
        });
      }
    });
  }

  deleteUser(user: User) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al usuario ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter(u => u.id !== user.id);
        Swal.fire(
          '¡Eliminado!',
          'El usuario ha sido eliminado exitosamente',
          'success'
        );
      }
    });
  }
}
