import { Injectable } from '@angular/core';
import { DebtInfo } from '../models/DebtInfo';
import { GraphData } from '../models/GraphData';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  public buildAvalanceGraph(debtItems: DebtInfo[], includeHoldBalances: boolean, extraPaymentAmount: number): GraphData {
    const graphData = this.buildPaymentData(debtItems, 'avalance', includeHoldBalances, extraPaymentAmount);

    graphData.fillColor = "#005500";
    graphData.lineColor = "#00ff00";

    return graphData;
  }

  public buildDefaultGraph(debtItems: DebtInfo[], includeHoldBalances: boolean, extraPaymentAmount: number): GraphData {
    const graphData = this.buildPaymentData(debtItems, 'default', includeHoldBalances, extraPaymentAmount);

    graphData.fillColor = "#550000";
    graphData.lineColor = "#ff0000";

    return graphData;
  }

  public buildSnowballGraph(debtItems: DebtInfo[], includeHoldBalances: boolean, extraPaymentAmount: number): GraphData {
    const graphData = this.buildPaymentData(debtItems, 'snowball', includeHoldBalances, extraPaymentAmount);

    graphData.fillColor = "#000055";
    graphData.lineColor = "#0000ff";

    return graphData;
  }

  public buildGraphData(graphData: GraphData, totalBalance: number, minX: number, maxX: number, minY: number, maxY: number): GraphData {
    const maxWidth = 1000;
    const maxHeight = 500;

    const OldRangeX = (maxX - minX) == 0 ? minX : (maxX - minX);
    const OldRangeY = (maxY - minY) == 0 ? minY : (maxY - minY);

    let linePath = "";

    let valueX = 0;
    let valueY = 0.0;

    graphData.balances.forEach((b, i) => {
      valueX = (((i - minX) * maxWidth) / OldRangeX);
      valueY = maxHeight - (((b - minY) * maxHeight) / OldRangeY);

      if (b === totalBalance) {
        linePath = `M ${valueX},${valueY} `;
      }
      else {
        linePath += `L ${valueX},${valueY} `;
      }
    })

    graphData.linePath = linePath;
    graphData.fillPath = `${linePath},L ${maxWidth} ${maxHeight},L 0 ${maxHeight}Z`;

    return graphData;
  }

  private buildPaymentData(debtItems: DebtInfo[], graphType: string, includeHoldBalances: boolean, startingExtraPaymentAmount: number): GraphData {
    let totalInterestPaid = 0;
    let totalNumberOfPayments = 0;
    let totalBalance = 0;

    const date = new Date();

    const balances: number[] = [];

    const whenToAddPayment: number[] = [];

    let items: DebtInfo[] = [...debtItems];

    if (!includeHoldBalances) {
      items = debtItems.filter(x => !x.hold);
    }

    if (graphType === 'default') {
      items = items.sort((a, b) => a.name.localeCompare(b.name))
    }

    else if (graphType === 'snowball') {
      items = items.sort((a, b) => {
        if (a.balance > b.balance) {
          return 1;
        }

        if (a.balance < b.balance) {
          return -1;
        }

        return 0;
      });
    }
    else if (graphType === 'avalance') {
      items = items.sort((a, b) => {
        if (a.interestRate < b.interestRate) {
          return 1;
        }

        if (a.interestRate > b.interestRate) {
          return -1;
        }

        return 0;
      });
    }

    items.forEach(x => {
      totalBalance += x.balance;
    });

    balances.push(totalBalance);

    let extraPaymentAmount = startingExtraPaymentAmount;

    items.forEach((x, index) => {

      let itemBalance = x.balance;
      let numberOfPayments = 0;
      let paymentAmount = x.payment;

      const interest = (itemBalance * ((x.interestRate / 100) / 12));

      while (itemBalance > 0) {

        if (index === 0 || (((index - 1)) >= 0 && numberOfPayments > whenToAddPayment[(index - 1)])) {
          paymentAmount = x.payment + extraPaymentAmount;
        }

        itemBalance = (itemBalance - paymentAmount) + interest;

        totalBalance = (totalBalance - paymentAmount) + interest;

        balances.push(totalBalance > 0 ? totalBalance : 0);

        totalInterestPaid = totalInterestPaid + interest;

        numberOfPayments++;
      }

      numberOfPayments--;

      if (index !== 0) {
        numberOfPayments = numberOfPayments - whenToAddPayment[(index - 1)];
      }

      whenToAddPayment.push(numberOfPayments);

      extraPaymentAmount = extraPaymentAmount + x.payment;
      totalNumberOfPayments = totalNumberOfPayments + numberOfPayments;
    });

    const estimatedPayoffDate = new Date(date.setMonth(date.getMonth() + (totalNumberOfPayments + 1)));

    const graphData: GraphData = {
      fillPath: "",
      fillColor: "#550000",
      linePath: "",
      lineColor: "#ff0000",
      lineStroke: "4px",
      interestPaid: totalInterestPaid,
      numberOfPayments: totalNumberOfPayments,
      payoffDate: estimatedPayoffDate,
      balances: balances
    };

    return graphData;
  }
}
