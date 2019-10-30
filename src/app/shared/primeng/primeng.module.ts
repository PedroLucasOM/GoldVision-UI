import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {CalendarModule, DropdownModule, InputMaskModule, InputTextareaModule, SelectButtonModule, TooltipModule} from 'primeng/primeng';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    SelectButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule,
    CurrencyMaskModule,
    InputMaskModule,
    ToastModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    SelectButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule,
    CurrencyMaskModule,
    InputMaskModule,
    ToastModule
  ]
})
export class PrimengModule {
}
