import React, { useEffect, useReducer, useState } from "react";
import { searchMovie } from "./actions";
import { initialState, reducer } from "./reducer";

const HomePage = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, searchQuery, error, isSearching } = state;
  const debouncedSearchQuery = useDebounce(searchQuery, 1500);
  useEffect(() => {
    if (debouncedSearchQuery) {
      dispatch({
        type: "setIsSearching"
      });
      searchMovie(searchQuery).then(test);
    }
  }, [debouncedSearchQuery, searchQuery]);

  return (
    <div>
      <h1>3: Implement a simple search application</h1>
      <div>
        <label>Search movie</label>
        <input
          type="text"
          value={searchQuery}
          onChange={event =>
            dispatch({
              type: "onChange",
              payload: {
                name: "search",
                value: event.target.value
              }
            })
          }
        ></input>
      </div>
      <div>
        <ul>
          {isSearching && <div>Searching...</div>}
          {error && <div>{error}</div>}
          {movies.map((movie, i) => {
            return <li key={i}>{movie.Title}</li>;
          })}
        </ul>
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
