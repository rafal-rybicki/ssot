import { Component, HostBinding, HostListener, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { HabitItem } from '../../models/habit-item.model';
import { selectHabitItemsByIndex } from '../../store/habit-items..feature';
import { updateOrCreateHabitItem } from '../../store/habit-items.actions';
import { AuthService } from '../../../../core/services/auth.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-habits-table-cell',
  standalone: true,
  imports: [],
  templateUrl: './habits-table-cell.component.html',
  styleUrl: './habits-table-cell.component.scss'
})
export class HabitsTableCellComponent {
  @Input({ required: true }) habitId!: number;
  @Input({ required: true }) date!: string;
  @Input() targetValue: number = 1;

  private auth = inject(AuthService);
  private store = inject(Store);

  habitItem?: HabitItem;

  @HostBinding('class.completed') get isCompleted() {
    return this.habitItem && this.habitItem?.currentValue === this.habitItem?.targetValue;
  }

  ngOnInit() {
    this.store.select(selectHabitItemsByIndex).subscribe(habitItems => {
      this.habitItem = habitItems[`${this.habitId}-${this.date}`];
    })
  }

  @HostListener('click')
  toggleOrIncrementCurrentValue() {
    let habitItem: HabitItem;

    if (this.habitItem) {
      habitItem = { ...this.habitItem };

      if (this.habitItem.currentValue === this.habitItem.targetValue) {
        habitItem.currentValue = 0;
      } else {
        habitItem.currentValue++;
      }
    } else {
      habitItem = {
        currentValue: 1,
        date: this.date,
        habitId: this.habitId,
        ownerId: this.auth.userId,
        targetValue: this.targetValue,
        uuid: uuid()
      };
    }
    this.store.dispatch(updateOrCreateHabitItem({ habitItem }));
  }
}
