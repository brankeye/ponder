import { inject, observer } from 'mobx-react/native';
import PoemPage from './PoemPage';

export default inject('poems')(observer(PoemPage));
