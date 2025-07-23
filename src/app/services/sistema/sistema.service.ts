import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import { BaseService } from 'app/core/base/service/base.service';
import { Sistema } from 'app/model/sistema/sistema.model';

@Injectable({
    providedIn: 'root'
})

export class SistemaService extends BaseService<Sistema> {

    public getUrl(): string {
        return `${environment.serverUrl}/sistemas`;
    }

}