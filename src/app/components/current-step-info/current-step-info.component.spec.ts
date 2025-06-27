import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStepInfoComponent } from './current-step-info.component';

describe('CurrentStepInfoComponent', () => {
  let component: CurrentStepInfoComponent;
  let fixture: ComponentFixture<CurrentStepInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentStepInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentStepInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
