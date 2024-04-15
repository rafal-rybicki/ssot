import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { mergeMap } from 'rxjs';
import { selectHabitsState } from '../../store/habits.feature';
import { HabitFormComponent } from '../habit-form/habit-form.component';
import { HabitPayload } from '../../models/habit-payload.model';
import { updateHabit } from '../../store/habits.actions';
import { HabitFormData } from '../../models/habit-form-data.model';

@Component({
  selector: 'app-habit-edit',
  standalone: true,
  imports: [HabitFormComponent],
  templateUrl: './habit-edit.component.html',
  styleUrl: './habit-edit.component.scss',
  host: {
    class: 'container'
  }
})
export class HabitEditComponent {
  private location = inject(Location);
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  currentDailyTarget!: number;
  currentEndDate?: string;
  currentName!: string;
  currentIsShownOnTodayView!: boolean;
  currentStartDate!: string;
  currentWeekDays!: number[];
  id!: number;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = Number(params['id']);
      this.store.pipe(
        select(selectHabitsState),
        mergeMap(habits => habits.filter(habit => habit.id === this.id))
      ).subscribe(habit => {
        this.currentDailyTarget = habit.dailyTarget;
        this.currentEndDate = habit.endDate;
        this.currentName = habit.name;
        this.currentIsShownOnTodayView = habit.isShownOnTodayView;
        this.currentStartDate = habit.startDate;
        this.currentWeekDays = habit.weekDays;
      })
    })
  }

  onSave(formData: HabitFormData) {
    this.store.dispatch(updateHabit({ habitId: this.id, values: formData }));
    this.location.back();
  }
}