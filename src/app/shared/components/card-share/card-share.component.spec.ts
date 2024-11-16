import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardShareComponent } from './card-share.component';

describe('CardShareComponent', () => {
  let component: CardShareComponent;
  let fixture: ComponentFixture<CardShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardShareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
