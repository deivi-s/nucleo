import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'nucleo-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() length: number = 0;
  @Input() pageSize: number = 0;
  @Input() pageIndex: number = 0;
  @Output() onChangePage: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  pageEvent(event: PageEvent) {
    this.onChangePage.emit(event.pageIndex);
  }

}
