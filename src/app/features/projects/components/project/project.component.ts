import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { SectionComponent } from '../section/section.component';
import { Section } from '../../models/section.model';
import { selectProjectsState } from '../../store/projects.feature';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, SectionComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
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