import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { ResultPage } from '../domain/base.interface';

export abstract class BaseInfrastructure<Entity> {
  constructor(
    public readonly http: HttpClient,
    private readonly endpoint: string
  ) {
    /* console.log(123); */
   }

  insert(entity: Partial<Entity>): Observable<any> {
    return this.http.post(`${environment.apiPath}/${this.endpoint}`, entity);
  }

  list(): Observable<Entity[]> {
    return this.http.get<Entity[]>(`${environment.apiPath}/${this.endpoint}`);
  }
  
  listOne(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

  update(id: number, entity: Partial<Entity>): Observable<Entity> {
    return this.http.patch<Entity>(
      `${environment.apiPath}/${this.endpoint}/${id}`,
      entity
    );
  }

  delete(id: number): Observable<any> {
    return this.http.get(`${environment.apiPath}/${this.endpoint}/disable/${id}`);
  }

  listCompany(): Observable<Entity[]> {
    console.log(3333);
    return this.http.get<Entity[]>(`${environment.apiPath}/${this.endpoint}`);
  }

  listBranchOffice(id: number): Observable<Entity[]> {
    return this.http.get<Entity[]>(`${environment.apiPath}/${this.endpoint}`);
  }

  listProject(id: number): Observable<Entity[]> {
    return this.http.get<Entity[]>(`${environment.apiPath}/${this.endpoint}`);
  }
}
