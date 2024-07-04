import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-consulta-produtos',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterLink
  ],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.css'
})
export class ConsultaProdutosComponent implements OnInit {


  //atributos
  produtos : any[] = [];
  paginador : number = 1;
  produto: any = {};
  mensagem: string = '';


  //declarando um objeto HttpClient
  constructor(private httpClient: HttpClient) {}


  ngOnInit(): void {    
   
    //fazendo uma requisição para o serviço de consulta de produtos
    this.httpClient.get('http://localhost:8081/api/produtos')
      .subscribe({ //aguardando a resposta
        next: (data) => { //capturando o retorno de sucesso da API
          //armazenando os dados dos produtos obtidos da API
          this.produtos = data as any[];
        },
        error: (e) => { //capturando o retorno de erro da API
          console.log(e.error);
        }
      })
  }


  //função para avançar e voltar na régua de paginação
  pageChange(event: any): void {
    this.paginador = event;
  }


  //função para capturar os dados do produtop
  //que será exibido na janela modal
  onSelect(value: any): void {
    this.produto = value;
  }


  //função para realizar a exclusão do produto
  onDelete(): void {
    this.httpClient.delete(`http://localhost:8081/api/produtos/${this.produto.id}`)
      .subscribe({
        next: (data: any) => {
          this.mensagem = `Produto '${data.nome}', excluído com sucesso.`;
          this.ngOnInit(); //executando a consulta novamente
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }
}





