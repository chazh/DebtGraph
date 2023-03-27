import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { ViewDebtRoutingModule } from './view-debt-routing.module';
import { EstimationsComponent } from './components/estimations/estimations.component';



@NgModule({
  declarations: [
    EstimationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ViewDebtRoutingModule
  ]
})
export class ViewDebtModule { }
