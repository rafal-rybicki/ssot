import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../../core/services/auth.service';
import { HabitItem } from '../../../habits/models/habit-item.model';
import { v4 as uuid } from 'uuid';
import { updateOrCreateHabitItem } from '../../../habits/store/habit-items.actions';
import { selectHabitItemsByIndex } from '../../../habits/store/habit-items..feature';

@Component({
  selector: 'app-habit-task',
  standalone: true,
  imports: [],
  templateUrl: './habit-task.component.html',
  styleUrl: './habit-task.component.scss'
})
export class HabitTaskComponent {
  @Input({ required: true }) date!: string;
  @Input({ required: true }) habitId!: number;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) dailyTarget!: number;

  private auth = inject(AuthService);
  private store = inject(Store);

  habitItem?: HabitItem;

  ngOnInit() {
    this.store.select(selectHabitItemsByIndex).subscribe(habitItems => {
      this.habitItem = habitItems[`${this.habitId}-${this.date}`];
    })
  }

  toggleOrIncrementCurrentValue() {
    let habitItem: HabitItem;

    if (this.habitItem) {
      habitItem = { ...this.habitItem };
    } else {
      habitItem = {
        currentValue: 1,
        date: this.date,
        habitId: this.habitId,
        ownerId: this.auth.userId,
        dailyTarget: this.dailyTarget,
        uuid: uuid()
      };
    }
    this.store.dispatch(updateOrCreateHabitItem({ habitItem }));
  }

  get isCompleted() {
    return this.habitItem && this.habitItem?.currentValue === this.habitItem?.dailyTarget;
  }
}