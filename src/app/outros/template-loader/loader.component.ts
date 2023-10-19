import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../app_business/service/loader.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
    public color = 'primary';
    public mode = 'indeterminate';
    public value = '50';
    public loading: boolean;
    constructor(private loaderService: LoaderService) {
        this.loaderService.isLoading.subscribe((v) => {
            this.loading = v;
        });
    }
    ngOnInit() {
    }

}
