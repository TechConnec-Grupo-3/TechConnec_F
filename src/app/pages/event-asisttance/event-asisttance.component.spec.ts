import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAsisttanceComponent } from './event-asisttance.component';

describe('EventAsisttanceComponent', () => {
  let component: EventAsisttanceComponent;
  let fixture: ComponentFixture<EventAsisttanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventAsisttanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAsisttanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
