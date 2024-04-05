import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '../../../../shared/models/user.model';
import { AuthPayload } from '../../models/auth-payload.model';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {
  @Input({ required: true }) message!: string;;
  @Input() registrationForm = false;
  @Output() formSubmit = new EventEmitter<AuthPayload>();

  private fb = inject(FormBuilder);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.registrationForm) {
      this.form.addControl('username', this.fb.control('', Validators.required));
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}
