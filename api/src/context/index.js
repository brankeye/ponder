import { PoemService, AuthorService, UserService } from 'services';
import {
  UserRepository,
  AuthorRepository,
  AuthorInfoRepository,
  PoemRepository,
  PoemInfoRepository,
} from 'repositories';
import uuid from 'uuid/v4';

export default {
  create: async ({ req }) => {
    const User = UserRepository.create();
    const Author = AuthorRepository.create();
    const AuthorInfo = AuthorInfoRepository.create();
    const Poem = PoemRepository.create();
    const PoemInfo = PoemInfoRepository.create();
    const authorization = req.headers.authorization;

    let clientId, user;
    if (authorization) {
      clientId = Buffer.from(authorization, 'base64').toString();
      user =
        (await User.getByClientId(clientId)) ||
        (await User.insert({
          id: uuid(),
          client_id: clientId,
          anonymous: true,
        }));
    }

    return {
      clientId,
      user,
      UserService: UserService.create({ User }),
      AuthorService: AuthorService.create({ Author, AuthorInfo, user }),
      PoemService: PoemService.create({ Poem, PoemInfo, AuthorInfo, user }),
    };
  },
};
