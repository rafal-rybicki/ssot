import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() color: string = '';
  @Input({ required: true }) cssClass!: string;
  @Input({ required: true }) path!: string;
  @Input({ required: true }) text!: string;
}
