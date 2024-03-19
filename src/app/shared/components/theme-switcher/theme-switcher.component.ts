import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [IconButtonComponent],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {
  constructor(private theme: ThemeService) {};

  isDarkTheme = true;

  toggle() {
    this.theme.loadTheme(this.isDarkTheme ? 'light' : 'dark');
    this.isDarkTheme = !this.isDarkTheme;
  }
}
