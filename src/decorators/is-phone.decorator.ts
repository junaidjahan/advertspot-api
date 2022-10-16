import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhone',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return typeof value === 'string' && /^\+[0-9]{1,3}\s[0-9]{2,4}\s?[0-9]{2,4}\s?[0-9]{3,4}$/.test(value);
        },
        defaultMessage() {
          return 'Phone must be a phone number';
        }
      }
    });
  };
}
