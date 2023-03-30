import { User, UserProperties } from './user';

export class UserFactory {
  static create(
    nombre: string,
    correo: string,
    password: string,
    roles: any
  ): User {
    const userProperties: UserProperties = {
      nombre,
      correo,
      password,
      roles,
    };

    if (nombre.trim() === '') {
      throw new Error('El nombre del usuario es requerido');
    }

    return new User(userProperties);
  }
}
