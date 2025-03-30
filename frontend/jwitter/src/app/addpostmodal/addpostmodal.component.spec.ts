import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpostmodalComponent } from './addpostmodal.component';

describe('AddpostmodalComponent', () => {
  let component: AddpostmodalComponent;
  let fixture: ComponentFixture<AddpostmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpostmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpostmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
