import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import { BaseService } from 'app/core/base/service/base.service';
import { Client } from 'app/model/client/client.model';

@Injectable({
    providedIn: 'root'
})

export class ClientService extends BaseService<Client> {

    public getUrl(): string {
        return `${environment.serverUrl}/clients`;
    }

}