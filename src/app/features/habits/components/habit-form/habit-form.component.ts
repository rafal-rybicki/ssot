import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HabitPayload } from '../../models/habit-payload.mode';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.scss'
})
export class HabitFormComponent {
  @Input() currentDailyGoal: number = 1;
  @Input() currentDescription: string = '';
  @Input() currentEndDate?: string;
  @Input() currentName: string = '';
  @Input() currentIsMonitored: boolean = true;
  @Input() currentStartDate: string = '';
  @Output() save = new EventEmitter<HabitPayload>();

  private fb = inject(FormBuilder);
  private location = inject(Location);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      dailyGoal: new FormControl(this.currentDailyGoal, [Validators.required]),
      description: new FormControl(this.currentDescription),
      endDate: new FormControl(this.currentEndDate),
      isMonitored: new FormControl(this.currentIsMonitored, [Validators.required]),
      name: new FormControl(this.currentName, [Validators.required]),
      startDate: new FormControl(this.currentStartDate, [Validators.required]),
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