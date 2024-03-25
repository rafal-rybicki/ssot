import { Component, Input, inject } from '@angular/core';
import { TaskNewComponent } from '../../../tasks/components/task-new/task-new.component';
import { TaskComponent } from '../../../tasks/components/task/task.component';
import { Store, select } from '@ngrx/store';
import { selectTasksBySectionId } from '../../../tasks/store/tasks.feature';
import { SectionContextMenuComponent } from '../section-context-menu/section-context-menu.component';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule,TaskComponent, TaskNewComponent, SectionContextMenuComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  private store = inject(Store);

  @Input({ required: true }) name!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) isOpen!: boolean;
  @Input({ required: true }) projectId!: string;

  tasks$ = this.store.pipe(
    select(selectTasksBySectionId), 
    map(obj => obj[this.id])
  )
}