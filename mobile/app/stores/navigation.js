import { action, observable } from "mobx";
import remotedev from "mobx-remotedev";
import config from "./config";

@remotedev(config)
class navigation {
  @observable rootNavigator = null;

  @action setRootNavigator = (navigator) => {
    this.rootNavigator = navigator;
  }

  @action resetRoot = (screenArgs) => {
    this.rootNavigator.resetTo(screenArgs);
    this.rootNavigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'closed'
    });
  }
}

const store = new navigation();
export default store;
