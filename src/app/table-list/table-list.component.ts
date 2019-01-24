import { Component, OnInit } from '@angular/core';
import { ApoioService } from 'app/service/apoio.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  colunas: Array<any> = [
    { 'titulo': ' ' },
    { 'titulo': 'Razão social' },
    { 'titulo': 'Função treinada' },
    { 'titulo': 'Técnico responsável' },
    { 'titulo': 'Data do treinamento' },
    { 'titulo': 'Duração' }
  ];

  dadosPagina: Array<any> = [];

  constructor(private service: ApoioService) { }

  ngOnInit() {
    this.getUltimosVinteTreinamentos();

  }

  getUltimosVinteTreinamentos() {
    this.service.getUltimosVinteTreinamentos().subscribe(
      (_treinamentos) => {
        this.dadosPagina = _treinamentos;
      },
      (error) => console.log(error)
    );
  }
}
