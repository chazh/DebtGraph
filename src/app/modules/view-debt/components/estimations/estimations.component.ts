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

    const defaultGraphMaxX = (this.defaultGraphData.balances.length - 1);
    const snowballGraphMaxX = (this.snowballGraphData.balances.length - 1);
    const avalanceGraphMaxX = (this.avalanceGraphData.balances.length - 1);

    const defaultGraphMinY = Math.min(...this.defaultGraphData.balances);
    const snowballGraphMinY = Math.min(...this.snowballGraphData.balances);
    const avalanceGraphMinY = Math.min(...this.avalanceGraphData.balances);

    const defaultGraphMaxY = Math.max(...this.defaultGraphData.balances);
    const snowballGraphMaxY = Math.max(...this.snowballGraphData.balances);
    const avalanceGraphMaxY = Math.max(...this.avalanceGraphData.balances);

    const minXValue = 0;
    const maxXValue = Math.max(...[defaultGraphMaxX, snowballGraphMaxX, avalanceGraphMaxX]);

    const minYValue = Math.min(...[defaultGraphMinY, snowballGraphMinY, avalanceGraphMinY]);
    const maxYValue = Math.max(...[defaultGraphMaxY, snowballGraphMaxY, avalanceGraphMaxY]);

    this.defaultGraphData = this.graphService.buildGraphData(this.defaultGraphData, this.defaultGraphData.balances[0], minXValue, maxXValue, minYValue, maxYValue);
    this.snowballGraphData = this.graphService.buildGraphData(this.snowballGraphData, this.snowballGraphData.balances[0], minXValue, maxXValue, minYValue, maxYValue);
    this.avalanceGraphData = this.graphService.buildGraphData(this.avalanceGraphData, this.avalanceGraphData.balances[0], minXValue, maxXValue, minYValue, maxYValue);
  }
}
