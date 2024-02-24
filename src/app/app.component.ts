import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { ThemeService } from './services/theme.service';
import { ProjectEditorComponent } from './components/project-editor/project-editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MenuComponent,
    ThemeSwitcherComponent,
    ProjectEditorComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private theme: ThemeService) {};

  ngOnInit() {
    this.theme.loadTheme('dark');
  }

  title = 'SSOT';
}
