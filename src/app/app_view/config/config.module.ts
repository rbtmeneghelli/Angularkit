import { SharedModule } from '../../app_entities/library/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../app_entities/library/angularmaterial.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ConfigRoutingModule } from './config.route';
import { ConfigComponent } from './config.component';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
    declarations: [
        ConfigComponent
    ],
    imports: [
        CommonModule,
        AngularmaterialModule,
        ConfigRoutingModule,
        SharedModule,
        NgxMaskModule.forRoot(options)
    ],
})
export class ConfigModule { }
