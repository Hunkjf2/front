import { Client } from "../client/client.model";

export interface Sistema {
  id: number;
  name: string;
  description: string;
  clients: Client[]
}