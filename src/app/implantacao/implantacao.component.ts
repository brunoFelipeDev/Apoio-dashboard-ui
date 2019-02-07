import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-implantacao',
  templateUrl: './implantacao.component.html',
  styleUrls: ['./implantacao.component.css']
})
export class ImplantacaoComponent implements OnInit {

  constructor(private app: AppComponent) { }

  ngOnInit() {
    
  const dataDailySalesChart: any = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    series: [
      this.app.implantacoesPorMesDoAno2018,
      this.app.implantacoesPorMesDoAno2019
    ]
  };

  const optionsDailySalesChart: any = {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 30,
    chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
  }

  var dailySalesChart = new Chartist.Line('#envolucaoImplantacoes', dataDailySalesChart, optionsDailySalesChart);

  this.app.startAnimationForLineChart(dailySalesChart);
  
  }
}
