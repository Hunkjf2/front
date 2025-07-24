import { ResolveFn } from "@angular/router";
import { inject } from '@angular/core';
import { Sistema } from "app/model/sistema/sistema.model";
import { SistemaService } from "app/services/sistema/sistema.service";

export const sistemaResolver: ResolveFn<Sistema> = (route) => {
  const sistemaService = inject(SistemaService);
  const id = route.paramMap.get('id');
  return sistemaService.obterPorId(id)
};