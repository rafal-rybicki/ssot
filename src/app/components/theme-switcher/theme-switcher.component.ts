import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [],
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
