import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingHoursSelectorComponent } from './operating-hours-selector.component';

describe('OperatingHoursSelectorComponent', () => {
  let component: OperatingHoursSelectorComponent;
  let fixture: ComponentFixture<OperatingHoursSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatingHoursSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatingHoursSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
