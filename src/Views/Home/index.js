import React, { useEffect, useReducer, useState } from "react";
import { searchMovie } from "./actions";
import { initialState, reducer } from "./reducer";

const HomePage = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, searchQuery, error, isSearching, searchHistory } = state;
  const debouncedSearchQuery = useDebounce(searchQuery, 1500);
  useEffect(() => {
    if (debouncedSearchQuery) {
      dispatch({
        type: "setIsSearching"
      });
      searchMovie(searchQuery).then(dispatch);
    }
  }, [debouncedSearchQuery, searchQuery]);

  return (
    <div>
      <h1>3: Implement a simple search application</h1>
      <div>
        <div>
          <form>
            <input
              type="text"
              value={searchQuery}
              placeholder={"Search movie..."}
              onChange={event =>
                dispatch({
                  type: "onChange",
                  payload: {
                    name: "search",
                    value: event.target.value
                  }
                })
              }
            />
            <button
              type="submit"
              onClick={() =>
                dispatch({
                  type: "addToSearchHistory",
                  payload: {
                    value: searchQuery
                  }
                })
              }
            >
              Search
            </button>
            <button
              type="button"
              onClick={e => {
                e.preventDefault();
                dispatch({ type: "clearSearchQuery" });
              }}
            >
              Clear
            </button>
          </form>
        </div>
        <div>
          <ul>
            {isSearching && <div>Searching...</div>}
            {error && <div>{error}</div>}
            {movies.map((movie, i) => {
              return (
                <li key={i}>
                  {movie.Title}
                  <button
                    onClick={() => {
                      dispatch({
                        type: "onChange",
                        payload: {
                          name: "search",
                          value: movie.Title
                        }
                      });
                    }}
                  >
                    Add to list
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <h1>Search history</h1>
        <div>
          <ul>
            {searchHistory.length === 0 && <div>No saved searches</div>}
            {searchHistory.map((savedSearch, i) => {
              return (
                <li key={i}>
                  <div>
                    <span>{savedSearch.searchTerm}</span>
                    <span>{savedSearch.timestamp.toLocaleString("sv-SE")}</span>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: "removeFromSearchHistory",
                          payload: {
                            value: savedSearch.searchTerm
                          }
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default HomePage;
