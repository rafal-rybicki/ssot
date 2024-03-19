import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-context-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './context-menu-item.component.html',
  styleUrl: './context-menu-item.component.scss'
})
export class ContextMenuItemComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) text!: string;
  @Output() onClick = new EventEmitter<void>();

  handleOnClick() {
    this.onClick.emit();
  }
}
