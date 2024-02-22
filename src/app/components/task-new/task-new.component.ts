import { Component } from '@angular/core';
import { TaskEditorComponent } from '../task-editor/task-editor.component';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-new',
  standalone: true,
  imports: [TaskEditorComponent],
  templateUrl: './task-new.component.html',
  styleUrl: './task-new.component.scss'
})
export class TaskNewComponent {
  showEditor = false;

  toggleEditor(): void {
    this.showEditor = !this.showEditor;
  }

  onSave(values: Partial<Task>): void {
    console.log({
      content: values.content!,
      id: Math.random().toString(),
      order: 0,
      projectId: 'projectId',
      subtasks: values.allSubtasks,
      sectionId: 'sectionId',
    })
  }
}