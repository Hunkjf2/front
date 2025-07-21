import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MensagemSistema } from '../models/enum/mensagem-sistema.enum';

@Injectable({ providedIn: 'root' })
export class NotificacaoService {

  private readonly duracao: number = 3000;
  constructor(private snackBar: MatSnackBar, protected router: Router) {}

  public sucesso(mensagem?: string): void {
    this.snackBar.open(mensagem || MensagemSistema.SUCESSO, 'Fechar', {
      duration: this.duracao,
      panelClass: ['success-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  public erro(mensagem?: string): void {
    this.snackBar.open(mensagem || MensagemSistema.ERRO, 'Fechar', {
      duration: this.duracao,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  public sucessoNavegacao(rota: string): void {
    this.sucesso();
    setTimeout(() => {
        this.router.navigate([rota]);
    }, 1000);
  }
 
}