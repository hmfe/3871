export const initialState = {
  movies: [],
  searchQuery: "",
  isSearching: false,
  error: "",
  searchHistory: []
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
    case "addToSearchHistory": {
      const searchHistory = state.searchHistory;
      searchHistory.push(action.payload.value);
      return {
        ...state,
        searchHistory
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
