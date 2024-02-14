import { Component, HostBinding } from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { projects } from '../../../../data';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuItemComponent],
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
