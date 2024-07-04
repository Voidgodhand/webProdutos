import { Routes } from '@angular/router';
import { CadastroProdutosComponent } from './components/cadastro-produtos/cadastro-produtos.component';
import { ConsultaProdutosComponent } from './components/consulta-produtos/consulta-produtos.component';
import { EdicaoProdutosComponent } from './components/edicao-produtos/edicao-produtos.component';

export const routes: Routes = [
    {
        path : 'cadastrar-produtos',
        component: CadastroProdutosComponent
    },
    {
        path: 'consultar-produtos',
        component: ConsultaProdutosComponent
    },
    {
        path: 'editar-produtos/:id',
        component: EdicaoProdutosComponent
    }
];
