import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchPasswordDirective} from './match-password.directive';


@NgModule({
  declarations: [MatchPasswordDirective],
  imports: [
    CommonModule
  ],
  exports: [MatchPasswordDirective]
})
export class DiretivasModule {
}
