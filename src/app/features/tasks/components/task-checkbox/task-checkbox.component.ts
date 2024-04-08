import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateTask } from '../../store/tasks.actions';

@Component({
  selector: 'app-task-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './task-checkbox.component.html',
  styleUrl: './task-checkbox.component.scss'
})
export class TaskCheckboxComponent {
  private store = inject(Store);

  @Input({ required: true }) id!: number;
  @Input({ required: true }) isCompleted!: boolean;
  @Input({ required: true }) subtasks!: number;
  @Input({ required: true }) completedSubtasks!: number;

  changeCompletion() {
    if (!this.isCompleted) {
      if (this.hasSubtasks && !this.allSubtasksAreCompleted) {
        this.completedSubtasks = this.completedSubtasks + 1;
      } 
      
      if (!this.hasSubtasks || this.allSubtasksAreCompleted) {
        this.isCompleted = true;
      }
    } else {
      this.isCompleted = false;
      this.completedSubtasks = 0;
    }

    this.store.dispatch(updateTask({
      taskId: this.id,
      values: {
        isCompleted: this.isCompleted,
        completedSubtasks: this.completedSubtasks
      }
    }));
  }

  private get allSubtasksAreCompleted(): boolean {
    return this.completedSubtasks === this.subtasks;
  }

  private get hasSubtasks() {
    return this.subtasks !== 0;
  }
}
