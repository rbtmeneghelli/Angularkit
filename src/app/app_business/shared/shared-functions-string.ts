import { AbstractControl } from "@angular/forms";
import { SharedMessages } from "../../app_entities/shared/shared-messages";
import { SharedVariables } from "src/app/app_entities/shared/shared-variables";

export const convertBase64ToString = (char: string): string => {
  return decodeURIComponent(escape(atob(char)));
};

export const convertStringToBase64 = (char: string): string => {
  return btoa(unescape(encodeURIComponent(char)));
};

export const makeReplaceSpecialCharactersInResponse = (
  prop: string,
  spCharacter: string
): string => {
  return prop.replace(
    new RegExp(spCharacter, "g"),
    convertBase64ToString(spCharacter)
  );
};

export const makeReplaceLeftBracket = (
  prop: string,
  spCharacter: string
): string => {
  return prop.replace(/\(/g, convertStringToBase64(spCharacter));
};

export const makeReplaceRightBracket = (
  prop: string,
  spCharacter: string
): string => {
  return prop.replace(/\)/g, convertStringToBase64(spCharacter));
};

export const getUrl = (): string => {
  return window.location.href;
};

export const makeReplaceSpecialCharactersInRequest = (
  prop: string,
  spCharacter: string
): string => {
  return prop.replace(
    new RegExp(spCharacter, "g"),
    convertStringToBase64(spCharacter)
  );
};

export const somenteNumerosValidos = (value: string): string => {
  value = value.toString().replace(SharedVariables.REGEX_ONLY_NUMBER, "");
  return !!value ? (value !== "0" ? parseInt(value).toString() : "") : "";
};

export const getOnlyNumbers = (value: any): string => {
  return (value ?? "")
    .toString()
    .replace(SharedVariables.REGEX_ONLY_NUMBER, "");
};

export const getOnlyAlphaNumeric = (value: any): string => {
  return (value ?? "")
    .toString()
    .replace(SharedVariables.REGEX_ONLY_ALPHANUMERIC, "");
};

export const truncate = (
  source: string,
  size: number,
  concat: string
): string => {
  return source.length > size ? source.slice(0, size - 1) + concat : source;
};

export const toBrazilFormat = (
  value: any,
  minimumFractionDigits: number = 8,
  maximumFractionDigits: number = 8
): string => {
  if (value == null) return null;
  let newValue = parseFloat(value.toString());
  const numberFomat = Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  });
  return numberFomat.format(newValue);
};

export const getNoRepeatedSpaceAlphanumeric = (value: any): string => {
  return (value ?? "")
    .toString()
    .replace(SharedVariables.REGEX_NOT_REPEATED_SPACE, " ")
    .replace(SharedVariables.REGEX_NOT_SPECIAL_CHARACTER, "");
};

export const converteStringParaDecimal = (value: string): string => {
  return value.replace(",", ".");
};

export const converteStringParaDecimalToDatabase = (value: string): string => {
  const regex = /\./gi;
  const stNumeroSplit = value.split(".");
  if (stNumeroSplit.length > 1) {
    return (
      stNumeroSplit[0].replace(regex, "").trim() +
      stNumeroSplit[1].replace(",", ".")
    );
  }
  return value.replace(",", ".");
};

export const converteDecimalParaString = (numero: string): string => {
  const regex = /\,/gi;
  const stNumero: string = Number(numero)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const stNumeroSplit = stNumero.split(".");
  return stNumeroSplit[0].replace(regex, ".") + "," + stNumeroSplit[1];
};

export const convertTimeStampToStringTime = (parametro: string): string => {
  const horaInicio =
    new Date(parametro).getUTCHours() +
    ":" +
    (new Date(parametro).getUTCMinutes() < 10
      ? "0" + new Date(parametro).getUTCMinutes()
      : new Date(parametro).getUTCMinutes());
  return horaInicio;
};

export const formataMilhar = (numero: number): string => {
  const regex = /\,/gi;
  const stNumero: string = numero
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const stNumeroSplit = stNumero.split(".");
  return stNumeroSplit[0].replace(regex, ".") + "," + stNumeroSplit[1];
};

export const getArquivoExtensao = (url: string): string => {
  return "." + url.substring(url.lastIndexOf(".") + 1, url.length) || url;
};

export const removerAcentos = (s: string): string => {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
};

export const formataNumeroToMilhar = (
  stNumero: string,
  blTrocarVirgulaPorPonto
): string => {
  if (!!stNumero) {
    if (blTrocarVirgulaPorPonto) {
      stNumero = stNumero.trim().replace(",", ".");
    } else {
      stNumero = stNumero.trim().replace(".", ",");
    }
  } else {
    stNumero = "0";
  }
  return stNumero;
};

export const b64DecodeUnicode = (str): string => {
  // tslint:disable-next-line: only-arrow-functions
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
};

export const applyFontFamilyOnText = (texto: string): string => {
  if (!!texto) {
    if (
      texto.includes('<span style="font-family: sans serif; font-size: 9px;">')
    ) {
      return texto;
    } else if (texto === "" || texto.includes("<br>")) {
      return "";
    } else {
      return (
        '<span style="font-family: sans serif; font-size: 9px;">' +
        texto +
        "</span>"
      );
    }
  }
  return "";
};

export const getDateFormat = (value: Date): string => {
  return value.toLocaleDateString().split("/").reverse().join("-");
};

export const convertStringToBinaryString = (text: string): string => {
  var result = "";
  if (!!text) {
    for (var i = 0; i < text.length; i++) {
      result += text[i].charCodeAt(0).toString(2) + " ";
    }
  } else {
    result = text;
  }
  return result;
};

export const convertStringToDate = (date?: string): string => {
  if (!!date && date?.length >= 10) {
    return new Date(date).toLocaleDateString("pt-br", { timeZone: "UTC" });
  } else {
    return "";
  }
};

export const convertStringToDateOrTimeOnly = (
  pDate?: string,
  isDate?: boolean
): string => {
  if (!!pDate && pDate?.length >= 10) {
    // tslint:disable-next-line: max-line-length
    return isDate
      ? new Date(pDate).toLocaleDateString("pt-br", { timeZone: "UTC" })
      : new Date(pDate)
          .toLocaleTimeString("pt-br", { timeZone: "UTC" })
          .substr(0, 5);
  } else {
    return "";
  }
};

export const replaceAll = (
  word?: string,
  oldletter?: string,
  newLetter?: string
): string => {
  if (!!word) {
    word = word.replace(new RegExp(oldletter, "g"), newLetter).trim();
  }
  return word;
};

export const convertNumberToString = (value?: number): string => {
  return value?.toLocaleString("pt-br");
};

export const convertStringToTimeSpan = (value?: string): string => {
  if (!!value) {
    if (value.length === 4) {
      return value.substring(0, 2) + ":" + value.substring(2, 4);
    } else if (value.length > 4) {
      return value.substring(0, 2) + value.substring(5, 2);
    }
  }
  return (
    SharedVariables.CURRENT_DATE.getHours() +
    ":" +
    SharedVariables.CURRENT_DATE.getMinutes()
  );
};

export const createDateToString = (date?: string): string => {
  if (date?.length >= 8) {
    date = replaceAll(date, "/", "");
    // tslint:disable-next-line: max-line-length
    return (
      Number(date.substr(date.length - 4, 4)) +
      "-" +
      Number(date.substr(2, 2)) +
      "-" +
      Number(date.substr(0, 2))
    );
  }
};

export const convertObjInByte = (data: any): string => {
  return btoa(JSON.stringify(data));
};

export const convertPtBrDateStringToEnUsDateString = (
  dateValue: string
): string => {
  return dateValue.split("/").reverse().join("-");
};

export const hasErrorFormControl = (formControl?: AbstractControl): string => {
  return formControl.hasError("required")
    ? SharedMessages.FORM_REQUIRED
    : formControl.hasError("minlength")
    ? SharedMessages.FORM_MINLENGTH
    : formControl.hasError("maxlength")
    ? SharedMessages.FORM_MAXLENGTH
    : formControl.hasError("pattern")
    ? SharedMessages.FORM_PATTERN
    : formControl.hasError("email")
    ? SharedMessages.FORM_EMAIL
    : "";
};

export const formatValueInCoin = (valor: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};
