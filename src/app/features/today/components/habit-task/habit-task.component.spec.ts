import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitTaskComponent } from './habit-task.component';

describe('HabitTaskComponent', () => {
  let component: HabitTaskComponent;
  let fixture: ComponentFixture<HabitTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
