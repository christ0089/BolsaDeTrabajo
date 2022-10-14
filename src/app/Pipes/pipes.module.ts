import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitsPipe } from './benefits.pipe';
import { BonusPipe } from './bonus.pipe';
import { WorkHoursPipe } from './work-hours.pipe';



@NgModule({
  declarations: [
    BenefitsPipe,
    BonusPipe,
    WorkHoursPipe
  ],
  imports: [
    CommonModule
  ], exports: [
    BenefitsPipe,
    BonusPipe,
    WorkHoursPipe
  ]
})
export class PipesModule { }