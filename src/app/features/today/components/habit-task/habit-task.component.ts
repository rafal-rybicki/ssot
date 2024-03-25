import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateHabitItem } from '../../../habits/store/habit-items.actions';
import { __values } from 'tslib';

@Component({
  selector: 'app-habit-task',
  standalone: true,
  imports: [],
  templateUrl: './habit-task.component.html',
  styleUrl: './habit-task.component.scss'
})
export class HabitTaskComponent {
  @Input({ required: true }) currentValue!: number;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) isCompleted!: boolean;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) targetValue!: number;

  private store = inject(Store);

  changeCompletion() {
    const values = this.incrementHabitItem(this.currentValue, this.targetValue);
    
    this.store.dispatch(updateHabitItem({habitItemId: this.id, values }));
  }

  private incrementHabitItem(currentValue: number, targetValue: number) {
    const newValue = currentValue === targetValue ? 0 : currentValue + 1;
    const values = {
      currentValue: newValue,
      isCompleted: newValue === targetValue
    };

    return values;
  }

  private get isHabitCompleted(): boolean {
    return this.currentValue === this.targetValue;
  }
}
