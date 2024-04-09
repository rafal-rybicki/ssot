import { Component, Input, inject } from '@angular/core';
import { TaskNewComponent } from '../../../tasks/components/task-new/task-new.component';
import { TaskComponent } from '../../../tasks/components/task/task.component';
import { Store, select } from '@ngrx/store';
import { selectTasksBySectionId } from '../../../tasks/store/tasks.feature';
import { SectionContextMenuComponent } from '../section-context-menu/section-context-menu.component';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { SectionEditorComponent } from '../section-editor/section-editor.component';
import { SectionFormData } from '../../models/section-form-data.model';
import { updateSection } from '../../store/sections.actions';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    TaskNewComponent,
    SectionContextMenuComponent,
    SectionEditorComponent
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  private store = inject(Store);

  @Input({ required: true }) name!: string;
  @Input({ required: true }) id!: number;
  @Input({ required: true }) isOpen!: boolean;
  @Input({ required: true }) projectId!: number;

  showEditor = false;

  tasks$ = this.store.pipe(
    select(selectTasksBySectionId), 
    map(obj => obj[this.id])
  )

  update(formData: SectionFormData) {
    this.showEditor = false;
    this.store.dispatch(updateSection({
      sectionId: this.id,
      values: formData
    }));
  }

  toggleEditor() {
    this.showEditor = !this.showEditor;
  }
}