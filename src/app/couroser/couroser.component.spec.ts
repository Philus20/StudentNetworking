import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouroserComponent } from './couroser.component';

describe('CouroserComponent', () => {
  let component: CouroserComponent;
  let fixture: ComponentFixture<CouroserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouroserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouroserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
