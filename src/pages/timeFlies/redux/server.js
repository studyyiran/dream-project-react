import ajax from "../../../util/ajax";

const host = "http://localhost:4000/api";
const pageHost = host + "/eventStream";

const server = {
  getEventStreamList: async () => {
    console.log("start server testRouter");
    // const url = "/getEventStreamList";
    const url = "/testRouter";
    const result = await ajax.get(host + url);
    // const result = await ajax.get(pageHost + url);
    return result;
  }
};

export default server;
