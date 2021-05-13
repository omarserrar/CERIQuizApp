import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueDefiComponent } from './historique-defi.component';

describe('HistoriqueDefiComponent', () => {
  let component: HistoriqueDefiComponent;
  let fixture: ComponentFixture<HistoriqueDefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueDefiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
