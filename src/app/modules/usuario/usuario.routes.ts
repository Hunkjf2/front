import { CadastrarUsuarioComponent } from "./cadastrar/cadastrar-usuario.component";
import { DetalharUsuarioComponent } from "./detalhar/detalhar-usuario.component";
import { EditarUsuarioComponent } from "./editar/editar-usuario.component";
import { ListarUsuarioComponent } from "./listar/listar-usuario.component";
import { usuarioResolver } from "./usuario.resolver";

export default [
    {
        path: 'listar',
        component: ListarUsuarioComponent,
    },
    {
        path: 'cadastrar',
        component: CadastrarUsuarioComponent,
    },
    {
        path: 'editar/:id',
        component: EditarUsuarioComponent,
        resolve: { usuario: usuarioResolver }
    },
    {
        path: 'detalhar/:id',
        component: DetalharUsuarioComponent,
        resolve: { usuario: usuarioResolver }
    },
]