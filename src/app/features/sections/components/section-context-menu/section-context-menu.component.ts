import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { ContextMenuItemComponent } from '../../../../shared/components/context-menu-item/context-menu-item.component';
import { Store } from '@ngrx/store';
import { deleteSection } from '../../store/sections.actions';

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
  @Output() openSectionEditor = new EventEmitter<void>();

  private store = inject(Store);

  isOpen = false;

  edit() {
    this.toggle();
    this.openSectionEditor.emit();
  }

  delete() {
    this.store.dispatch(deleteSection({
      sectionId: this.sectionId,
      projectId: this.projectId
    }));
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
