import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { HabitFormComponent } from '../habit-form/habit-form.component';
import { addHabit } from '../../store/habits.actions';
import { HabitFormData } from '../../models/habit-form-data.model';
import { AuthService } from '../../../../core/services/auth.service';
import { v4 as uuid } from 'uuid';

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
  private auth = inject(AuthService);
  private location = inject(Location);
  private store = inject(Store);

  nextOrder = 0;

  onSave(formData: HabitFormData) {    
    const habit = {
      ...formData,
      order: this.nextOrder,
      ownerId: this.auth.userId,
      uuid: uuid()
    }

    this.store.dispatch(addHabit({ habit }));

    this.location.back();
  }
}
