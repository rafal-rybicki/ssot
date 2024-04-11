import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AreaFormData } from '../../models/area-form-data';

@Component({
  selector: 'app-area-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './area-form.component.html',
  styleUrl: './area-form.component.scss'
})
export class AreaFormComponent {
  @Input() currentName: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<AreaFormData>();

  private fb = inject(FormBuilder);

  form!: FormGroup;
  
  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      name: new FormControl(this.currentName, [Validators.required])
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.close.emit();
    }
  }
}
