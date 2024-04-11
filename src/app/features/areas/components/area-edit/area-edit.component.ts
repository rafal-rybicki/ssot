import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AreaFormComponent } from '../area-form/area-form.component';
import { AreaFormData } from '../../models/area-form-data';
import { Store } from '@ngrx/store';
import { updateArea } from '../../store/areas.actions';

@Component({
  selector: 'app-area-edit',
  standalone: true,
  imports: [AreaFormComponent],
  templateUrl: './area-edit.component.html',
  styleUrl: './area-edit.component.scss'
})
export class AreaEditComponent {
  @Input({ required: true }) id!: number;
  @Input({ required: true }) name!: string;
  @Output() close = new EventEmitter<void>();

  private store = inject(Store);

  onClose() {
    this.close.emit();
  }

  onSave(values: AreaFormData) {
    this.store.dispatch(updateArea({ areaId: this.id, values }));
    this.close.emit();
  }
}
