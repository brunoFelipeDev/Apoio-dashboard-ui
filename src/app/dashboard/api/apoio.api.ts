import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ApoioApi {

    uri = 'http://localhost:8080';

    constructor(private http: Http) { }

    getImplantacoesDoMesAtual() {
        return this.http.get(this.uri + '/implantacao/mensal')
            .map(response => response.json());
    }

    getTreinamentosDoMesAtual() {
        return this.http.get(this.uri + '/treinamento/mensal')
            .map(response => response.json());
    }

    getUltimosVinteTreinamentos() {
        return this.http.get(this.uri + '/treinamento/ultimosvinte')
            .map(response => response.json());
    }
    getValidacoesPendentes() {
        return this.http.get(this.uri + '/validacao/pendente')
            .map(response => response.json());
    }

    getImplantacoesPendentes() {
        return this.http.get(this.uri + '/implantacao/pendente')
            .map(response => response.json());
    }
}