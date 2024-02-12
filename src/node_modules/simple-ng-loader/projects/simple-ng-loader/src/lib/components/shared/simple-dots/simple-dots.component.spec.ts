import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDotsComponent } from './simple-dots.component';

describe('SimpleDotsComponent', () => {
  let component: SimpleDotsComponent;
  let fixture: ComponentFixture<SimpleDotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleDotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
