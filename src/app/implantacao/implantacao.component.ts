import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import * as Chartist from 'chartist';
import { ApoioService } from 'app/service/apoio.service';

@Component({
  selector: 'app-implantacao',
  templateUrl: './implantacao.component.html',
  styleUrls: ['./implantacao.component.css']
})
export class ImplantacaoComponent implements OnInit {

  colunasImplantacoes: Array<any> = [
    { 'titulo': 'Nº de série' },
    { 'titulo': 'Razão social' },
    { 'titulo': 'Sistema de Conversão' },
    { 'titulo': 'Data implantação' }
  ];

  dadosPaginaImplantacoesComSucessoDoMes: Array<any> = [];
  dadosPaginaImplantacoesCanceladaDoMes: Array<any> = [];

  constructor(private app: AppComponent, private service: ApoioService) { }

  ngOnInit() {

    this.getImplantacoesDoMes();

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
      showLine: true,
      showPoint: true,
      showArea: true,
      low: 0,
      high: 30,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#envolucaoImplantacoes', dataDailySalesChart, optionsDailySalesChart);

    this.app.startAnimationForLineChart(dailySalesChart);

  }

  getImplantacoesDoMes() {
    this.service.getImplantacoesDoMesAtual().subscribe(
      (_implantacoesComSucesso) => {
        this.dadosPaginaImplantacoesComSucessoDoMes = _implantacoesComSucesso.clientesImplantadosSemCancelamento;
        this.dadosPaginaImplantacoesCanceladaDoMes = _implantacoesComSucesso.clientesQueCancelaramNoMes;
      },
      (error) => console.log(error)
    );
  }
}
