import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitsPipe } from './benefits.pipe';
import { BonusPipe } from './bonus.pipe';
import { WorkHoursPipe } from './work-hours.pipe';
import { StatusPipe } from './status.pipe';
import { StatusChipPipe } from './status-chip.pipe';



@NgModule({
  declarations: [
    BenefitsPipe,
    BonusPipe,
    WorkHoursPipe,
    StatusPipe,
    StatusChipPipe
  ],
  imports: [
    CommonModule
  ], exports: [
    BenefitsPipe,
    BonusPipe,
    StatusChipPipe,
    StatusPipe,
    WorkHoursPipe
  ]
})
export class PipesModule { }
