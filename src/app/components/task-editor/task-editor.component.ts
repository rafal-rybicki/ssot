import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.scss'
})
export class TaskEditorComponent {
  @Input() content: string = '';
  @Input() subtasks: number = 0;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Task>>();

  public taskForm = new FormGroup({
    content: new FormControl(this.content, [Validators.required]),
    subtasks: new FormControl(this.subtasks, [Validators.required]),
  });

  ngOnInit(): void {
    this.taskForm.patchValue({
      content: this.content,
      subtasks: this.subtasks
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    const subtasks = this.taskForm.value.subtasks!
    
    this.save.emit({
      content: this.taskForm.value.content!,
      allSubtasks: subtasks == 1 ? 0 : subtasks,
    });

    this.taskForm.patchValue({
      content: '',
      subtasks: 0
    });
  }
}
