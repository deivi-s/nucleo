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
  userRegister = new BehaviorSubject(0);
  userActive = new BehaviorSubject(0);
  userPause = new BehaviorSubject(0);

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

  listUser(page: number, type: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/usuarios/page/${environment.pageSize}/${page}/${type}`);
  }

  listHolding(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/holding`);
  }

  listHoldingID(id_holding: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/empresas/holding/${id_holding}`);
  }

  getUser(id_user: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/usuarios/${id_user}`);
  }

  reporte(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/usuarios/reporte`);
  }

  reporteSucursal(id_sucursal: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/usuarios/reporte/sucursal/${id_sucursal}`);
  }

  reporteEmpresas(): Observable<any> {
    return this.http.get<any>(`${environment.apiPath}/usuarios/reporte/empresas`);
  }

  allSucursales(): Observable<any> {
    return this.http.get<any>(`${environment.apiPath}/empresas/lista/sucursales`);
  }

  logUser(user: any): Observable<any> {
    return this.http.post<any>(`${environment.apiPath}/usuarios/log`, user);
  }

  reporteUsabilidad(): Observable<any> {
    return this.http.get<any>(`${environment.apiPath}/usuarios/reporte/usabilidad`);
  }
}
