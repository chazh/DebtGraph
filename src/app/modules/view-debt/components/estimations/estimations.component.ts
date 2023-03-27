import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DebtInfo } from 'src/app/models/DebtInfo';
import { GraphData } from 'src/app/models/GraphData';
import { AppConfigService } from 'src/app/services/app-config.service';
import { GraphService } from 'src/app/services/graph.service';

@Component({
  selector: 'app-estimations',
  templateUrl: './estimations.component.html',
  styleUrls: ['./estimations.component.scss']
})
export class EstimationsComponent implements OnInit {
  private debtItems: DebtInfo[] = [];

  public dataForm = new FormGroup({
    extraPaymentAmount: new FormControl(0),
    graphStyle: new FormControl('Default'),
    includeHolds: new FormControl('false')
  });

  public defaultGraphData: GraphData = {} as GraphData;
  public snowballGraphData: GraphData = {} as GraphData;
  public avalanceGraphData: GraphData = {} as GraphData;

  public get isDefaultGraph(): boolean {
    return this.dataForm.get('graphStyle')?.value === 'Default';
  }

  public get isSnowballGraph(): boolean {
    return this.dataForm.get('graphStyle')?.value === 'Snowball'
  }

  public get isAvalanceGraph(): boolean {
    return this.dataForm.get('graphStyle')?.value === 'Avalance'
  }

  constructor(
    private readonly config: AppConfigService,
    private readonly graphService: GraphService
  ) {
  }

  public ngOnInit(): void {
    this.debtItems = this.config.appConfig.debt;

    this.recalculate();
  }

  public recalculate(): void {
    const includeHoldsValue = this.dataForm.get('includeHolds')?.value === 'true' ?? false;
    const extraPaymentValue = +(this.dataForm.get('extraPaymentAmount')?.value ?? 0);

    this.defaultGraphData = this.graphService.buildDefaultGraph(this.debtItems, false, extraPaymentValue);
    this.snowballGraphData = this.graphService.buildSnowballGraph(this.debtItems, includeHoldsValue, extraPaymentValue);
    this.avalanceGraphData = this.graphService.buildAvalanceGraph(this.debtItems, includeHoldsValue, extraPaymentValue);
  }
}
