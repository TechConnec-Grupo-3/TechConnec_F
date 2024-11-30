import {ChangeDetectionStrategy, Component, inject, OnInit, Output, EventEmitter} from '@angular/core';
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
import { EventType, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { EventService } from '../../../core/services/event.service';
import { EventConsoleResponse } from '../../../shared/models/event-console-response';
import { AuthService } from '../../../core/services/auth.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, 
    MatToolbar,MatButtonModule, CardEventComponent, NgFor, MatIconModule,
  RouterOutlet, RouterLink, MatToolbarModule, MatAutocompleteModule, FormsModule,
MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  searchType: 'category' | 'eventType' = 'category';
  searchQuery: string = '';
  filteredOptions: any[] = [];
  
  private categories: Category[] = [];
  private eventTypes = [
    { name: 'Conferencia', value: 'CONFERENCE' },
    { name: 'Taller', value: 'WORKSHOP' },
    { name: 'Seminario', value: 'SEMINAR' },
    { name: 'Reunión', value: 'MEETUP' }
  ];

  @Output() searchResults = new EventEmitter<EventConsoleResponse[]>();
  @Output() profileClick = new EventEmitter<void>();
  @Output() conocenosClick = new EventEmitter<void>();
  @Output() funcionalidadesClick = new EventEmitter<void>();
  @Output() inicioClick = new EventEmitter<void>();

  private authService = inject(AuthService);
  private router = inject(Router);
  private eventService = inject(EventService);

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.eventService.getCategories().subscribe(
      categories => this.categories = categories
    );
  }

  onSearchInput() {
    if (!this.searchQuery) {
      this.filteredOptions = [];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    
    if (this.searchType === 'category') {
      this.filteredOptions = this.categories.filter(category =>
        category.name.toLowerCase().includes(query)
      );
    } else {
      this.filteredOptions = this.eventTypes
        .filter(type => type.name.toLowerCase().includes(query))
        .map(type => ({ name: type.name, value: type.value }));
    }
  }

  onOptionSelected(option: any) {
    this.searchQuery = option.name;
    
    if (this.searchType === 'category') {
      this.eventService.searchEvents({ category: option.categoryId })
        .subscribe(events => {
          this.searchResults.emit(events);
        });
    } else {
      this.eventService.searchEvents({ eventType: option.value })
        .subscribe(events => {
          this.searchResults.emit(events);
        });
    }
    this.filteredOptions = [];
  }

  onProfileClick() {
    this.profileClick.emit();
  }

  onConocenosClick() {
    this.conocenosClick.emit();
  }

  onFuncionalidadesClick() {
    this.funcionalidadesClick.emit();
  }

  onInicioClick() {
    this.inicioClick.emit();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
  }

  onLogout() {
    this.authService.logout();
    this.inicioClick.emit();
    this.router.navigate(['/']);
  }
}