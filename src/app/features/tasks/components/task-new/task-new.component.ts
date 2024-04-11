import { Component, Input, inject } from '@angular/core';
import { TaskEditorComponent } from '../task-editor/task-editor.component';
import { Store } from '@ngrx/store';
import { addTask } from '../../store/tasks.actions';
import { v4 as uuid } from 'uuid';
import { TaskFormData } from '../../models/task-form-data.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-task-new',
  standalone: true,
  imports: [TaskEditorComponent],
  templateUrl: './task-new.component.html',
  styleUrl: './task-new.component.scss'
})
export class TaskNewComponent {
  @Input() date?: string;
  @Input({ required: true }) nextOrder!: number;
  @Input() projectId?: number;
  @Input() sectionId?: number;
  
  private auth = inject(AuthService);
  private store = inject(Store);

  showEditor = false;

  onSave(formData: TaskFormData): void {
    const taskPayload = {
      ...formData,
      date: this.date,
      order: this.nextOrder || 0,
      ownerId: this.auth.userId,
      projectId: this.projectId,
      sectionId: this.sectionId,
      uuid: uuid(),
    }

    this.store.dispatch(addTask({ taskPayload }));
  }

  toggleEditor(): void {
    this.showEditor = !this.showEditor;
  }
}