import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceNotFoundPageComponent } from './resource-not-found-page.component';

describe('ResourceNotFoundPageComponent', () => {
  let component: ResourceNotFoundPageComponent;
  let fixture: ComponentFixture<ResourceNotFoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceNotFoundPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceNotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
