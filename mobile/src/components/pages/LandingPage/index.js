import { inject, observer } from 'mobx-react/native';
import LandingPage from './LandingPage';

export default inject('poems')(observer(LandingPage));
