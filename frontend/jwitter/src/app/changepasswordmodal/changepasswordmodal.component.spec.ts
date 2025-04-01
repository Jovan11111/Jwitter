import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordmodalComponent } from './changepasswordmodal.component';

describe('ChangepasswordmodalComponent', () => {
  let component: ChangepasswordmodalComponent;
  let fixture: ComponentFixture<ChangepasswordmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangepasswordmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangepasswordmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
