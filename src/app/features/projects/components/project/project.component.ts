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

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    SectionComponent,
    MenuItemComponent,
    AreaComponent,
    ProjectContextMenuComponent
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
}