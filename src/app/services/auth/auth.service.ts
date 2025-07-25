
import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import { BaseService } from 'app/core/base/service/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCredentials } from 'app/model/auth/login';
import { RefreshToken } from 'app/model/auth/refreshToken.model';

@Injectable({
    providedIn: 'root'
})

export class AuthService extends BaseService<any> {

    constructor(protected http: HttpClient) {
        super(http);
    }

    public getUrl(): string {
        return `${environment.serverUrl}/auth`;
    }

    public login(credentials: LoginCredentials ): Observable<any> {
        return this.http.post<any>(`${this.getUrl()}/login`, credentials)
    }

    public refreshToken(refreshToken: RefreshToken): Observable<any> {
        return this.http.post<any>(`${this.getUrl()}/refresh-token`, refreshToken)
    }

}