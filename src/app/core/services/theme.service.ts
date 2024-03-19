import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  loadTheme(themeName: string) {
    const themeSrc = this.document.getElementById('theme') as HTMLLinkElement;

    themeSrc.href = `assets/themes/${themeName}.css`;
  }
}