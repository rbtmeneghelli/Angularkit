import { Base, IBase } from './base.model';
import { EnumTipoDocumento } from '../enum/EnumTipoDocumento';

export interface IArquivo extends IBase {
    nomeArquivo?: string;
    descricaoArquivo?: string;
    tipoArquivo?: EnumTipoDocumento;
    tamanhoArquivo?: string;
    downloadUri?: string;
}

export class Arquivo extends Base {
    nomeArquivo: string;
    tipoArquivo?: EnumTipoDocumento;
    tamanhoArquivo: string;
    downloadUri?: string;
}
