import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ResultPage } from "src/app/core/domain/base.interface";
import { BaseInfrastructure } from "src/app/core/infrastructure/base-infrastructure";
import { environment } from "src/environments/environment";
import { Company } from "../domain/company";
import { CompanyRepository } from "../domain/company.repository";

@Injectable()
export class CompanyInfrastructure
  extends BaseInfrastructure<Company>
  implements CompanyRepository {
  companyData = new BehaviorSubject(null);
  companyDataAdmin = new BehaviorSubject(null);
  companyRegister = new BehaviorSubject(0);
  companyActive = new BehaviorSubject(0);
  companyPause = new BehaviorSubject(0);
  filter = new BehaviorSubject(null);


  constructor(http: HttpClient) {
    super(http, 'empresas');
  }

  page(page: number): Observable<ResultPage<Company>> {
    throw new Error("Method not implemented.");
  }
  
  listEmpresa(page: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/empresas/page/${environment.pageSize}/${page}`);
  }
  
  insertEmpresa(empresa: any ): Observable<any[]> {
    return this.http.post<any>(`${environment.apiPath}/empresas`, empresa);
  }

  getEmpresa(id_company: number): Observable<any> {
    return this.http.get<any[]>(`${environment.apiPath}/empresas/${id_company}`);
  }

  disableEmpresa(id_company: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/empresas/disable/${id_company}`);
  }

  disableSucursal(id_sucursal: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/empresas/sucursal/disable/${id_sucursal}`);
  }

  updateSucursal(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiPath}/empresas/sucursal/update/${id}`,data);
  }

  updateProyecto(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiPath}/empresas/proyecto/update/${id}`,data);
  }

  disableProyect(id_proyecto: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/empresas/proyecto/disable/${id_proyecto}`);
  }

  allSucursalUsuarioByIdSucursal(id_sucursal: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/usuarios/empresa/sucursal/${id_sucursal}`);
  }

  allProyectUsuarioByIdSucursal(id_sucursal: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/usuarios/empresa/proyecto/${id_sucursal}`);
  }

  disableProyectoUsuario(id_sucursal: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/usuarios/empresa/proyecto/disable/${id_sucursal}`);
  }

  disableSucursalUsuario(id_sucursal: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiPath}/usuarios/empresa/sucursal/disable/${id_sucursal}`);
  }

  insertEmpresaUnique(empresa: any ): Observable<any[]> {
    return this.http.post<any>(`${environment.apiPath}/empresas/nuevo`, empresa);
  }

  insertSucursalUnique(sucursal: any ): Observable<any[]> {
    return this.http.post<any>(`${environment.apiPath}/empresas/sucursal/nuevo`, sucursal);
  }

  insertProyectUnique(proyecto: any ): Observable<any[]> {
    return this.http.post<any>(`${environment.apiPath}/empresas/proyecto/nuevo`, proyecto);
  }
}
