import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ApoioService } from 'app/service/apoio.service';

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

  constructor(private service: ApoioService) {
    this.getImplantacoesDoMes();
    this.getTreinamentosDoMes();
    this.getValidacoesPendentes();
    this.getImplantacoesPendentes();

  }


  //ngOnDestroy() {
  //setInterval(function() { this.gerarGraficoDeConversaoDoMes() }, 1000);

  //}


  ngOnInit() {


    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      series: [
        [0, 17, 7, 17, 23, 18, 30],
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#envolucaoImplantacoes', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);


    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    this.dataImplantacaoDoMesChart = {
      labels: ['Com Conversão', 'Sem Conversão'],
      series: [
        [0, 0]
      ]

    };
    this.optionImplantacaoDoMesChart = {
      axisX: {
        showGrid: false,
        onlyInteger: true,
      },
      axisY: {
        scaleMinSpace: 200,
        showGrid: false,
      },
      low: 0,
      high: 40,
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

    //setInterval(function() { this.gerarGraficoDeConversaoDoMes() }, 1000);


    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(new Chartist.Bar('#implantacaoConversaoChart', this.dataImplantacaoDoMesChart, this.optionImplantacaoDoMesChart, this.responsiveImplantacaoDoMesOptions));

  }

  getImplantacoesDoMes() {
    this.service.getImplantacoesDoMesAtual().subscribe(
      (_implantacoes) => {
        this.implantacoesDoMes = _implantacoes;
      },
      (error) => console.log(error)
    );
  }

  getValidacoesPendentes() {
    this.service.getValidacoesPendentes().subscribe(
      (_validacoesPendentes) => {
        this.dadosPaginaValidacoesPendentes = _validacoesPendentes;
      },
      (error) => console.log(error)
    );
  }

  getImplantacoesPendentes() {
    this.service.getImplantacoesPendentes().subscribe(
      (_implantacoesPendentes) => {
        this.dadosPaginaImplantacoesPendentes = _implantacoesPendentes;
      },
      (error) => console.log(error)
    );
  }

  getTreinamentosDoMes() {
    this.service.getTreinamentosDoMesAtual().subscribe(
      (_treinamentos) => {
        this.treinamentosDoMes = _treinamentos;
      },
      (error) => console.log(error)
    );
  }

  gerarGraficoDeConversaoDoMes() {
    this.dataImplantacaoDoMesChart = {
      labels: ['Com Conversão', 'Sem Conversão'],
      series: [
        [5, 6]
      ]
    };
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
