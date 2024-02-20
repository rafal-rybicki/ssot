import { Component } from '@angular/core';
import { TaskComponent } from '../../components/task/task.component';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss',
  host: {
    '[class]': "'main-container'",
  }
})
export class ProjectPageComponent {

}
