import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ApoioService } from 'app/service/apoio.service';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  colunasValidacoesPendentes: Array<any> = [
    { 'titulo': 'Nº de série' },
    { 'titulo': 'Razão social' },
    { 'titulo': 'Sistema de Conversão' }
  ];

  colunasImplantacoesPendentes: Array<any> = [
    { 'titulo': 'Nº de série' },
    { 'titulo': 'Razão social' },
    { 'titulo': 'Sistema de Conversão' }
  ];

  dadosPaginaImplantacoesPendentes: Array<any> = [];
  dadosPaginaValidacoesPendentes: Array<any> = [];


  implantacoesDoMes: any = {};
  treinamentosDoMes: any = {};

  dataImplantacaoDoMesChart;
  optionImplantacaoDoMesChart;
  responsiveImplantacaoDoMesOptions;

  constructor(private app: AppComponent) {
    this.implantacoesDoMes = this.app.implantacoesDoMes;
    this.dadosPaginaValidacoesPendentes = this.app.dadosPaginaValidacoesPendentes;
    this.dadosPaginaImplantacoesPendentes = this.app.dadosPaginaImplantacoesPendentes;
    this.treinamentosDoMes = this.app.treinamentosDoMes;

  }

  ngOnInit() {


    
    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    this.dataImplantacaoDoMesChart = {
      labels: ['Sem Conversão', 'Com Conversão'],
      series: [
        [this.app.implantacoesDoMes.qtdSemConversao, this.app.implantacoesDoMes.qtdComConversao ]
      ]

    };
    this.optionImplantacaoDoMesChart = {
      axisX: {
        showGrid: true,
        onlyInteger: true,
      },
      axisY: {
        scaleMinSpace: 200,
        showGrid: true,
      },
      low: 0,
      high: this.app.implantacoesDoMes.quantidadeDeImplantacoesTotal,
      stackBars: true,
      horizontalBars: true,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 50 }
    };
    this.responsiveImplantacaoDoMesOptions = [
      ['screen and (width: 100%)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(new Chartist.Bar('#implantacaoConversaoChart', this.dataImplantacaoDoMesChart, this.optionImplantacaoDoMesChart, this.responsiveImplantacaoDoMesOptions));

  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

}
