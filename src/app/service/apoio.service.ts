import { Injectable } from '@angular/core';
import { ApoioApi } from 'app/dashboard/api/apoio.api';

@Injectable()
export class ApoioService {

  constructor(private apoioApi: ApoioApi) { }

  getImplantacoesDoMesAtual() {
    return this.apoioApi.getImplantacoesDoMesAtual();
  }

  getTreinamentosDoMesAtual() {
    return this.apoioApi.getTreinamentosDoMesAtual();
  }

  getUltimosVinteTreinamentos() {
    return this.apoioApi.getUltimosVinteTreinamentos();
  }

  getValidacoesPendentes() {
    return this.apoioApi.getValidacoesPendentes();
  }

  getImplantacoesPendentes() {
    return this.apoioApi.getImplantacoesPendentes();
  }
}
