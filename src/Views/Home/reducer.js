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
      const historyObject = {
        searchTerm: action.payload.value,
        timestamp: new Date()
      };
      searchHistory.push(historyObject);
      return {
        ...state,
        searchHistory
      };
    }
    case "removeFromSearchHistory": {
      const searchHistory = state.searchHistory;
      return {
        ...state,
        searchHistory: searchHistory.filter(
          savedSearch => savedSearch.searchTerm !== action.payload.value
        )
      };
    }
    case "clearSearchQuery": {
      return {
        ...state,
        searchQuery: ""
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
