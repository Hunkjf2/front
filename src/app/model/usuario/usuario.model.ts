export interface Usuario {
  id?: string;
  login: string;
  username: string;
  email: string;
  cpf: string;
  firstName: string;
  lastName: string;
  phone?: string;
  senha?: string;
  senhaTemporaria?: boolean;
}