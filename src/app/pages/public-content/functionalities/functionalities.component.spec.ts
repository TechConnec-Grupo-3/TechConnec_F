import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalitiesComponent } from './functionalities.component';

describe('FunctionalitiesComponent', () => {
  let component: FunctionalitiesComponent;
  let fixture: ComponentFixture<FunctionalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunctionalitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
