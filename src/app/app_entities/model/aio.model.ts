import { Base, IBase } from './base.model';

export interface IAios extends IBase {
  Protocolo: string;
  Inicio: Date;
  Termino: Date;
  Permissionaria: string;
  ViaPrincipal: string;
  Subprefeitura: string;
  AltNumerica: number;
  TipoObra: string;
  Tpov: string;
  Tpu: string;
  Alvara: string;
  Status: string;
}

export class Aios extends Base {
  Protocolo: string;
  Inicio: Date;
  Termino: Date;
  Permissionaria: string;
  ViaPrincipal: string;
  Subprefeitura: string;
  AltNumerica: number;
  TipoObra: string;
  Tpov: string;
  Tpu: string;
  Alvara: string;
  Status: string;
}
