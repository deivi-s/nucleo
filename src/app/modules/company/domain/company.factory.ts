import { Company, CompanyProperties } from './company';

export class CompanyFactory {
  static create(): Company {
    const userProperties: CompanyProperties = {};

    return new Company(userProperties);
  }
}
