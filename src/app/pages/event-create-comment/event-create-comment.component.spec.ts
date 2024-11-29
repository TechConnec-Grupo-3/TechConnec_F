import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreateCommentComponent } from './event-create-comment.component';

describe('EventCreateCommentComponent', () => {
  let component: EventCreateCommentComponent;
  let fixture: ComponentFixture<EventCreateCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCreateCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCreateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
