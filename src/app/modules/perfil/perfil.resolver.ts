import { ResolveFn } from "@angular/router";
import { inject } from '@angular/core';
import { PerfilService } from "app/services/perfil/perfil.service";
import { Perfil } from "app/model/perfil/perfil.model";

export const perfilResolver: ResolveFn<Perfil> = (route) => {
  const perfilService = inject(PerfilService);
  const id = route.paramMap.get('id');
  return perfilService.obterPorId(id)
};