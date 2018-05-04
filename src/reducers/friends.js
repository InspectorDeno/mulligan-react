import {} from "../types";

const initialState = {
  items: [],
  loading: false,
  errors: {}
};

export default function friends(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
