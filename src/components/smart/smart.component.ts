import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { Company } from '../../model/Company';
import { DumpService } from '../../services/dump.service';

@Component({
  selector: 'smart-root',
  templateUrl: './smart.component.html',
  styleUrls: ['./smart.component.css']
})
export class SmartComponent implements OnInit {

  title: string;
  companies: Company[];
  LineChart: object;
  chartData: number[];
  chartLabels: string[];
  monthBalance: number;
  balance: number;
  onChange(id: number) {
    this.updateCampanyDetails(id);
    this.updateLineChart(this.chartData);
  }

  constructor(private Dump: DumpService) {
    this.title = 'Companies';
    this.balance = 0;
    this.monthBalance = 0;
    this.chartData = [];
    this.chartLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  }

  ngOnInit() {

    this.Dump.getHeroes()
      .subscribe((heroes: Company[]) => {

        this.companies = heroes;
        this.updateLineChart(this.chartData);
      });
  }

  private updateLineChart(data: number[]) {

    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: '# of Votes',
          data: data,
          backgroundColor: 'transparent',
          borderColor: '#67C7FB',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  }

  private updateCampanyDetails(id: number) {

    let companyData = this.companies.filter((company: Company) => company.id == id)[0];

    this.monthBalance = companyData.monthBalance;
    this.balance = companyData.balance;
    this.title = companyData.name;
    this.chartData = Object.values(companyData.weekStats);
    this.chartLabels = Object.keys(companyData.weekStats);
  }

}
