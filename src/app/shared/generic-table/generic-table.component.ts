import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-generic-table',
    templateUrl: './generic-table.component.html',
    styleUrls: ['./generic-table.component.scss']
})
  
export class GenericTableComponent implements OnInit {
    @Input() dataSource: [any];
    @Input() displayedColumns: any[] = [];
    @Input() columns: any[] = [];

    dtSource = [];
    dsplColumns = [];
    myColumns = [];
    loading = true;

    ngOnInit() {
        this.dtSource = this.dataSource;
        this.dsplColumns = this.displayedColumns;
        this.myColumns = this.columns;
        this.loading = false;
    }
}
