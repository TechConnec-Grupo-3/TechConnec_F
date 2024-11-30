import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEventSearchComponent } from './card-event-search.component';

describe('CardEventSearchComponent', () => {
  let component: CardEventSearchComponent;
  let fixture: ComponentFixture<CardEventSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEventSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEventSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
