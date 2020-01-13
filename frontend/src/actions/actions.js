export const LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS";

export const getCpuLoad = () => dispatch => {
  return fetch("http://localhost:8080")
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(
      data => {
        dispatch({ type: LOAD_DATA_SUCCESS, data });
      },
      error => {
        //todo handle error
      }
    );
};
