import ajax from "../../../util/ajax";

const host = "http://localhost:3000";
const pageHost = host + "/eventStream";

const server = {
  getEventStreamList: async () => {
    const url = "/getEventStreamList";
    const result = await ajax.get(pageHost + url);
    return result;
  }
};

export default server;
