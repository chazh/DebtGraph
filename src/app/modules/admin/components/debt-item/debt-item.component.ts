import { Component, Input } from '@angular/core';
import { DebtInfo } from 'src/app/models/DebtInfo';

@Component({
  selector: 'app-debt-item',
  templateUrl: './debt-item.component.html',
  styleUrls: ['./debt-item.component.scss']
})
export class DebtItemComponent {
  private _debtItem = {} as DebtInfo;

  @Input()
  public get debtItem(): DebtInfo {
    return this._debtItem;
  }
  public set debtItem(value: DebtInfo) {
    this._debtItem = value;
  }
}
