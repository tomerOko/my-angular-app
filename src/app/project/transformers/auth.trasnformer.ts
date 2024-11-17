import { UserDto } from '../models/dtos/user.dto';
import { UserDm } from '../models/dms/user.dm';

export class AuthTransformer {
  static dtoToDm(dto: UserDto): UserDm {
    return {
      id: dto.id,
      email: dto.email,
      password: dto.password,
    };
  }

  static dmToDto(dm: UserDm): UserDto {
    return {
      id: dm.id,
      email: dm.email,
      password: dm.password,
    };
  }
}
