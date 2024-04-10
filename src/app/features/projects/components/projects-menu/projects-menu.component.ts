import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { AreaComponent } from '../../../areas/components/area/area.component';
import { Store } from '@ngrx/store';
import { selectAreasState } from '../../../areas/store/areas.feature';
import { selectActiveProjects } from '../../store/projects.feature';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects-menu',
  standalone: true,
  imports: [CommonModule, MenuItemComponent, IconButtonComponent, AreaComponent, RouterLink],
  templateUrl: './projects-menu.component.html',
  styleUrl: './projects-menu.component.scss'
})
export class ProjectsMenuComponent {
  private store = inject(Store);

  areas$ = this.store.select(selectAreasState);
  projects$ = this.store.select(selectActiveProjects);
}
