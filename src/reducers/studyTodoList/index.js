export default function(state, action) {
  const { type, value } = action;
  switch (type) {
    case "setList":
      return { ...state, list: value };
    default:
      return { ...state };
  }
}
