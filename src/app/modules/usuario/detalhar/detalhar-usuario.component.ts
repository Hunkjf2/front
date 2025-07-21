import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Formulario } from 'app/shared/models/model/formulario.model';
import { Usuario } from 'app/model/usuario/usuario.model';
import { FormularioUsuarioService } from 'app/services/usuario/formulario-usuario.service';
import { FormularioUsuarioComponent } from '../formulario/formulario-usuario.component';
import { carregarDados } from 'app/shared/utils/carregar-dados';

@Component({
  selector: 'app-detalhar-usuario',
  templateUrl: './detalhar-usuario.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormularioUsuarioComponent,
  ]
})
export class DetalharUsuarioComponent implements OnInit {

  public formularioDetalhar: Formulario<Usuario> = this.formularioUsuarioService.formulario();
  private usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];

  constructor(
    private formularioUsuarioService: FormularioUsuarioService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.desativarFormulario();
    carregarDados(this.formularioDetalhar, this.usuario)
  }

  private desativarFormulario(): void {
    this.formularioDetalhar.disable();
  }

}