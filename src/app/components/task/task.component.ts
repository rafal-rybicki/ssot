import { Component, HostBinding, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteTask, updateTask } from '../../store/tasks/tasks.actions';

import { IconButtonComponent } from '../icon-button/icon-button.component';
import { TaskEditorComponent } from '../task-editor/task-editor.component';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskEditorComponent, IconButtonComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @HostBinding('class.completed') get class() {
    return this.isCompleted;
  }

  @Input({ required: true }) content!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) isCompleted!: boolean;
  @Input() subtasks: number = 0;
  @Input() completedSubtasks: number = 0;

  isEdited = false;

  constructor(private store: Store) {}

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
  }

  showDescription() {
    alert('there will be modal with description');
  }

  delete() {
    this.store.dispatch(deleteTask({ taskId: this.id }));
  }

  update(values: Partial<Task>) {
    if (values.subtasks! < this.subtasks) {
      values.completedSubtasks = 0;
    }

    this.store.dispatch(updateTask({ taskId: this.id, values }));
    this.toggleEditor();
  }

  toggleEditor() {
    this.isEdited = !this.isEdited;
  }

  get hasSubtasks(): boolean {
    return this.subtasks > 0;
  }

  private get allSubtasksAreCompleted(): boolean {
    return this.completedSubtasks === this.subtasks;
  }
}