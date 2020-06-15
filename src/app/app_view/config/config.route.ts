import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './config.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
    { path: '', component: ConfigComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ConfigRoutingModule { }
