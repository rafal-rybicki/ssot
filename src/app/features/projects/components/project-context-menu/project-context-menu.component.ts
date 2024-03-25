import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteProject, updateProject } from '../../store/projects.actions';
import { Location } from '@angular/common';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { ContextMenuItemComponent } from '../../../../shared/components/context-menu-item/context-menu-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-context-menu',
  standalone: true,
  imports: [IconButtonComponent, ContextMenuItemComponent],
  templateUrl: './project-context-menu.component.html',
  styleUrl: './project-context-menu.component.scss',
  host: {
    'class': 'context-menu'
  }
})
export class ProjectContextMenuComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) isFavorite!: boolean;
  @Output() openSectionEditor = new EventEmitter<void>();

  private location = inject(Location);
  private store = inject(Store);
  private router = inject(Router);

  isOpen = false;

  archive() {
    alert('Coming soon');
  }

  changeIsFavorite() {
    this.store.dispatch(updateProject({ 
      projectId: this.id,
      values: { isFavorite: !this.isFavorite } 
    }));
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.store.dispatch(deleteProject({ projectId: this.id }));
      this.router.navigateByUrl('projects');
    }
  }

  edit() {
    this.location.path
    this.router.navigateByUrl('projects/edit/' + this.id);
  }

  newSection() {
    this.toggle();
    this.openSectionEditor.emit();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}