import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDeleteUserComponent } from './card-delete-user.component';

describe('CardDeleteUserComponent', () => {
  let component: CardDeleteUserComponent;
  let fixture: ComponentFixture<CardDeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDeleteUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
