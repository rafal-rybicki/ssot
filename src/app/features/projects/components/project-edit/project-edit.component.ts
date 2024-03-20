import { Component, inject } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Store } from '@ngrx/store';
import { updateProject } from '../../store/projects.actions';
import { ProjectPayload } from '../../models/project-payload.model';
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

  currentColor!: string;
  currentName!: string;
  currentView!: string;
  id!: string;

  ngOnInit() {
    [
      this.currentColor,
      this.currentName,
      this.currentView,
      this.id
    ] = Object.values(this.location.getState() as object);
  }

  onSave(payload: ProjectPayload) {
    this.store.dispatch(updateProject({ projectId: this.id, values: payload }));
  }
}
