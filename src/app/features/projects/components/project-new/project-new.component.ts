import { Component, inject } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Store } from '@ngrx/store';
import { addProject } from '../../store/projects.actions';
import { v4 as uuidv4  } from 'uuid';
import { Router } from '@angular/router';
import { ProjectFormData } from '../../models/project-form-data.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-project-new',
  standalone: true,
  imports: [ProjectFormComponent],
  templateUrl: './project-new.component.html',
  styleUrl: './project-new.component.scss'
})
export class ProjectNewComponent {
  private auth = inject(AuthService);
  private store = inject(Store);
  private router = inject(Router);

  onSave(formData: ProjectFormData) {
    const uuid = uuidv4();
    const projectPayload = {
      ...formData,
      uuid,
      order: 1,
      ownerId: this.auth.userId,
    }

    this.store.dispatch(addProject({ projectPayload }));
    this.router.navigate(['projects', uuid]);
  }
}
