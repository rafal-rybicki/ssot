import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
  @Input({ required: true }) icon!: string;
  @Output() onClick = new EventEmitter<void>();

  handleOnClick() {
    this.onClick.emit();
  }
}
