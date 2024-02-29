import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectActiveProjects } from '../../../store/projects/projects.feature';
import { map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [CommonModule, MenuItemComponent],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) id!: number;
  @Input({ required: true }) isOpen!: boolean;

  projects$ = this.store.pipe(
    select(selectActiveProjects),
    map(
      projects => projects.filter(project => project.areaId === this.id)
    ),
  )

  constructor(private store: Store) {}
}