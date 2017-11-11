import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedUserComponent } from './logged-user.component';

describe('LoggedUserComponent', () => {
  let component: LoggedUserComponent;
  let fixture: ComponentFixture<LoggedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
