import { action, observable } from "mobx";
import remotedev from "mobx-remotedev";
import config from "./config";

@remotedev(config)
class storeA {
  @observable data = "Hello world!";

  @action
  setData = text => {
    this.data = text;
  };
}

const store = new storeA();
export default store;
