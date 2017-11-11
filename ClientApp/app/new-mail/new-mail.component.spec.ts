import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMailComponent } from './new-mail.component';

describe('NewMailComponent', () => {
  let component: NewMailComponent;
  let fixture: ComponentFixture<NewMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
