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
  @Input() currentContent: string = '';
  @Input() currentSubtasks: number = 0;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Task>>();

  public taskForm = new FormGroup({
    content: new FormControl(this.currentContent, [Validators.required]),
    subtasks: new FormControl(this.currentSubtasks, [Validators.required]),
  });

  ngOnInit(): void {
    this.taskForm.patchValue({
      content: this.currentContent,
      subtasks: this.currentSubtasks
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    const subtasks = this.taskForm.value.subtasks!
    
    this.save.emit({
      content: this.taskForm.value.content!,
      subtasks: subtasks === 1 ? 0 : subtasks
    });

    this.taskForm.patchValue({
      content: '',
      subtasks: 0
    });
  }

  get isValid() {
    return this.taskForm.valid && 
      (this.taskForm.value.content !== this.currentContent || this.taskForm.value.subtasks !== this.currentSubtasks)
  }
}