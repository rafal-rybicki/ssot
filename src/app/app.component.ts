import { Component, inject } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { ThemeService } from './services/theme.service';
import { ProjectEditorComponent } from './components/project-editor/project-editor.component';
import { AreaEditorComponent } from './components/area-editor/area-editor.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MenuComponent,
    ThemeSwitcherComponent,
    AreaEditorComponent,
    ProjectEditorComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private auth = inject(AuthService);
  private theme = inject(ThemeService);

  isLoggedIn = this.auth.isLoggedIn;

  ngOnInit() {
    this.theme.loadTheme('dark');
  }

  title = 'SSOT';
}
