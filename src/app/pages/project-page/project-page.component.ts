import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { selectProjectsState } from '../../store/projects/projects.feature';
import { Section } from '../../models/section.model';
import { SectionComponent } from './section/section.component';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [CommonModule, SectionComponent],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss',
  host: {
    '[class]': "'main-container'",
  }
})
export class ProjectPageComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  name!: string;
  sections!: Section[];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.store.pipe(
        select(selectProjectsState),
        mergeMap(projects => projects.filter(project => project.id === params['id']))
      ).subscribe(project => {
        this.name = project.name;
        this.sections = project.sections;
      })
    })
  }
}