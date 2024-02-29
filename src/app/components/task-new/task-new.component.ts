import { Component, Input } from '@angular/core';
import { TaskEditorComponent } from '../task-editor/task-editor.component';
import { Task } from '../../models/task.model';
import { Store } from '@ngrx/store';
import { addTask } from '../../store/tasks/tasks.actions';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-new',
  standalone: true,
  imports: [TaskEditorComponent],
  templateUrl: './task-new.component.html',
  styleUrl: './task-new.component.scss'
})
export class TaskNewComponent {
  @Input() projectId?: number;
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
      date: new Date().valueOf(),
      duration: 5,
      id: Math.random(),
      isCompleted: false,
      isTimeSet: false,
      order: 0,
      ownerId: 1,
      priority: false,
      projectId: this.projectId,
      sectionId: 0,
    }
    
    this.store.dispatch(addTask({ task }))
  }
}