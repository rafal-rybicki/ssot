import { Component, inject } from '@angular/core';

import { TaskComponent } from '../../components/task/task.component';
import { CommonModule } from '@angular/common';
import { TaskNewComponent } from '../../components/task-new/task-new.component';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectTasksState } from '../../store/tasks/tasks.feature';
import { map, mergeMap, Observable } from 'rxjs';
import { selectProjectsState } from '../../store/projects/projects.feature';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [CommonModule, TaskComponent, TaskNewComponent],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss',
  host: {
    '[class]': "'main-container'",
  }
})
export class ProjectPageComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  name!: string;
  id!: string;
  tasks$!: Observable<Task[]>;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.store.pipe(
        select(selectProjectsState),
        mergeMap(projects => projects.filter(project => project.id === this.id))
      ).subscribe(project => this.name = project.name)

      this.tasks$ = this.store.pipe(
        select(selectTasksState),
        map(tasks => tasks.filter(task => task.projectId === this.id))
      )
    })
  }
}
