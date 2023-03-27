import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

import { StyleManagerService } from '../services/style-manager.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  public favoriteTheme = 'Dark';

  public themes = [
    {
      value: 'Light'
    },
    {
      value: 'Dark'
    }
  ];

  constructor(
    private readonly styleManager: StyleManagerService
  ) {
  }

  public changeTheme(event: MatRadioChange): void {
    const theme = this.themes.find(x => x.value === event.value);

    if ( !theme)
    {
      return;
    }

    this.styleManager.setTheme(theme.value);
  }
}
