import { Base } from '../generic/base.model';
import { EnumTipoDocumento } from '../enum/EnumTipoDocumento';

export interface IArquivo {
    nomeArquivo?: string;
    descricaoArquivo?: string;
    tipoArquivo?: EnumTipoDocumento;
    tamanhoArquivo?: string;
    downloadUri?: string;
}

export class Arquivo extends Base implements IArquivo {
    nomeArquivo: string;
    tipoArquivo?: EnumTipoDocumento;
    tamanhoArquivo: string;
    downloadUri?: string;
}
