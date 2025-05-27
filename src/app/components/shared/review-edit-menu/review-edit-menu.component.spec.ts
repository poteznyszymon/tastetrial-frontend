import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEditMenuComponent } from './review-edit-menu.component';

describe('ReviewEditMenuComponent', () => {
  let component: ReviewEditMenuComponent;
  let fixture: ComponentFixture<ReviewEditMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewEditMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
