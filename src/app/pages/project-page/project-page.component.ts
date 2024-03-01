import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { TaskComponent } from '../../components/task/task.component';
import { selectTasksState } from '../../store/tasks/tasks.feature';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskNewComponent } from '../../components/task-new/task-new.component';

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
  id!: string;
  tasks: Task[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      
      this.store.pipe(
        select(selectTasksState),
        map(
          tasks => tasks.filter(task => task.projectId! === this.id)
        )
      ).subscribe(tasks => {
        this.tasks = tasks
      })
    })
  }
}
