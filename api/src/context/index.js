import { PoemService, AuthorService, UserService } from 'services';
import {
  UserRepository,
  AuthorRepository,
  AuthorInfoRepository,
  PoemRepository,
  PoemInfoRepository,
} from 'repositories';

export default {
  create: () => {
    const User = UserRepository.create();
    const Author = AuthorRepository.create();
    const AuthorInfo = AuthorInfoRepository.create();
    const Poem = PoemRepository.create();
    const PoemInfo = PoemInfoRepository.create();

    return {
      UserService: UserService.create({ User }),
      AuthorService: AuthorService.create({ Author, AuthorInfo }),
      PoemService: PoemService.create({ Poem, PoemInfo, AuthorInfo }),
    };
  },
};
