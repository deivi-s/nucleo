import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { MetaData } from '../../interfaces/meta-data.interface';

@Component({
  selector: 'nucleo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterContentInit {

  @Input() metaData !: MetaData[];
  @Input() dataSource = [];

  @ViewChild(MatTable, { static: true }) table !: MatTable<any>;
  @ContentChildren(MatColumnDef, { descendants: true })
  columnDefs!: QueryList<MatColumnDef>;

  listFields = ['id', 'name'];

  constructor() { }

  ngOnInit(): void {
    this.listFields = this.metaData.map((item) => item.field);
  }

  ngAfterContentInit(): void {
    if (!this.columnDefs) {
      return;
    }

    this.columnDefs.forEach((columnDef) => {
      this.listFields.push(columnDef.name);
      this.table.addColumnDef(columnDef);
    });
  }

  select(row: any): void {
  }
  
}
