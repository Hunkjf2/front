import { NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AuthResponse } from 'app/model/auth/authResponse.model';
import { LoginCredentials } from 'app/model/auth/login';
import { AuthService } from 'app/services/auth/auth.service';
import { FormularioLoginService } from 'app/services/auth/formulario-login.service';
import { Formulario } from 'app/shared/models/model/formulario.model';
import { NotificacaoService } from 'app/shared/services/notificacao.service';

@Component({
    selector     : 'app-login',
    templateUrl  : './login.component.html',
    styleUrls   : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    standalone   : true,
    imports      : [NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignInComponent
{

    public formularioLogin: Formulario<LoginCredentials> = this._formularioLoginService.formulario();

    constructor(
        private readonly _authService: AuthService,
        private readonly _formularioLoginService: FormularioLoginService,
        private readonly _router: Router,
        private readonly notificacaoService: NotificacaoService
    ){}

    public login(): void
    {
        this._formularioLoginService.validarFormulario(this.formularioLogin) && this.executarLogin();
    }

    private executarLogin(): void {
        this._authService.login(this.formularioLogin.value).subscribe({
            next: (dados: AuthResponse) => {
                localStorage.setItem('accessToken', dados.accessToken);
                localStorage.setItem('refreshToken', dados.refreshToken);
                this.notificacaoService.sucessoNavegacao('/usuario/cadastrar');
            },
            error: (_) => {
                
            },
        });
    }

}
