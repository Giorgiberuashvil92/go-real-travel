import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() currentPage: number;
  @Input() pagesAmount: number;
  @Input() pagesToShow: number;
  @Input() leftMostPage: number;
  @Output() page: EventEmitter<number> = new EventEmitter<number>();

  pagesArr: number[] = [];

  constructor() { }

  ngOnInit(): void {
    if(this.pagesToShow > this.pagesAmount) this.pagesToShow = this.pagesAmount;
    this.generateArray();
  }

  ngOnChanges() {
    if(this.leftMostPage + this.pagesToShow < this.currentPage) {
      this.leftMostPage = this.currentPage - this.pagesToShow + 1;
      this.generateArray();
    } else if(this.leftMostPage > this.currentPage) {
      this.leftMostPage = this.currentPage;
      this.generateArray();
    }
  }

  onLeft() {
    if(this.leftMostPage > 1) {
      this.leftMostPage--;
      this.generateArray();
    }
    if(this.currentPage > 1) {
      this.currentPage--;
      this.page.emit(this.currentPage);
    }
  }

  onRight() {
    if(this.leftMostPage + this.pagesToShow <= this.pagesAmount) {
      this.leftMostPage++;
      this.generateArray();
    }
    if(this.currentPage < this.pagesAmount) {
      this.currentPage++;
      this.page.emit(this.currentPage);
    }
  }

  onClick(page: number) {
    this.currentPage = page;
    this.page.emit(this.currentPage);
  }

  generateArray() {
    this.pagesArr = new Array<number>(this.pagesToShow);
    for(let i=0; i<this.pagesArr.length; i++) {
      this.pagesArr[i] = this.leftMostPage + i;
    }
  }
}
