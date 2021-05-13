import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDefiComponent } from './notification-defi.component';

describe('NotificationDefiComponent', () => {
  let component: NotificationDefiComponent;
  let fixture: ComponentFixture<NotificationDefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationDefiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
