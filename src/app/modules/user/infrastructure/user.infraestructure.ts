import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseInfrastructure } from "../../company/infrastructure/base-infrastructure";
import { User } from "../domain/user";
import { UserRepository } from "../domain/user.repository";

@Injectable()
export class UserInfrastructure
  extends BaseInfrastructure<User>
  implements UserRepository
{
  constructor(http: HttpClient) {
    super(http, 'usuarios');
  }
}
