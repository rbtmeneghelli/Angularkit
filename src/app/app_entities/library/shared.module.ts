import { GenericTableComponent } from './../../shared/generic-table/generic-table.component';
import { AngularmaterialModule } from './angularmaterial.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData, CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardCabecalhoComponent } from '../../shared/card-cabecalho/card-cabecalho.component';
import { BlockCopyPasteDirective } from '../../shared/directive/block-copy-paste.directive';
import { OnlyNumberDirective } from '../../shared/directive/only-number.directive';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
import { NgxEditorModule } from 'ngx-editor';
import { CardDocumentosProcessoComponent } from '../../shared/card-processo/card-processo.component';
import { CardPdfViewerComponent } from '../../shared/card-pdf-viewer/card-pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CardEmailComponent } from 'src/app/shared/card-email/card-email.component';
import { PasteDateDirective } from 'src/app/shared/directive/paste-date.directive';
import { AutoFocusDirective } from 'src/app/shared/directive/autofocus.directive';
import { CardErrorComponent } from 'src/app/shared/card-error/card-error.component';
import { OnlyNumbersValidDirective } from 'src/app/shared/directive/only-numbers-valid.directive';
registerLocaleData(localePt, 'pt-BR');

@NgModule({
    declarations: [
        CardCabecalhoComponent,
        BlockCopyPasteDirective,
        OnlyNumberDirective,
        CardDocumentosProcessoComponent,
        GenericTableComponent,
        CardPdfViewerComponent,
        CardEmailComponent,
        PasteDateDirective,
        AutoFocusDirective,
        CardErrorComponent,
        OnlyNumbersValidDirective
    ],
    imports: [
        NgbModule,
        CommonModule,
        AngularmaterialModule,
        NgxMaskModule.forRoot(options),
        NgxEditorModule,
        PdfViewerModule
    ],
    exports: [
        CardCabecalhoComponent,
        BlockCopyPasteDirective,
        OnlyNumberDirective,
        CardDocumentosProcessoComponent,
        GenericTableComponent,
        CardPdfViewerComponent,
        CardEmailComponent,
        PasteDateDirective,
        AutoFocusDirective,
        CardErrorComponent,
        OnlyNumbersValidDirective
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' },
    ]
})

export class SharedModule { }
