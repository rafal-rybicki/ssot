import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IconButtonComponent } from '../../icon-button/icon-button.component';
import { ContextMenuItemComponent } from '../../context-menu-item/context-menu-item.component';
import { Store } from '@ngrx/store';
import { deleteTask } from '../../../store/tasks/tasks.actions';

@Component({
  selector: 'app-task-context-menu',
  standalone: true,
  imports: [IconButtonComponent, ContextMenuItemComponent],
  templateUrl: './task-context-menu.component.html',
  styleUrl: './task-context-menu.component.scss',
  host: {
    '[class]': "'context-menu'",
  }
})
export class TaskContextMenuComponent {
  private store = inject(Store);

  @Input({ required: true }) id!: string;
  @Output() openEditor = new EventEmitter<void>();
  @Output() openDatePicker = new EventEmitter<void>();

  isOpen = false;

  changeDate() {
    this.toggle();
    this.openDatePicker.emit();
  }

  edit() {
    this.toggle();
    this.openEditor.emit();
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.toggle();
      this.store.dispatch(deleteTask({ taskId: this.id }));
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}