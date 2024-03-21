import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { CalendarService } from '../../../../shared/services/calendar.service';
import { HabitFormComponent } from '../habit-form/habit-form.component';
import { HabitPayload } from '../../models/habit-payload.mode';
import { v4 as uuid } from 'uuid';
import { addHabit } from '../../store/habits.actions';
import { HabitItem } from '../../models/habit-item.model';

@Component({
  selector: 'app-habit-new',
  standalone: true,
  imports: [HabitFormComponent],
  templateUrl: './habit-new.component.html',
  styleUrl: './habit-new.component.scss',
  host: {
    class: 'container'
  }
})
export class HabitNewComponent {
  private calendar = inject(CalendarService);
  private location = inject(Location);
  private store = inject(Store);

  onSubmit(payload: HabitPayload) {
    const filteredValues = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) => value)
    ) as HabitPayload;
    const items: HabitItem[] = [];
    const habitId = uuid();
    
    this.calendar.getDaysOfMonth(this.calendar.getCurrentYear(), this.calendar.getCurrentMonth()).forEach(date => {
      items.push({
        id: uuid(),
        habitId: habitId,
        isCompleted: false,
        currentValue: 0,
        date: date.value,
      });
    })

    const habit = {
      ...filteredValues,
      id: habitId,
      isActive: true,
      items,
      order: 0,
      ownerId: '1'
    }

    this.store.dispatch(addHabit({ habit }));
    this.location.back();
  }
}
