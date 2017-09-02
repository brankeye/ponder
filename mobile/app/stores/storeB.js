import { action, observable } from "mobx";
import remotedev from "mobx-remotedev";
import config from "./config";

@remotedev(config)
class storeB {
  @observable data = "Goodbye world!";

  @action
  setData = text => {
    this.data = text;
  };
}

const store = new storeB();
export default store;
