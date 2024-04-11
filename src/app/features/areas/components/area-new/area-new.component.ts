import { Component, inject } from '@angular/core';
import { AreaFormData } from '../../models/area-form-data';
import { AreaFormComponent } from '../area-form/area-form.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import { addArea } from '../../store/areas.actions';

@Component({
  selector: 'app-area-new',
  standalone: true,
  imports: [AreaFormComponent],
  templateUrl: './area-new.component.html',
  styleUrl: './area-new.component.scss'
})
export class AreaNewComponent {
  private auth = inject(AuthService);
  private store = inject(Store);

  showEditor = false;

  toggleEditor() {
    this.showEditor = !this.showEditor;
  }

  onSave(areaFormData: AreaFormData) {
    const areaPayload = {
      ...areaFormData,
      order: 0,
      ownerId: this.auth.userId,
      uuid: uuid(),
    };

    this.store.dispatch(addArea({ areaPayload }));
  }
}
