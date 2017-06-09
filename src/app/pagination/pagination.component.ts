import { Component, Input, OnChanges,
    Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styles: [`
        .pagination {
            cursor: pointer;
        }
    `]
})
export class PaginationComponent implements OnChanges {
    @Input() items;
    @Input() numPerPage = 5;
    @Output('page-changed') change = new EventEmitter(); 
    private numPages : number;
    private pagesArray = [];
    private currentPage = 1;

    constructor() {}

    ngOnChanges() {
        this.currentPage = 1;
        this.pagesArray = [];
        if (this.items)
            this.calculatePages(this.items);
    }

    calculatePages(p) {
        this.numPages = Math.ceil(p.length / this.numPerPage);
        for (let i = 1; i <= this.numPages; i++) {
            this.pagesArray.push(i);
        }
    }

    setPage(page) {
        this.currentPage = page;
        this.change.emit({ newPage: this.currentPage });
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.change.emit({ newPage: this.currentPage });
        }
    }

    nextPage() {
        if (this.currentPage < this.numPages) {
            this.currentPage++;
            this.change.emit({ newPage: this.currentPage });
        }
    }
}