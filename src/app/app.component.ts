import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { StyleManagerService } from './services/style-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  public title = 'Debt Data';

  public isLightTheme: Observable<boolean>;

  constructor(private readonly styleManagerService: StyleManagerService) {

      this.isLightTheme = this.styleManagerService.isLightTheme;
  }
}
