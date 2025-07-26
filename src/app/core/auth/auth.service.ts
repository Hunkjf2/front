import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseService } from '../base/service/base.service';
import { environment } from 'environments/environment';
import { LoginCredentials } from 'app/model/auth/login';
import { RefreshToken } from 'app/model/auth/refreshToken.model';

@Injectable({providedIn: 'root'})
export class AuthService extends BaseService<any>
{

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
   
    public check(): Observable<boolean>
    {
        return of(true);
    }
}
