import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularityComponent } from './circularity.component';

describe('CircularityComponent', () => {
  let component: CircularityComponent;
  let fixture: ComponentFixture<CircularityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircularityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
