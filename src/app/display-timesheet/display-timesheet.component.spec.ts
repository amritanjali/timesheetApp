import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTimesheetComponent } from './display-timesheet.component';

describe('DisplayTimesheetComponent', () => {
  let component: DisplayTimesheetComponent;
  let fixture: ComponentFixture<DisplayTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
