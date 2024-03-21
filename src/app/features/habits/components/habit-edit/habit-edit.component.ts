import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { mergeMap } from 'rxjs';
import { selectHabitsState } from '../../store/habits.feature';
import { HabitFormComponent } from '../habit-form/habit-form.component';
import { HabitPayload } from '../../models/habit-payload.mode';
import { updateHabit } from '../../store/habits.actions';

@Component({
  selector: 'app-habit-edit',
  standalone: true,
  imports: [HabitFormComponent],
  templateUrl: './habit-edit.component.html',
  styleUrl: './habit-edit.component.scss'
})
export class HabitEditComponent {
  private location = inject(Location);
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  currentDailyGoal!: number;
  currentDescription!: string;
  currentEndDate?: string;
  currentName!: string;
  currentIsMonitored!: boolean;
  currentStartDate!: string;
  id!: string;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.store.pipe(
        select(selectHabitsState),
        mergeMap(habits => habits.filter(habit => habit.id === this.id))
      ).subscribe(habit => {
        this.currentDailyGoal = habit.dailyGoal;
        this.currentDescription = habit.description || '';
        this.currentEndDate = habit.endDate;
        this.currentName = habit.name;
        this.currentIsMonitored = habit.isMonitored;
        this.currentStartDate = habit.startDate;
      })
    })
  }

  onSave(payload: HabitPayload) {
    this.store.dispatch(updateHabit({ habitId: this.id, values: payload }));
    this.location.back();
  }
}