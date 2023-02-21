import { Observable } from 'rxjs';

export interface ResultPage<Entity> {
  records: Entity[];
  totalRecords: number;
}

export interface Base<Entity> {
  insert(entity: Partial<Entity>): Observable<any>;
  list(): Observable<Entity[]>;
  listOne(id: number): Observable<any>;
  update(id: number, entity: Partial<Entity>): Observable<Entity>;
  delete(id: number): Observable<any>;
  page(page: number): Observable<ResultPage<Entity>>;
}
