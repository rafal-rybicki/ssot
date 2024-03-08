import { Component, Input, inject } from '@angular/core';
import { TaskNewComponent } from '../../../components/task-new/task-new.component';
import { Store, select } from '@ngrx/store';
import { selectTasksBySectionId } from '../../../store/tasks/tasks.feature';
import { TaskComponent } from '../../../components/task/task.component';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule,TaskComponent, TaskNewComponent],
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