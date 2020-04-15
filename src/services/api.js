// Fetch Team thunk (async)
// CORZ SUCKZ
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const baseURL = 'https://s3-eu-west-1.amazonaws.com/spx-development/contents/';

export default (endpoint, callbackDispatcher) => (dispatch) => {
  fetch(`${proxyUrl}${baseURL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(callbackDispatcher({ data }));
    })
    .catch((error) => {});
};
