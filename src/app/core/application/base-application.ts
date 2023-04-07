import { Base } from '../domain/base.interface';

export abstract class BaseApplication<Entity, Repository extends Base<Entity>> {
  constructor(private readonly repository: Repository) {}

  list() {
    return this.repository.list();
  }

  page(page: number) {
    return this.repository.page(page);
  }

  update(id: number, entity: Partial<Entity>) {
    return this.repository.update(id, entity);
  }

  insert(entity: Partial<Entity>) {
  /*   console.log('entity', entity); */
    return this.repository.insert(entity);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }

  listCompany() {
    console.log(222);
    return this.repository.listCompany();
  }

  listBranchOffice(id: number) {
    return this.repository.listBranchOffice(id);
  }

  listProject(id: number) {
    return this.repository.listProject(id);
  }
}
