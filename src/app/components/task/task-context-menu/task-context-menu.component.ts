import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IconButtonComponent } from '../../icon-button/icon-button.component';
import { ContextMenuItemComponent } from '../../context-menu-item/context-menu-item.component';
import { Store } from '@ngrx/store';
import { deleteTask } from '../../../store/tasks/tasks.actions';
import { DatePickerComponent } from '../../date-picker/date-picker.component';

@Component({
  selector: 'app-task-context-menu',
  standalone: true,
  imports: [IconButtonComponent, ContextMenuItemComponent, DatePickerComponent],
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

  isOpen = false;
  showDatePicker = false;

  delete() {
    this.toggle();
    this.store.dispatch(deleteTask({ taskId: this.id }));
  }

  edit() {
    this.toggle();
    this.openEditor.emit();
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
    this.toggle();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}