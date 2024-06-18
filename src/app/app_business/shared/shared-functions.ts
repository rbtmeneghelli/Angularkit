import { CardCabecalhoDTO } from "src/app/app_entities/dto/cardCabecalho.dto";
import { convertStringToBase64, makeReplaceLeftBracket, makeReplaceRightBracket, makeReplaceSpecialCharactersInRequest, makeReplaceSpecialCharactersInResponse, replaceAll } from "./shared-functions-string";
import { isStringHasNonAsciiCharacters } from "./shared-functions-boolean";
import { arrDropDownList } from "src/app/app_entities/shared/shared-types";
import { DropDownList } from "src/app/app_entities/generic/dropdownlist.model";

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

export const convertDataStringToBase64 = (obj): any => {
    try {

        //var spCharactersStringList: any = ['%', "'", '#', '“', '”', '"', '`', '(', ')'];
        var spCharacters: any = ['(', ')'];

        Object.keys(obj).forEach(function (chave) {

            var prop = obj[chave];

            if (typeof prop === 'object' && !!prop) {
                convertDataStringToBase64(prop);
            }

            else {

                if (typeof prop === 'string' && !!prop) {

                    if (isStringHasNonAsciiCharacters(prop)) {

                        var spCharactersStringList = getSpecialCharactersFromString(prop);

                        spCharactersStringList.forEach(spCharacter => {

                            if (prop?.indexOf(spCharacter) !== -1 && spCharacters.includes(spCharacter) === false) {
                                prop = makeReplaceSpecialCharactersInRequest(prop, spCharacter);
                            }

                            else if (prop?.indexOf(spCharacter) !== -1 && spCharacters[0] === spCharacter) {
                                prop = makeReplaceLeftBracket(prop, spCharacter);
                            }

                            else if (prop?.indexOf(spCharacter) !== -1 && spCharacters[1] === spCharacter) {
                                prop = makeReplaceRightBracket(prop, spCharacter);
                            }

                            obj[chave] = prop;
                        });
                    }
                }
            }
        });
        return obj;
    }

    catch (e) {
        alert(e);
    }
}

export const convertDataBase64ToString = (obj): any => {
    try {

        var spCharactersStringList: any = ['%', "'", '#', '“', '”', '"', '`', '(', ')'];

        Object.keys(obj).forEach(function (chave) {

            var prop = obj[chave];
            if (typeof prop === 'object') {
                convertDataBase64ToString(prop);
            }

            else {
                if (typeof prop === 'string') {
                    spCharactersStringList.forEach(spCharacter => {
                        if (prop?.indexOf(convertStringToBase64(spCharacter)) !== -1) {
                            prop = makeReplaceSpecialCharactersInResponse(prop, convertStringToBase64(spCharacter));
                        }
                        obj[chave] = prop;
                    });
                }
            }
        });
        return obj;
    }
    catch (e) {
        alert(e);
    }
}

export const _filterDropDownList = (list?: any[], value?: string): arrDropDownList => {
    if (!!list && list?.length > 0) {
        if (value?.length > 0 && !!value) {
            list = list.filter(option => option.name?.toLowerCase()?.includes(value?.toLowerCase()));
        }
        return orderByDropDownList(list);
    } else {
        return new Array<DropDownList>();
    }
}

export const orderByDropDownList = (lista: arrDropDownList): arrDropDownList => {
    // tslint:disable-next-line: only-arrow-functions
    return lista.sort(function (a, b) {
        if (a.viewValue > b.viewValue) {
            return 1;
        }
        if (a.viewValue < b.viewValue) {
            return -1;
        }
        return 0;
    });
}

export const createDateTimeData = (date?: string, time?: string): Date => {
    if (date?.length >= 8 && time?.length >= 4) {
        if (date?.includes('/')) {
            date = replaceAll(date, '/', '');
        }
        if (time?.includes(':')) {
            time = replaceAll(time, ':', '');
        }
        // tslint:disable-next-line: max-line-length
        return new Date(Date.UTC(Number(date.substr(date.length - 4, 4)), Number(date.substr(2, 2)) - 1, Number(date.substr(0, 2)), Number(time.substr(0, 2)), Number(time.substr(2, 2)), 0, 0));
    }
}

export const createDate = (date?: string): Date => {
    if (date?.length >= 8 && !date?.includes('/')) {
        return new Date(Number(date.substr(date.length - 4, 4)), Number(date.substr(2, 2)) - 1, Number(date.substr(0, 2)));
    } else if (!!date) {
        date = replaceAll(date, '/', '');
        return new Date(Number(date.substr(date.length - 4, 4)), Number(date.substr(2, 2)) - 1, Number(date.substr(0, 2)));
    }
}

/* Metodos para exportação de grafico pelo javascript 
https://github.com/primefaces/primefaces/issues/920
https://stackoverflow.com/questions/25304803/primefaces-print-doesnt-work-with-pchart
https://stackoverflow.com/questions/12930731/generate-png-jpeg-image-of-primefaces-charts-in-backing-bean
*/

export const exportChartToBrowsers = (widgetVarDoChart):void => {
//     var img = null;
//    $('#output').empty().append(PF(widgetVarDoChart).exportAsImage());
//     obj = $('#dlg_imagem_chart');
//    $(obj).find("> div > div > img").each(function() {
//        img = $(this).attr('src');
//    });
//    var link = document.createElement('a');
//    link.href = img;
//    link.download = 'grafico.jpg';
//    document.body.appendChild(link);
//    link.click();  
//    $(link).remove();   
//    PF('dlg_imagem_chart').show(); 
} 


export const exportChartToIE = (widgetVarDoChart): void => {
//    var img = null;
//    $('#output').empty().append(PF(widgetVarDoChart).exportAsImage());
//     obj = $('#dlg_imagem_chart');
//    $(obj).find("> div > div > img").each(function(dados,Valor) {
//        var t = Valor.href.replace("data:image/png;base64,","");
//        img = t;
//    });

//    // Convert from base64 to an ArrayBuffer
//    var byteString = atob(img);
//    var buffer = new ArrayBuffer(byteString.length);
//    var intArray = new Uint8Array(buffer);
//    for (var i = 0; i < byteString.length; i++) {
//        intArray[i] = byteString.charCodeAt(i);
//    }
       
//    var blobObject = new Blob([buffer], {type: "image/jpg"});
//    window.navigator.msSaveOrOpenBlob(blobObject, "grafico.jpg");
}
