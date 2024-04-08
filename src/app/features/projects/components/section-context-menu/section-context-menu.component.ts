import { Component, Input, inject } from '@angular/core';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { ContextMenuItemComponent } from '../../../../shared/components/context-menu-item/context-menu-item.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-section-context-menu',
  standalone: true,
  imports: [IconButtonComponent, ContextMenuItemComponent],
  templateUrl: './section-context-menu.component.html',
  styleUrl: './section-context-menu.component.scss'
})
export class SectionContextMenuComponent {
  @Input({ required: true}) sectionId!: number;
  @Input({ required: true}) projectId!: number;
  @Input({ required: true}) name!: string;

  private store = inject(Store);

  isOpen = false;

  edit() {}

  delete() {}

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
