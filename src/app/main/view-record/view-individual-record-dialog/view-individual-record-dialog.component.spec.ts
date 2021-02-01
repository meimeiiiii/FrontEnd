import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIndividualRecordDialogComponent } from './view-individual-record-dialog.component';

describe('ViewIndividualRecordDialogComponent', () => {
  let component: ViewIndividualRecordDialogComponent;
  let fixture: ComponentFixture<ViewIndividualRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIndividualRecordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIndividualRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
