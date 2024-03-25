import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { SectionComponent } from '../section/section.component';
import { Section } from '../../models/section.model';
import { selectProjectsState } from '../../store/projects.feature';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { AreaComponent } from '../area/area.component';
import { ProjectContextMenuComponent } from '../project-context-menu/project-context-menu.component';
import { SectionEditorComponent } from '../section-editor/section-editor.component';
import { SectionPayload } from '../../models/section-payload.model';
import { updateProject } from '../../store/projects.actions';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    SectionComponent,
    MenuItemComponent,
    AreaComponent,
    ProjectContextMenuComponent,
    SectionEditorComponent
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  host: {
    class: 'container'
  }
})
export class ProjectComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  showSectionEditor = false;
  id!: string;
  isFavorite!: boolean;
  name!: string;
  sections!: Section[];
  view!: string;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.store.pipe(
        select(selectProjectsState),
        mergeMap(projects => projects.filter(project => project.id === this.id))
      ).subscribe(project => {
        this.isFavorite = project.isFavorite;
        this.name = project.name;
        this.sections = project.sections;
        this.view = project.view;
      })
    })
  }

  toggleSectionEditor() {
    this.showSectionEditor = !this.showSectionEditor;
  }

  saveSection(payload: SectionPayload) {
    const newSection: Section = {
      name: payload.name,
      id: uuid(),
      isOpen: true,
      order: this.sections.length,
      projectId: this.id
    }
    const values = { sections: [...this.sections, newSection] };
    this.store.dispatch(updateProject({ projectId: this.id, values }));
  }
}