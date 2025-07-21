import { ResolveFn } from "@angular/router";
import { inject } from '@angular/core';
import { UsuarioService } from "app/services/usuario/usuario.service";
import { Usuario } from "app/model/usuario/usuario.model";

export const usuarioResolver: ResolveFn<Usuario> = (route) => {
  const usuarioService = inject(UsuarioService);
  const id = route.paramMap.get('id');
  return usuarioService.obterPorId(id)
};