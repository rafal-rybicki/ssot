import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { SectionPayload } from '../../models/section-payload.model';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-section-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './section-editor.component.html',
  styleUrl: './section-editor.component.scss'
})
export class SectionEditorComponent {
  @Input() name: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<SectionPayload>();

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    name: new FormControl(this.name, [Validators.required]),
  });

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value as SectionPayload);
      this.form.patchValue({ name: '' });
    }
  }
}
