import { Component, HostBinding } from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { Store } from '@ngrx/store';
import { selectActiveProjects } from '../../store/projects/projects.feature';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuItemComponent, IconButtonComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @HostBinding('class.open') get class() { return this.isOpen };
  projects$ = this.store.select(selectActiveProjects);
  isOpen = true;

  constructor(private store: Store) {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  openProjectEditor() {
    const editor = document.querySelector('app-project-editor') as HTMLElement;
    editor.style.display = 'block'
  }

  openAreaEditor() {
    const editor = document.querySelector('app-area-editor') as HTMLElement;
    editor.style.display = 'block'
  }
}
