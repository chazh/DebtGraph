import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimationsComponent } from './components/estimations/estimations.component';

const routes: Routes = [
  {
    path: '',
    component: EstimationsComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewDebtRoutingModule { }
