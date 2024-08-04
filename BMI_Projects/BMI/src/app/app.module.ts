import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BmiService } from './service.service';
import { Component1 } from './component1/component1.component';
import { Component2 } from './component2/component2.component';
import { Component3 } from './component3/component3.component';
import { Component4 } from './component4/component4.component';
import { Component5 } from './component5/component5.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, Component1, Component2, Component3, Component4, Component5],
  bootstrap: [AppComponent],
  providers: [BmiService],
})
export class AppModule {}