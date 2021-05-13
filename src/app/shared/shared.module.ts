import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { LocationPaginatorComponent } from './location-paginator/location-paginator.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnerActivityComponent } from './partner-activity/partner-activity.component';
import { PartnerTransportComponent } from './partner-transport/partner-transport.component';

@NgModule({
  declarations: [
    PaginatorComponent,
    LocationPaginatorComponent,
    DatepickerComponent,
    LoaderComponent,
    PartnerActivityComponent,
    PartnerTransportComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule, 
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PaginatorComponent,
    LocationPaginatorComponent,
    DatepickerComponent,
    LoaderComponent,
    PartnerActivityComponent,
    PartnerTransportComponent
  ]
})
export class SharedModule { }
