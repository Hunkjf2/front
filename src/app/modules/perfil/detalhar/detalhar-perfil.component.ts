import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Formulario } from 'app/shared/models/model/formulario.model';
import { carregarDados } from 'app/shared/utils/carregar-dados';
import { FormularioPerfilComponent } from '../formulario/formulario-perfil.component';
import { Perfil } from 'app/model/perfil/perfil.model';
import { FormularioPerfilService } from 'app/services/perfil/formulario-perfil.service';

@Component({
  selector: 'app-detalhar-perfil',
  templateUrl: './detalhar-perfil.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormularioPerfilComponent,
  ]
})
export class DetalharPerfilComponent implements OnInit {

  public formularioDetalhar: Formulario<Perfil> = this.formularioPerfilService.formulario();
  private perfil: Perfil = this.activatedRoute.snapshot.data['perfil'];

  constructor(
    private formularioPerfilService: FormularioPerfilService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.desativarFormulario();
    carregarDados(this.formularioDetalhar, this.perfil)
  }

  private desativarFormulario(): void {
    this.formularioDetalhar.disable();
  }

}