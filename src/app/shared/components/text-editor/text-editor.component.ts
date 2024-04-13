import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent {
  @Input() initialValue: string = '';
  @Input() placeholder: string = 'Name';
  @Input() singleRow: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();

  private fb = inject(FormBuilder);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      text: new FormControl(this.initialValue, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.get('text')?.value);
      this.form.patchValue({ text: '' });
    }
  }
}
