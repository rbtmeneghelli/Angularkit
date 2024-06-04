import { AbstractControl, FormGroup } from '@angular/forms';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';
import { CardCabecalhoDTO } from 'src/app/app_entities/dto/cardCabecalho.dto';
import { statusList } from 'src/app/app_entities/shared/shared-lists';
import { arrDropDownList } from 'src/app/app_entities/shared/shared-types';

export abstract class BaseFormComponent {

    public cardCabecalhoDTO: CardCabecalhoDTO;
    public registroNovo: boolean;
    public formulario: FormGroup;
    public listaStatus: arrDropDownList = statusList;
    public bloquearCampo: boolean;

    constructor(tituloCard: string, tituloModulo: string, nomeTela: string) {
        this.cardCabecalhoDTO = getHeaderSettings(tituloCard, tituloModulo, nomeTela);
    }

    protected abstract salvar();
    protected abstract hasErrorFormControl(formControl: AbstractControl): string;

    protected limparFormulario() {
        this.formulario.reset();
    }
}
