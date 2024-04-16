import { Component, Input, inject } from '@angular/core';
import { Habit } from '../../models/habit.model';
import { CalendarDate } from '../../../../shared/models/calendar-date.model';
import { HabitsTableCellComponent } from '../habits-table-cell/habits-table-cell.component';
import { Store } from '@ngrx/store';
import { deleteHabit } from '../../store/habits.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habits-table-row',
  standalone: true,
  imports: [HabitsTableCellComponent],
  templateUrl: './habits-table-row.component.html',
  styleUrl: './habits-table-row.component.scss'
})
export class HabitsTableRowComponent {
  @Input() dates!: CalendarDate[];
  @Input() habit!: Habit;

  private store = inject(Store);
  private router = inject(Router);

  delete(habitId: number) {
    if (confirm('Are you sure you want to delete this habit?')) {
      this.store.dispatch(deleteHabit({ habitId }));
    }
  }

  edit(habitId: number) {
    this.router.navigate(['/habits/edit', habitId]);
  }
}