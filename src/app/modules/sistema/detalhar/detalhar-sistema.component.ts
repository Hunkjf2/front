import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Formulario } from 'app/shared/models/model/formulario.model';
import { carregarDados } from 'app/shared/utils/carregar-dados';
import { FormularioSistemaComponent } from '../formulario/formulario-sistema.component';
import { Sistema } from 'app/model/sistema/sistema.model';
import { FormularioSistemaService } from 'app/services/sistema/formulario-sistema.service';

@Component({
  selector: 'app-detalhar-sistema',
  templateUrl: './detalhar-sistema.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormularioSistemaComponent,
  ]
})
export class DetalharSistemaComponent implements OnInit {

  public formularioDetalhar: Formulario<Sistema> = this.formularioSistemaService.formulario();
  private readonly sistema: Sistema = this.activatedRoute.snapshot.data['sistema'];

  constructor(
    private readonly formularioSistemaService: FormularioSistemaService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.desativarFormulario();
    carregarDados(this.formularioDetalhar, this.sistema);
  }

  private desativarFormulario(): void {
    this.formularioDetalhar.disable();
  }

}