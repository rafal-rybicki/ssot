import { Component, Input } from '@angular/core';
import { TaskEditorComponent } from '../task-editor/task-editor.component';
import { Task } from '../../models/task.model';
import { Store } from '@ngrx/store';
import { addTask } from '../../store/tasks.actions';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-task-new',
  standalone: true,
  imports: [TaskEditorComponent],
  templateUrl: './task-new.component.html',
  styleUrl: './task-new.component.scss'
})
export class TaskNewComponent {
  @Input() date?: string;
  @Input() projectId?: string;
  @Input() sectionId?: string;
  showEditor = false;

  constructor(private store: Store) {}

  toggleEditor(): void {
    this.showEditor = !this.showEditor;
  }

  onSave(values: Partial<Task>): void {
    const task = {
      subtasks: values.subtasks!,
      completedSubtasks: 0,
      content: values.content!,
      date: values.date ? values.date : this.date,
      duration: 5,
      id: uuid(),
      isCompleted: false,
      isTimeSet: false,
      order: 0,
      ownerId: '1',
      priority: false,
      projectId: this.projectId,
      sectionId: this.sectionId
    }
    
    this.store.dispatch(addTask({ task }))
  }
}