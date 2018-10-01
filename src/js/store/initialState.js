let state;

if (window && window.initialState) {
  state = window.initialState;
} else if (localStorage) {
  state = JSON.parse(localStorage.getItem('state')) || undefined;
}

const initialState = state;

export default initialState;
