import { Component, HostBinding } from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { projects } from '../../../../data';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuItemComponent, IconButtonComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @HostBinding('class.open') get class() { return this.isOpen };

  isOpen = false;
  projects = projects;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
