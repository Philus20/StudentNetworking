import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeeeComponent } from './meee.component';

describe('MeeeComponent', () => {
  let component: MeeeComponent;
  let fixture: ComponentFixture<MeeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
