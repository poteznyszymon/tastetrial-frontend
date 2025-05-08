import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceErrorPageComponent } from './resource-error-page.component';

describe('ResourceErrorPageComponent', () => {
  let component: ResourceErrorPageComponent;
  let fixture: ComponentFixture<ResourceErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceErrorPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
