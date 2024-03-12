import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCheckboxComponent } from './task-checkbox.component';

describe('TaskCheckboxComponent', () => {
  let component: TaskCheckboxComponent;
  let fixture: ComponentFixture<TaskCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCheckboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
