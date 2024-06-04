import { CardCabecalhoDTO } from "src/app/app_entities/dto/cardCabecalho.dto";

export const convertBase64ToString = (char: string): string => {
    return decodeURIComponent(escape(atob(char)));
}

export const convertStringToBase64 = (char: string): string => {
    return btoa(unescape(encodeURIComponent(char)));
}

export const makeReplaceSpecialCharactersInResponse = (prop: string, spCharacter: string): string => {
    return prop.replace(new RegExp(spCharacter, "g"), convertBase64ToString(spCharacter));
}

export const isStringHasNonAsciiCharacters = (text: string): boolean => {
    return /[\w\s\u00C0-\u017F]/gi.test(text);
}

export const makeReplaceLeftBracket = (prop: string, spCharacter: string): string => {
    return prop.replace(/\(/g, convertStringToBase64(spCharacter));
}

export const makeReplaceRightBracket = (prop: string, spCharacter: string): string => {
    return prop.replace(/\)/g, convertStringToBase64(spCharacter));
}

export const getSpecialCharactersFromString = (text: string): any => {
    var spCharactersStringList: any[] = [];
    var exceptionCharactersList: any[] = ['/', ':', '-', '+', '*', ',', '.']
    var specialCharactersFromText = text.replace(/[\w\s\u00C0-\u017F]/gi, '').trim();
    for (var i = 0; i <= specialCharactersFromText.length; i++) {
        var character = specialCharactersFromText.substr(i, 1);
        if (exceptionCharactersList.includes(character) === false && !!character) {
            spCharactersStringList.push(character);
        }
    }
    return spCharactersStringList;
}

export const getHeaderSettings = (tituloCard: string, tituloModulo: string, nomeTela: string): CardCabecalhoDTO => {
    let cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
    cardCabecalhoDTO.tituloCard = tituloCard;
    cardCabecalhoDTO.tituloModulo = tituloModulo;
    cardCabecalhoDTO.nomeTela = nomeTela;
    return cardCabecalhoDTO;
}

export const getUrl = (): string => {
    return window.location.href;
}
