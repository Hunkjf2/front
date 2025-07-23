import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import { BaseService } from 'app/core/base/service/base.service';
import { Perfil } from 'app/model/perfil/perfil.model';

@Injectable({
    providedIn: 'root'
})

export class PerfilService extends BaseService<Perfil> {
    
    public getUrl(): string {
        return `${environment.serverUrl}/perfil`;
    }

}