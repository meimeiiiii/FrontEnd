import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateRecordComponent } from './activate-record.component';

describe('ActivateRecordComponent', () => {
  let component: ActivateRecordComponent;
  let fixture: ComponentFixture<ActivateRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
