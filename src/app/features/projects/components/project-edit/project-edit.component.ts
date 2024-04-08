import { Component, inject } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Store, select } from '@ngrx/store';
import { updateProject } from '../../store/projects.actions';
import { ProjectFormData } from '../../models/project-form-data.model';
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
  id!: number;
  uuid!: string;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.uuid = params['uuid'];
      this.store.pipe(
        select(selectProjectsState),
        mergeMap(projects => projects.filter(project => project.uuid === this.uuid))
      ).subscribe(project => {
        this.id = project.id;
        this.currentName = project.name;
        this.currentView = project.view;
      })
    })
  }

  onSave(formData: ProjectFormData) {
    this.store.dispatch(updateProject({ projectId: this.id, values: formData }));
    this.location.back();
  }
}
