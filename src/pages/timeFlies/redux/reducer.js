export default function(prevState, actions) {
  const { type, value } = actions;

  switch (type) {
    case "getEventStreamList":
      return { ...prevState };
    case "setEventStreamList":
      console.log("get set");
      return {
        ...prevState,
        eventStreamList: value
      };
    default:
      return { ...prevState };
  }
}
