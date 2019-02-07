import { Component} from '@angular/core';
import { ApoioService } from './service/apoio.service';
import * as Chartist from 'chartist';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dadosPaginaImplantacoesPendentes: Array<any> = [];
  dadosPaginaValidacoesPendentes: Array<any> = [];


  implantacoesDoMes: any = {};
  treinamentosDoMes: any = {};
  implantacoesPorMesDoAno2018 = [];
  implantacoesPorMesDoAno2019 = [];


  ngOnInit() {
    this.getImplantacoesDoMes();
    this.getTreinamentosDoMes();
    this.getValidacoesPendentes();
    this.getImplantacoesPendentes();
    this.getImplantacoesPorMesDoAno2018();
    this.getImplantacoesPorMesDoAno2019();
  }

  constructor(private service: ApoioService) { }

  getImplantacoesDoMes() {
    this.service.getImplantacoesDoMesAtual().subscribe(
      (_implantacoes) => {
        this.implantacoesDoMes = _implantacoes;
      },
      (error) => console.log(error)
    );
  }

  getImplantacoesPorMesDoAno2018() {
    this.service.getImplantacoesPorMesDoAno(2018).subscribe(
      (_implantacoes) => {
        this.implantacoesPorMesDoAno2018 = _implantacoes;
      },
      (error) => console.log(error)
    );
  }

  getImplantacoesPorMesDoAno2019() {
    this.service.getImplantacoesPorMesDoAno(2019).subscribe(
      (_implantacoes) => {
        this.implantacoesPorMesDoAno2019 = _implantacoes;
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
