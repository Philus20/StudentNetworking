import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDots2Component } from './simple-dots2.component';

describe('SimpleDots2Component', () => {
  let component: SimpleDots2Component;
  let fixture: ComponentFixture<SimpleDots2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleDots2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDots2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
