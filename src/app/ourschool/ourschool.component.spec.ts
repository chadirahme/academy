import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurschoolComponent } from './ourschool.component';

describe('OurschoolComponent', () => {
  let component: OurschoolComponent;
  let fixture: ComponentFixture<OurschoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurschoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
