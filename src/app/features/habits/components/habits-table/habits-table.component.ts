import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CalendarService } from '../../../../shared/services/calendar.service';
import { Store } from '@ngrx/store';
import { selectHabitsState } from '../../store/habits.feature';
import { CommonModule } from '@angular/common';
import { HabitsTableRowComponent } from '../habits-table-row/habits-table-row.component';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [CommonModule, RouterLink, HabitsTableRowComponent],
  templateUrl: './habits-table.component.html',
  styleUrl: './habits-table.component.scss'
})
export class HabitsTableComponent {
  private calendar = inject(CalendarService);
  private store = inject(Store);

  dates = this.calendar.getDaysOfMonth(this.calendar.getCurrentYear(), this.calendar.getCurrentMonth());
  habits$ = this.store.select(selectHabitsState);
  today = this.calendar.getToday().date;
}