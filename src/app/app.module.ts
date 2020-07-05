import { AgendaModule } from './app_view/agenda/agenda.module';
import { ServicoModule } from './app_view/servico/servico.module';
import { FuncionalidadeModule } from './app_view/funcionalidade/funcionalidade.module';
import { EmpresaModule } from './app_view/empresa/empresa.module';
import { ContaModule } from './app_view/conta/conta.module';
import { ConfigModule } from './app_view/config/config.module';
import { AuditoriaModule } from './app_view/auditoria/auditoria.module';
import { BancoModule } from './app_view/banco/banco.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularmaterialModule } from './app_entities/library/angularmaterial.module';
import { AppHeaderComponent } from './navbar/app-header.component';
import { AppFooterComponent } from './footer/app-footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClienteModule } from './app_view/cliente/cliente.module';
import { CommonModule } from '@angular/common';
import { LoaderService } from './app_business/service/loader.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './app_entities/library/loader.interceptor';
import { LoaderComponent } from './outros/template-loader/loader.component';
import { TemplateOutrosModule } from './outros/template-outros.module';

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    DashboardComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularmaterialModule,
    AppRoutingModule,
    NgbModule,
    ClienteModule,
    BancoModule,
    AuditoriaModule,
    ConfigModule,
    ContaModule,
    EmpresaModule,
    FuncionalidadeModule,
    ServicoModule,
    AgendaModule,
    HttpClientModule,
    TemplateOutrosModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
