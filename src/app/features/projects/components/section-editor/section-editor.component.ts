import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SectionFormData } from '../../models/section-form-data.model';

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
  @Output() save = new EventEmitter<SectionFormData>();

  private fb = inject(FormBuilder);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      name: new FormControl(this.name, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value as SectionFormData);
      this.form.patchValue({ name: '' });
    }
  }
}
