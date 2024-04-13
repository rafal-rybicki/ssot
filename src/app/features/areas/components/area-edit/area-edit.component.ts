import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateArea } from '../../store/areas.actions';
import { TextEditorComponent } from '../../../../shared/components/text-editor/text-editor.component';

@Component({
  selector: 'app-area-edit',
  standalone: true,
  imports: [TextEditorComponent],
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

  onSave(name: string) {
    this.store.dispatch(updateArea({ areaId: this.id, values: { name } }));
    this.close.emit();
  }
}
