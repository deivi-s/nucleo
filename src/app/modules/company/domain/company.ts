export interface CompanyRequired {
    
}

export interface CompanyOptional {
    id: number;
    activo: boolean;
}

export type CompanyProperties = CompanyRequired & Partial<CompanyOptional>;

export type CompanyUpdate = { };

export class Company {
   

    constructor(properties: CompanyProperties) {
        Object.assign(this, properties);
    }

    properties(): CompanyProperties {
        return { };
    }

    update(properties: CompanyUpdate): void {
        Object.assign(this, properties);
    }

    delete(): void {
       
    }
}
