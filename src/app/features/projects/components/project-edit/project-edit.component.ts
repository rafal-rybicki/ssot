import { Component, inject } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Store, select } from '@ngrx/store';
import { updateProject } from '../../store/projects.actions';
import { ProjectPayload } from '../../models/project-payload.model';
import { ActivatedRoute, Router } from '@angular/router';
import { selectProjectsState } from '../../store/projects.feature';
import { mergeMap } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [ProjectFormComponent],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss'
})
export class ProjectEditComponent {
  private location = inject(Location);
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  currentColor!: string;
  currentName!: string;
  currentView!: string;
  id!: string;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.store.pipe(
        select(selectProjectsState),
        mergeMap(projects => projects.filter(project => project.id === this.id))
      ).subscribe(project => {
        this.currentColor = project.color;
        this.currentName = project.name;
        this.currentView = project.view;
      })
    })
  }

  onSave(payload: ProjectPayload) {
    this.store.dispatch(updateProject({ projectId: this.id, values: payload }));
    this.location.back();
  }
}
