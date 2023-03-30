import { Base } from "src/app/core/domain/base.interface";
import { User } from "./user";

export interface UserRepository extends Base<User> {}