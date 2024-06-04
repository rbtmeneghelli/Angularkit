export interface ICredenciaisDTO {
  login?: string;
  senha?: string;
  perfil?: string;
  roles?: Array<string>;
  token?: string;
}

export class CredenciaisDTO implements ICredenciaisDTO{
  login?: string;
  senha?: string;
  perfil?: string;
  roles?: Array<string>;
  token?: string;
}
