import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcFieldAddDialogComponent } from './fc-field-add-dialog.component';

describe('FcFieldAddDialogComponent', () => {
  let component: FcFieldAddDialogComponent;
  let fixture: ComponentFixture<FcFieldAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcFieldAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcFieldAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
