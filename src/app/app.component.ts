import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { ThemeService } from './services/theme.service';
import { ProjectEditorComponent } from './components/project-editor/project-editor.component';
import { Store } from '@ngrx/store';
import { AreaEditorComponent } from './components/area-editor/area-editor.component';

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
  constructor(private theme: ThemeService, private store: Store) {};

  ngOnInit() {
    this.theme.loadTheme('dark');
  }

  title = 'SSOT';
}
