import { Component, Input, inject } from '@angular/core';
import { TaskNewComponent } from '../../../tasks/components/task-new/task-new.component';
import { TaskComponent } from '../../../tasks/components/task/task.component';
import { Store, select } from '@ngrx/store';
import { selectTasksBySectionId } from '../../../tasks/store/tasks.feature';
import { SectionContextMenuComponent } from '../section-context-menu/section-context-menu.component';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { updateSection } from '../../store/sections.actions';
import { Task } from '../../../tasks/models/task.model';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { TextEditorComponent } from '../../../../shared/components/text-editor/text-editor.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    TaskNewComponent,
    SectionContextMenuComponent,
    TextEditorComponent,
    IconButtonComponent
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  private store = inject(Store);

  @Input({ required: true }) name!: string;
  @Input({ required: true }) id!: number;
  @Input({ required: true }) isDefault!: boolean;
  @Input({ required: true }) isOpen!: boolean;
  @Input({ required: true }) projectId!: number;

  showEditor = false;
  nextOrder!: number ;
  tasks: Task[] = [];

  ngOnInit() {
    this.store.pipe(
      select(selectTasksBySectionId), 
      map(obj => obj[this.id])
    ).subscribe(tasks => {
      this.tasks = tasks || [];
      this.nextOrder = (tasks?.length || 0) + 1;
    });
  }

  update(name: string) {
    this.showEditor = false;
    this.store.dispatch(updateSection({
      sectionId: this.id,
      values: { name }
    }));
  }

  toggleEditor() {
    this.showEditor = !this.showEditor;
  }

  toggleOpening() {
    this.store.dispatch(updateSection({
      sectionId: this.id,
      values: { isOpen: !this.isOpen }
    }));
  }
}