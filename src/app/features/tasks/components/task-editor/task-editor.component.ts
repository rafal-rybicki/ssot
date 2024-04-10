import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';
import { TaskFormData } from '../../models/task-form-data.model';

@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.scss'
})
export class TaskEditorComponent {
  @Input() currentContent: string = '';
  @Input() currentSubtasks: number = 0;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<TaskFormData>();

  private fb = inject(FormBuilder);

  taskForm!: FormGroup;

  ngOnInit(): void {
    this.taskForm = this.fb.nonNullable.group({
      content: this.currentContent,
      subtasks: this.currentSubtasks
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    this.save.emit({
      content: this.taskForm.value.content!
    });

    this.taskForm.patchValue({
      content: '',
      subtasks: 0
    });
  }

  get isValid() {
    return this.taskForm.valid
  }
}