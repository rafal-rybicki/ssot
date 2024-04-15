import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HabitFormData } from '../../models/habit-form-data.model';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.scss'
})
export class HabitFormComponent {
  @Input() currentDailyTarget: number = 1;
  @Input() currentEndDate?: string;
  @Input() currentName: string = '';
  @Input() currentIsShownOnTodayView: boolean = true;
  @Input() currentStartDate: string = '';
  @Input() currentWeekDays: number[] = [0, 1, 2, 3, 4, 5, 6];
  @Output() save = new EventEmitter<HabitFormData>();

  private fb = inject(FormBuilder);
  private location = inject(Location);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      dailyTarget: new FormControl(this.currentDailyTarget, [Validators.required]),
      endDate: new FormControl(this.currentEndDate),
      isShownOnTodayView: new FormControl(this.currentIsShownOnTodayView, [Validators.required]),
      name: new FormControl(this.currentName, [Validators.required]),
      startDate: new FormControl(this.currentStartDate, [Validators.required]),
      weekDays: new FormControl(this.currentWeekDays, [Validators.required]),
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