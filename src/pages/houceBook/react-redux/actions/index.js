export default function addAction(dispatch, value) {
  console.log(arguments)
  return dispatch({ type: "add", value });
}
