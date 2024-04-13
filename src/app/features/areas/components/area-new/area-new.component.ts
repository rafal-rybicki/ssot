import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import { addArea } from '../../store/areas.actions';
import { TextEditorComponent } from '../../../../shared/components/text-editor/text-editor.component';

@Component({
  selector: 'app-area-new',
  standalone: true,
  imports: [TextEditorComponent],
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

  onSubmit(name: string) {
    const areaPayload = {
      name,
      order: 0,
      ownerId: this.auth.userId,
      uuid: uuid(),
    };

    this.store.dispatch(addArea({ areaPayload }));
  }
}
