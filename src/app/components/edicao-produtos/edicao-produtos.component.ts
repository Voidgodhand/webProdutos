import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edicao-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-produtos.component.html',
  styleUrl: './edicao-produtos.component.css'
})
export class EdicaoProdutosComponent {


  //atributos
  categorias: any[] = [];
  mensagem: string = '';
  produtoId: number = 0;


  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {


    //capturar o id enviado pela url
    this.produtoId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    //consultar o produto na API através do ID
    this.httpClient.get(`http://localhost:8081/api/produtos/${this.produtoId}`)
      .subscribe({
        next: (data: any) => {
          //preencher os campos do formulário
          this.form.controls['nome'].setValue(data.nome);
          this.form.controls['preco'].setValue(data.preco);
          this.form.controls['quantidade'].setValue(data.quantidade);
          this.form.controls['categoriaId'].setValue(data.categoria?.id);
        },
        error: (e) => {
          console.log(e.error);
        }
      });


    this.httpClient.get('http://localhost:8081/api/categorias')
      .subscribe({
        next: (data) => {
          this.categorias = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        }
      });
  }


  //estrutura com os campos do formulário
  form = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    preco : new FormControl('', [Validators.required]),
    quantidade : new FormControl('', [Validators.required]),
    categoriaId : new FormControl('', [Validators.required])
  });


  //função para verificar quais campos do formulário
  //estão com erro de validação / preenchimento
  get f() {
    return this.form.controls;
  }


  //função para capturar o evento SUBMIT do formulário
  onSubmit() {
    this.httpClient.put(`http://localhost:8081/api/produtos/${this.produtoId}`, this.form.value)
    .subscribe({
      next: (data: any) => {
        //preencher os campos do formulário
        this.mensagem = `Produto '${data.nome}, atualizado com sucesso.'`;
      },
      error: (e) => {
        console.log(e.error);
      }
    });
  }
}




