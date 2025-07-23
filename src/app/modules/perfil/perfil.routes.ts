import { CadastrarPerfilComponent } from "./cadastrar/cadastrar-perfil.component";
import { DetalharPerfilComponent } from "./detalhar/detalhar-perfil.component";
import { EditarPerfilComponent } from "./editar/editar-perfil.component";
import { ListarPerfilComponent } from "./listar/listar-perfil.component";
import { perfilResolver } from "./perfil.resolver";

export default [
    {
        path: 'listar',
        component: ListarPerfilComponent,
    },
    {
        path: 'cadastrar',
        component: CadastrarPerfilComponent,
    },
    {
        path: 'editar/:id',
        component: EditarPerfilComponent,
        resolve: { perfil: perfilResolver }
    },
    {
        path: 'detalhar/:id',
        component: DetalharPerfilComponent,
        resolve: { perfil: perfilResolver }
    },
]