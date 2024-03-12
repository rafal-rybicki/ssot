import { Component, HostBinding, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateTask } from '../../store/tasks/tasks.actions';

import { TaskEditorComponent } from '../task-editor/task-editor.component';
import { Task } from '../../models/task.model';
import { TaskContextMenuComponent } from './task-context-menu/task-context-menu.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { TaskCheckboxComponent } from './task-checkbox/task-checkbox.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    TaskCheckboxComponent,
    TaskEditorComponent,
    TaskContextMenuComponent,
    DatePickerComponent
  ],
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
  @Input() completedSubtasks: number = 0;
  @Input() date?: string;
  @Input() subtasks: number = 0;

  isEdited = false;
  showDatePicker = false;

  constructor(private store: Store) {}

  showDescription() {
    alert('there will be modal with description');
  }

  update(values: Partial<Task>) {
    if (values.subtasks! < this.subtasks) {
      values.completedSubtasks = 0;
    }

    this.dispatchValues(values);
    this.toggleEditor();
  }

  setDate(date: string) {
    this.toggleDatePicker();
    this.dispatchValues({ date });
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  toggleEditor() {
    this.isEdited = !this.isEdited;
  }

  get hasSubtasks(): boolean {
    return this.subtasks > 0;
  }

  private dispatchValues(values: Partial<Task>) {
    this.store.dispatch(updateTask({ taskId: this.id, values }));
  }
}