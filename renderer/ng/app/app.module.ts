import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { NumericInputComponent } from './numeric-input/numeric-input.component';
import { FunctionButtonComponent } from './function-button/function-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    NumericInputComponent,
    FunctionButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
