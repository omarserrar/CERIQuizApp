import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefiPageComponent } from './defi-page.component';

describe('DefiPageComponent', () => {
  let component: DefiPageComponent;
  let fixture: ComponentFixture<DefiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefiPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
