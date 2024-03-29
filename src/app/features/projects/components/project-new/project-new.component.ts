import { Component, inject } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Store } from '@ngrx/store';
import { ProjectPayload } from '../../models/project-payload.model';
import { addProject } from '../../store/projects.actions';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-new',
  standalone: true,
  imports: [ProjectFormComponent],
  templateUrl: './project-new.component.html',
  styleUrl: './project-new.component.scss'
})
export class ProjectNewComponent {
  private store = inject(Store);
  private router = inject(Router);

  onSave(payload: ProjectPayload) {
    const defaultSectionId = uuid();
    const id = uuid();
    const project = {
      ...payload,
      defaultSectionId,
      id,
      isActive: true,
      isFavorite: false,
      order: 1,
      ownerId: '1',
      sections: [
       {
        name: 'default',
        id: defaultSectionId,
        isOpen: true,
        order: 1,
        projectId: id
       }
      ]
    }

    this.store.dispatch(addProject({ project }));
    this.router.navigate(['projects', id]);
  }
}
