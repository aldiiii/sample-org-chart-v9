import { AppComponent } from './app.component';
import { D3OrgChartComponent } from './d3-org-chart/d3-org-chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [BrowserModule, FormsModule],
  providers: [],
  exports: [],
  declarations: [AppComponent, D3OrgChartComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
