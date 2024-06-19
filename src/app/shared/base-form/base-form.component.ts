import { inject } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/app_business/service/shared.service';
import { CardCabecalhoDTO } from 'src/app/app_entities/dto/cardCabecalho.dto';
import { statusList } from 'src/app/app_entities/shared/shared-lists';
import { arrDropDownList } from 'src/app/app_entities/shared/shared-types';

export abstract class BaseFormComponent {

    private readonly _sharedService = inject(SharedService);

    public cardCabecalhoDTO: CardCabecalhoDTO;
    public registroNovo: boolean;
    public formulario: FormGroup;
    public listaStatus: arrDropDownList = statusList;
    public bloquearCampo: boolean;
    
    protected abstract saveForm();
    protected abstract hasErrorFormControl(formControl: AbstractControl): string;
    
    protected cleanForm() {
        this.formulario.reset();
    }

    protected getHeaderPage(tituloCard: string, tituloModulo: string, nomeTela: string) {
        this.cardCabecalhoDTO = this._sharedService.getHeaderSettings(tituloCard, tituloModulo, nomeTela);
    }
}
