import React, { useEffect, useReducer } from "react";
import { searchMovie } from "./actions";
import { initialState, reducer } from "./reducer";
import { useDebounce } from "./hooks";
import IconButton from "./components/Iconbutton";
import "./styles.scss";

const HomePage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, searchQuery, error, isSearching, searchHistory } = state;
  const debouncedSearchQuery = useDebounce(searchQuery, 1500);
  useEffect(() => {
    if (debouncedSearchQuery) {
      if (!searchQuery || searchQuery.length < 3) {
        return dispatch({ type: "clearMovies" });
      }
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
          <div className={"form"}>
            <form>
              <input
                name="Search movie"
                type="text"
                value={searchQuery}
                placeholder={"Search movie..."}
                aria-label="Enter search text"
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
                aria-label="Submit search-query"
                onClick={() =>
                  dispatch({
                    type: "addToSearchHistory",
                    payload: {
                      value: searchQuery
                    }
                  })
                }
              >
                <em className="fa fa-search" />
              </button>
            </form>
          </div>
          <div className={"tooltip"}>
            <span>
              <i className={"fa fa-font"} /> > 3
            </span>
            <span>
              <i className={"fa fa-film"} /> Movie
            </span>
            <span>
              <i className={"fa fa-star"} /> Series
            </span>
          </div>
          <div className={"suggestions"}>
            <ul>
              {isSearching && <div>Searching...</div>}
              {error && <div>{error}</div>}
              {movies.map((movie, i) => {
                return (
                  <li key={i}>
                    <div
                      className={"search-hit"}
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
                      {movie.Type === "movie" && (
                        <span>
                          <i className={"fa fa-film"} />
                        </span>
                      )}
                      {movie.Type === "series" && (
                        <span>
                          <i className={"fa fa-star"} />
                        </span>
                      )}
                      <span>
                        Title: {movie.Title} ({movie.Year})
                      </span>
                    </div>
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
                      <span>
                        <i className={"fa fa-trash-alt"} />
                      </span>
                      <IconButton
                        onClick={() =>
                          dispatch({
                            type: "removeFromSearchHistory",
                            payload: { value: savedSearch.searchTerm }
                          })
                        }
                        text={""}
                        ariaLabel={"Remove search item"}
                        faIcon={"trash"}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={"clear-history"}>
            <IconButton
              onClick={() => dispatch({ type: "clearSearchHistory" })}
              text={"Clear search history"}
              ariaLabel={"Clear search"}
              faIcon={"minus"}
              iconType={"em"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
