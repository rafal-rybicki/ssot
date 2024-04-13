import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { AreaComponent } from '../../../areas/components/area/area.component';
import { Store } from '@ngrx/store';
import { selectAreasState } from '../../../areas/store/areas.feature';
import { selectActiveProjects } from '../../store/projects.feature';
import { RouterLink } from '@angular/router';
import { AreaNewComponent } from '../../../areas/components/area-new/area-new.component';
import { map } from 'rxjs';
import { Area } from '../../../areas/models/area.model';

@Component({
  selector: 'app-projects-menu',
  standalone: true,
  imports: [
    CommonModule,
    MenuItemComponent,
    IconButtonComponent,
    AreaComponent,
    RouterLink,
    AreaNewComponent
  ],
  templateUrl: './projects-menu.component.html',
  styleUrl: './projects-menu.component.scss'
})
export class ProjectsMenuComponent {
  private store = inject(Store);

  areas: Area[] = [];

  ngOnInit() {
    this.store.select(selectAreasState).pipe(
      map(areas => [...areas].sort((a, b) => a.order - b.order))
    ).subscribe(areas => this.areas = areas);
  }

  projects$ = this.store.select(selectActiveProjects);
}
