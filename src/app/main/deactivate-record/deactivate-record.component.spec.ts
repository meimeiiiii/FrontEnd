import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateRecordComponent } from './deactivate-record.component';

describe('DeactivateRecordComponent', () => {
  let component: DeactivateRecordComponent;
  let fixture: ComponentFixture<DeactivateRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivateRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
