import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CalendarService } from '../../../../shared/services/calendar.service';
import { Store, select } from '@ngrx/store';
import { selectHabitsState } from '../../store/habits.feature';
import { CommonModule } from '@angular/common';
import { selectHabitItemsByHabitId } from '../../store/habit-items..feature';
import { map, mergeMap, tap } from 'rxjs';
import { HabitItems } from '../../models/habit-items.model';
import { HabitItem } from '../../models/habit-item.model';
import { updateHabitItem } from '../../store/habit-items.actions';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './habits-table.component.html',
  styleUrl: './habits-table.component.scss'
})
export class HabitsTableComponent {
  private calendar = inject(CalendarService);
  private store = inject(Store);

  dates = this.calendar.getDaysOfMonth(this.calendar.getCurrentYear(), this.calendar.getCurrentMonth());
  habits$ = this.store.select(selectHabitsState);
  habitItems!: HabitItems;
  today = this.calendar.getToday().date;

  ngOnInit() {
    this.store.select(selectHabitItemsByHabitId).subscribe(habitItems => this.habitItems = habitItems);
  }
  
  markHabit(habitItem: HabitItem) {
    if (habitItem.date <= this.today) {
      this.store.dispatch(updateHabitItem({ 
        habitItemId: habitItem.id,
        values: this.incrementHabitItem(habitItem.currentValue, habitItem.targetValue)
      }));
    }
  }

  private incrementHabitItem(currentValue: number, targetValue: number) {
    const newValue = currentValue === targetValue ? 0 : currentValue + 1;
    const values = {
      currentValue: newValue,
      isCompleted: newValue === targetValue
    };

    return values;
  }
}