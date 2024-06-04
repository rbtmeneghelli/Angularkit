import { Validators } from "@angular/forms";
import { arrNumber } from "./shared-types";

export class SharedVariables {
    public static readonly REGEX_DATE = '\^((0[1-9]|[12][0-9]|3[01])[/]?(0[1-9]|1[0-2])[/]?[12][0-9]{3})';
    public static readonly REGEX_HOUR = '\^([0-1]{1}[0-9]{1}|[2][0-3]{1})[:]?([0-5]{1}[0-9]{1})';
    public static readonly REGEX_SAFRA = '\^[A-Z]{2}[0-9]{2}';
    public static readonly REGEX_LOTERW = '\[a-zA-Z]{2}[0-9]{7}';
    public static readonly REGEX_SCORE_BOARD = '\[A-Z a-z]{3}[0-9][0-9A-Z a-z][0-9]{2}';
    public static readonly REQUIRED: string = '*';
    public static readonly formFieldAppearance: string = 'outline';
    public static readonly formFieldFloatLabel: string = 'always';
    public static readonly iconBarCodeField: string = 'fa fa-barcode fa-1x btnIcon';
    public static readonly PAGE_SIZE_OPTION?: arrNumber = [25, 50, 100, 500, 1000, 2000];
    public static readonly CURRENT_DATE: Date = new Date();
}

export class SharedValidators {
    public static readonly FRM_REQUIRED: Validators = Validators.required;
}