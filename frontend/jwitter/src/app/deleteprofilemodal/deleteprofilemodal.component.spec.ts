import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteprofilemodalComponent } from './deleteprofilemodal.component';

describe('DeleteprofilemodalComponent', () => {
  let component: DeleteprofilemodalComponent;
  let fixture: ComponentFixture<DeleteprofilemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteprofilemodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteprofilemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
