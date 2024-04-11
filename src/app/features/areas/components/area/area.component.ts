import { Component, Input, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectActiveProjects } from '../../../projects/store/projects.feature';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from '../../../projects/components/menu-item/menu-item.component';
import { deleteArea } from '../../store/areas.actions';
import { AreaEditComponent } from '../area-edit/area-edit.component';
import { Project } from '../../../projects/models/project.model';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [CommonModule, MenuItemComponent, AreaEditComponent],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) id!: number;
  @Input({ required: true }) isOpen!: boolean;

  private store = inject(Store);

  projects: Project[] = [];
  showEditor = false;

  ngOnInit() {
    this.store.pipe(
      select(selectActiveProjects),
      map(
        projects => projects.filter(project => project.areaId === this.id)
      )
    ).subscribe(projects => this.projects = projects)
  }

  delete() {
    if (confirm('Are you sure you want to delete this area?')) {
      this.store.dispatch(deleteArea({ areaId: this.id }));
    }
  }

  toggleEditor() {
    this.showEditor = !this.showEditor;
  }
}