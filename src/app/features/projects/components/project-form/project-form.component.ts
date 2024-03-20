import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectPayload } from '../../models/project-payload.model';
import { Location } from '@angular/common';
import { View } from '../../models/view.model';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  @Input() currentColor: string = 'black';
  @Input() currentName: string = '';
  @Input() currentView: string = 'list';
  @Output() save = new EventEmitter<ProjectPayload>();

  private fb = inject(FormBuilder);
  private location = inject(Location);

  form!: FormGroup;
  views = Object.values(View);

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      color: new FormControl(this.currentColor, [Validators.required]),
      name: new FormControl(this.currentName, [Validators.required]),
      view: new FormControl(this.currentView, [Validators.required])
    });
  }

  onClose() {
    this.location.back();
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}
