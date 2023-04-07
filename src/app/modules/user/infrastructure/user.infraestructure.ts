import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ResultPage } from "src/app/core/domain/base.interface";
import { BaseInfrastructure } from "src/app/core/infrastructure/base-infrastructure";
import { environment } from "src/environments/environment";
import { User } from "../domain/user";
import { UserRepository } from "../domain/user.repository";

@Injectable()
export class UserInfrastructure
  extends BaseInfrastructure<User>
  implements UserRepository {
  userData = new BehaviorSubject(null);
  userDataAdmin = new BehaviorSubject(null);
  constructor(http: HttpClient) {
    super(http, 'usuarios');
  }
  page(page: number): Observable<ResultPage<User>> {
    throw new Error("Method not implemented.");
  }

  override listCompany(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/empresas`);
  }

  override listBranchOffice(id_empresa: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/empresas/sucursal/${id_empresa}`);
  }
  override listProject(id_sucursal: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/empresas/sucursal/proyecto/${id_sucursal}`);
  }

  listAdmins(page: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/usuarios/admin/${environment.pageSize}/${page}`);
  }

  listUser(page: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/usuarios/page/${environment.pageSize}/${page}`);
  }

  listHolding(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/holding`);
  }

  listHoldingID(id_holding: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/empresas/holding/${id_holding}`);
  }


}
