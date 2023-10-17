import {
  OnChanges,
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { OrgChart } from 'd3-org-chart';

@Component({
  selector: 'app-d3-org-chart',
  templateUrl: './d3-org-chart.component.html',
  styleUrls: ['./d3-org-chart.component.scss'],
})
export class D3OrgChartComponent implements OnInit, OnChanges {
  @ViewChild('chartContainer') chartContainer: ElementRef;
  @Input() data: any[];
  chart;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (!this.chart) {
      this.chart = new OrgChart();
    }
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }
  updateChart() {
    if (!this.data) {
      return;
    }
    if (!this.chart) {
      return;
    }
    this.chart
      .nodeHeight((d) => 85 + 25)
      .nodeWidth((d) => 220 + 2)
      .childrenMargin((d) => 50)
      .compactMarginBetween((d) => 35)
      .compactMarginPair((d) => 30)
      .neighbourMargin((a, b) => 20)
      .onNodeClick((d) => console.log(d))
      .compact(false)
      .setActiveNodeCentered(true)
      .nodeContent(function (d, i, arr, state) {
        const color = '#FFFFFF';
        const imageDiffVert = 25 + 2;
        return `
                <div style='width:${
                  d.width
                }px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
                        <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: 1px solid #E4E2E9">
                            <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${
                              d.data.id
                            }</div>
                            <div style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
                            <div style="margin-top:${
                              -imageDiffVert - 20
                            }px;">   <img src=" ${d.data.image}" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" /></div>
                            <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px">  ${
                              d.data.name
                            } </div>
                            <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
                              d.data.position
                            } </div>

                        </div>
                    </div>
                            `;
      })
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .render();
  }

  public onHorizontal(): void {
    this.chart.compact(false).render().fit();
  }

  public onCompact(): void {
    this.chart.compact(true).render().fit();
  }

  public onExpand(): void {
    this.chart.setExpanded('165').setCentered('165').render();
  }

  public fitScreen(): void {
    this.chart.fit();
  }
}
