import ajax from "../../../util/ajax";
import { getProxy } from "../../../util/util";

const pageHost = getProxy() + "/eventStream";

const server = {
  getEventStreamList: async () => {
    console.log("start server testRouter");
    const url = "/getEventStreamList";
    const result = await ajax.get(pageHost + url);
    return result;
  }
};

export default server;
