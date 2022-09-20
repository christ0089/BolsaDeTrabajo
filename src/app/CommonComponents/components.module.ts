import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormQuestionComponent } from './question/question.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LocationComponent } from './location/location.component';
import { GeoQuestionComponent } from './geo-question/geo-question.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgZorroAntdModule } from '../ng-zorro.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RegistrationComponent } from './registration/registration.component';
import { EmployerRegistrationComponent } from './employer-registration/employer-registration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    DragDropModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    MatChipsModule,
    MatProgressBarModule,
    MatRadioModule,
    MatListModule,
    MatDatepickerModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzLayoutModule
  ],
  declarations: [
    DynamicFormQuestionComponent,
    LocationComponent,
    ChipsComponent,
    GeoQuestionComponent,
    RegistrationComponent,
    EmployerRegistrationComponent,
  ],
  providers: [],
  exports: [DynamicFormQuestionComponent, ChipsComponent],
})
export class ComponentModule {}
