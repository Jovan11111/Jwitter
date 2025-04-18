import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppealdeletedpostComponent } from './appealdeletedpost.component';

describe('AppealdeletedpostComponent', () => {
  let component: AppealdeletedpostComponent;
  let fixture: ComponentFixture<AppealdeletedpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppealdeletedpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppealdeletedpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
