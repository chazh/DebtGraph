import { Component, OnInit } from '@angular/core';

import { AppConfigService } from 'src/app/services/app-config.service';
import { DebtInfo } from 'src/app/models/DebtInfo';

@Component({
  selector: 'app-list-debt',
  templateUrl: './list-debt.component.html',
  styleUrls: ['./list-debt.component.scss']
})
export class ListDebtComponent implements OnInit {
  public debtItems: DebtInfo[] = [];

  constructor(
    private readonly config: AppConfigService,
  ) {
  }

  public ngOnInit(): void {
    this.debtItems = this.config.appConfig.debt.sort((a, b) => Number(a.hold) - Number(b.hold));
  }
}
