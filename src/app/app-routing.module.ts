import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Component1 } from './component1/component1.component';
import { Component2 } from './component2/component2.component';
import { Component3 } from './component3/component3.component';
import { Component4 } from './component4/component4.component';
import { Component5 } from './component5/component5.component'; 

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'component1', component: Component1 },
  { path: 'component2', component: Component2 },
  { path: 'component3', component: Component3 },
  { path: 'component4', component: Component4 },
  { path: 'component5', component: Component5 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}