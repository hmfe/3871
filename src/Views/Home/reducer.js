export const initialState = {
  movies: [],
  searchQuery: "",
  isSearching: false,
  error: ""
};

export function reducer(state, action) {
  switch (action.type) {
    case "search": {
      return {
        ...state,
        error: "",
        movies: action.payload.movies,
        isSearching: false
      };
    }
    case "onChange": {
      console.log(action.payload);
      return {
        ...state,
        searchQuery: action.payload.value
      };
    }
    case "setIsSearching": {
      return {
        ...state,
        isSearching: true
      };
    }
    case "error":
      return {
        ...state,
        movies: [],
        error: action.payload.error,
        isSearching: false
      };
    default:
      console.error(`Unknown action type ${action.type}`);
      return state;
  }
}
