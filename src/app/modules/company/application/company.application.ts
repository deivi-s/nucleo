import { Inject, Injectable } from "@angular/core";
import { BaseApplication } from "src/app/core/application/base-application";
import { Company } from "../domain/company";
import { CompanyRepository } from "../domain/company.repository";
import { CompanyInfrastructure } from "../infrastructure/company.infraestructure";

@Injectable()
export class CompanyApplication extends BaseApplication<Company, CompanyRepository> {
  constructor(
    @Inject(CompanyInfrastructure)
    private readonly companyRepository: CompanyRepository
  ) {
    super(companyRepository);
  }
}