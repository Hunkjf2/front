import { Atributo } from "./atributo.model";
import { Credencial } from "./credencial.model";
export interface Usuario {
  id?: string;
  login: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  attributes?: Atributo;
  credentials?: Credencial[];
}