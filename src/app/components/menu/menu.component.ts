import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
