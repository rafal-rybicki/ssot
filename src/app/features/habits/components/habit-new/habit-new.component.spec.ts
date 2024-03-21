import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitNewComponent } from './habit-new.component';

describe('HabitNewComponent', () => {
  let component: HabitNewComponent;
  let fixture: ComponentFixture<HabitNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
