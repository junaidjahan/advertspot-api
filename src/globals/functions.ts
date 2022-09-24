import { ResponseDto } from 'src/common/dto';
import * as bcrypt from 'bcrypt';

export function response({ status = true, message = '', data }) {
  const response = new ResponseDto<any>({
    data,
    status,
    message,
  });
  return response;
}

export function hash(data: string) {
  return bcrypt.hashSync(data, 10);
}

export function compareHash(data: string, compareData: string) {
  return bcrypt.compareSync(data, compareData);
}
