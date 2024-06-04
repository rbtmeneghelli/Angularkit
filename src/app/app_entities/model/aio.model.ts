import { Base } from '../generic/base.model';

export interface IAios {
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

export class Aios extends Base implements IAios{
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
