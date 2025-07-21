import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable({ providedIn: 'root' })
export abstract class BaseService<E> {
    public api = environment.serverUrl;

    constructor(protected http: HttpClient) {}

    protected abstract getUrl(): string;

    public listarTodos(): Observable<E[]> {
        return this.http.get<E[]>(this.getUrl());
    }

    public obterPorId(id: string): Observable<E> {
        return this.http.get<E>(`${this.getUrl()}/${id}`);
    }

    public cadastrar(entidade: E): Observable<E> {
        return this.http.post<E>(this.getUrl(), entidade);
    }

    public atualizar(entidade: E & { id: string }): Observable<E> {
        return this.http.put<E>(`${this.getUrl()}/${entidade.id}`, entidade);
    }

    public remover(id: string): Observable<any> {
        return this.http.delete<any>(`${this.getUrl()}/${id}`);
    }

}
