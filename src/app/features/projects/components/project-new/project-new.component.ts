import { Component, inject } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Store, select } from '@ngrx/store';
import { addProject } from '../../store/projects.actions';
import { v4 as uuidv4  } from 'uuid';
import { Router } from '@angular/router';
import { ProjectFormData } from '../../models/project-form-data.model';
import { selectUserId } from '../../../../core/store/user/user.feature';

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

  ownerId!: number;
  
  ngOnInit() {
    this.store.select(selectUserId).subscribe(userId => this.ownerId = userId)
  }

  onSave(formData: ProjectFormData) {
    const uuid = uuidv4();
    const projectPayload = {
      ...formData,
      uuid,
      order: 1,
      ownerId: this.ownerId,
    }

    this.store.dispatch(addProject({ projectPayload }));
    this.router.navigate(['projects', uuid]);
  }
}
