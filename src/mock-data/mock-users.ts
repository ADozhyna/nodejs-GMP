import { faker } from '@faker-js/faker';
import { User } from '../users/user.model';

export const users: Array<User> = new Array(10)
  .fill(0)
  .map(() => new User(
    faker.name.firstName(),
    faker.random.alphaNumeric(8),
    +faker.random.numeric(2)
));