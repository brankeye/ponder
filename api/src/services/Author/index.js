import { Author } from 'database';

class AuthorService {
  getPoemInfos = ({ id }: { id: string }) =>
    Author.query()
      .eager('poemInfos')
      .findById(id);
}

export default AuthorService;
