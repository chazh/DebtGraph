import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StyleManagerService {
  private _lightTheme = new Subject<boolean>();
  
  public isLightTheme = this._lightTheme.asObservable();

  constructor(){
    this._lightTheme.next(false);
  }
  
  public setTheme(theme: string): void {
    const isLightTheme = theme === 'Light';

    this._lightTheme.next(isLightTheme);
  }
}