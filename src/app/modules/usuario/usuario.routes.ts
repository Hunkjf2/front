import { CadastrarUsuarioComponent } from "./cadastrar/cadastrar-usuario.component";
import { ListarUsuarioComponent } from "./listar/listar-usuario.component";

export default [
    {
        path: 'listar',
        component: ListarUsuarioComponent,
    },
    {
        path: 'cadastrar',
        component: CadastrarUsuarioComponent,
    }
]