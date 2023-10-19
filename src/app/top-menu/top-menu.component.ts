import { Router } from '@angular/router';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SharedService } from '../app_business/service/shared.service';
import { SharedNotificationService } from '../app_business/service/shared-notification.service';

@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, OnChanges {

    public changeArrow?: boolean;
    public currentPage?: string;
    public userName?: string;
    public connectionStatus: boolean;

    // tslint:disable-next-line: max-line-length
    constructor(protected route: Router, protected generalService: SharedService, protected sharedNotificationService: SharedNotificationService) {
        this.changeArrow = false;
    }

    async ngOnChanges(changes: SimpleChanges): Promise<void> {
        await this.generalService.getCurrentPageValue().subscribe(response => {
            this.currentPage = response;
        });
    }

    async ngOnInit(): Promise<void> {
        await this.generalService.getCurrentPageValue().subscribe(response => {
            this.currentPage = response;
        });
    }
}
