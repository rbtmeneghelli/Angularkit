export class SharedVariables {
    public static readonly REGEX_DATE = '\^((0[1-9]|[12][0-9]|3[01])[/]?(0[1-9]|1[0-2])[/]?[12][0-9]{3})';
    public static readonly REGEX_HOUR = '\^([0-1]{1}[0-9]{1}|[2][0-3]{1})[:]?([0-5]{1}[0-9]{1})';
    public static readonly REGEX_SAFRA = '\^[A-Z]{2}[0-9]{2}';
    public static readonly REGEX_LOTERW = '\[a-zA-Z]{2}[0-9]{7}';
    public static readonly REGEX_SCORE_BOARD = '\[A-Z a-z]{3}[0-9][0-9A-Z a-z][0-9]{2}';
    public static readonly REQUIRED = '*';
    public static readonly formFieldAppearance = 'outline';
    public static readonly formFieldFloatLabel = 'always';
    public static readonly iconBarCodeField = 'fa fa-barcode fa-1x btnIcon';
}

export class SharedMessages {
    public static readonly FORM_REQUIRED = 'O campo é obrigatório';
    public static readonly FORM_MINLENGTH = 'O campo deve ter no minimo 1 ou mais caracteres preenchido';
    public static readonly FORM_MAXLENGTH = 'O campo está com seu tamanho máximo ultrapassado';
    public static readonly FORM_PATTERN = 'Formato Padrão ABC1234 ou Formato Mercosul ABC1B34';
    public static readonly FORM_EMAIL = 'O campo está com email invalido';
    public static readonly FORM_VALID = 'Para salvar os campos devem estar preenchidos da forma correta, revise o formulário e tente novamente!';
    public static readonly FORM_TOKEN = 'Token renovado com sucesso';
    public static readonly FORM_TOKEN_ERROR = 'Token não renovado com sucesso';
    public static readonly FORM_TOKEN_EXPIRED = 'Requisição não autorizada! por favor efetue a renovação de seu token de acesso';
    public static readonly BTN_NEW = 'Cadastro efetuado com sucesso';
    public static readonly BTN_EDIT = 'Edição efetuado com sucesso';
    public static readonly BTN_DELETE = 'Exclusão efetuada com sucesso';
    public static readonly BTN_EXPORT = 'Exportação do arquivo efetuada com sucesso';
    public static readonly BTN_LOGIN = 'Login efetuado com sucesso';
}