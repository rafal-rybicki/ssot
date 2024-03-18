import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProjectsMenuComponent } from './components/projects-menu/projects-menu.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ProjectsMenuComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

}
