import { Component, inject } from '@angular/core';
import { MenuComponent } from './core/components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MenuComponent,
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
