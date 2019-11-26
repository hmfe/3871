import React, { useEffect, useReducer } from "react";
import { searchMovie } from "./actions";
import { initialState, reducer } from "./reducer";
import { useDebounce } from "./hooks";
import "./styles.scss";

const HomePage = () => {
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
    <div className={"home-container"}>
      <h1>3: Implement a simple search application</h1>
      <div className={"content-wrapper"}>
        <div className={"search-container"}>
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
        <div className={"search-history"}>
          <div className={"content"}>
            <h2>Search history</h2>
            <div>
              <ul>
                {searchHistory.length === 0 && (
                  <div className={"empty"}>No saved searches</div>
                )}
                {searchHistory.map((savedSearch, i) => {
                  return (
                    <li key={i}>
                      <span>{savedSearch.searchTerm}</span>
                      <span>
                        {savedSearch.timestamp.toLocaleString("sv-SE")}
                      </span>
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
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={"clear-history"}>
            <button
              onClick={() =>
                dispatch({
                  type: "clearSearchHistory"
                })
              }
            >
              Clear search history
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
