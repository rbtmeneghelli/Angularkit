import { LoginRoutingModule } from './login.route';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../app_entities/library/angularmaterial.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedModule } from '../app_entities/library/shared.module';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    SharedModule,
    LoginRoutingModule,
    NgxMaskModule.forRoot(options)
  ],
  entryComponents: [
  ],
  providers: []
})
export class LoginModule {}

