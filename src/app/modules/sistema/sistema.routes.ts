import { CadastrarSistemaComponent } from "./cadastrar/cadastrar-sistema.component";
import { DetalharSistemaComponent } from "./detalhar/detalhar-sistema.component";
import { EditarSistemaComponent } from "./editar/editar-sistema.component";
import { ListarSistemaComponent } from "./listar/listar-sistema.component";
import { sistemaResolver } from "./sistema.resolver";

export default [
    {
        path: 'listar',
        component: ListarSistemaComponent,
    },
    {
        path: 'cadastrar',
        component: CadastrarSistemaComponent,
    },
    {
        path: 'editar/:id',
        component: EditarSistemaComponent,
        resolve: { sistema: sistemaResolver }
    },
    {
        path: 'detalhar/:id',
        component: DetalharSistemaComponent,
        resolve: { sistema: sistemaResolver }
    },
]