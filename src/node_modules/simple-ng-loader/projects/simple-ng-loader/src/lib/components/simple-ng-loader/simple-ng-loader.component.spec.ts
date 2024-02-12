import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleNgLoaderComponent } from './simple-ng-loader.component';

describe('SimpleNgLoaderComponent', () => {
  let component: SimpleNgLoaderComponent;
  let fixture: ComponentFixture<SimpleNgLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleNgLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleNgLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
