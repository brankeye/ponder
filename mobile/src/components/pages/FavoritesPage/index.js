import { inject, observer } from 'mobx-react/native';
import FavoritesPage from './FavoritesPage';

export default inject('poems')(observer(FavoritesPage));
