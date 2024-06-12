import { NgModule } from "@angular/core";
import { CpfPipe } from "src/app/shared/pipes/cpf.pipe";
import { CpfCnpjPipe } from "src/app/shared/pipes/cpfcnpj.pipe";
import { DashIfEmptyPipe } from "src/app/shared/pipes/dash-if-empty.pipe";
import { DiaSemanaPipe } from "src/app/shared/pipes/diasemana.pipe";
import { InputCheckPipe } from "src/app/shared/pipes/input-check.pipe";
import { PhonePipe } from "src/app/shared/pipes/phone.pipe";
import { SafePipe } from "src/app/shared/pipes/safe.pipe";
import { StatusClassPipe } from "src/app/shared/pipes/status-class.pipe";
import { StatusPipe } from "src/app/shared/pipes/status.pipe";

@NgModule({
    declarations: [
        CpfCnpjPipe,
        DashIfEmptyPipe,
        DiaSemanaPipe,
        PhonePipe,
        SafePipe,
        StatusClassPipe,
        StatusPipe,
        InputCheckPipe,
        CpfPipe
    ],
    exports: [
        CpfCnpjPipe,
        DashIfEmptyPipe,
        DiaSemanaPipe,
        PhonePipe,
        SafePipe,
        StatusClassPipe,
        StatusPipe,
        InputCheckPipe,
        CpfPipe
    ],
})

export class PipesModule { }
