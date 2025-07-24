import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import { BaseService } from 'app/core/base/service/base.service';
import { Usuario } from 'app/model/usuario/usuario.model';

@Injectable({
    providedIn: 'root'
})

export class UsuarioService extends BaseService<Usuario> {
    
    public getUrl(): string {
        return `${environment.serverUrl}/usuario`;
    }

    public ativar(id: string): string {
        return `${this.getUrl()}/${id}/ativar`;
    }

    public inativar(id: string): string {
        return `${this.getUrl()}/${id}/inativar`;
    }

}