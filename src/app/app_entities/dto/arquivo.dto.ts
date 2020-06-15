import { EnumTipoDocumento } from './../enum/EnumTipoDocumento';

export class ArquivoDTO {
    id?: number;
    nomeArquivo?: string;
    descricaoArquivo?: string;
    tipoDocumento?: string;
    tamanhoArquivo?: string;
    downloadUri?: string;
}